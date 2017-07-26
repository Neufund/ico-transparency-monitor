import { default as config } from '../config.js';
import { getICOParameters, isConnected, web3Connect, getSmartContract, getAbiAsDictionary, getTokenSmartContract} from '../utils/web3';
import { computeICOTransparency } from '../utils';
import { getICOLogs, getStatistics, initStatistics } from '../utils.js';
import { setCurrency, setStatisticsByCurrency } from './CurrencyAction';
import { drawStatistics, showStatistics, hideLoader, showLoader,
  allocateCSVFile, setSmartContractLoaded, setProperties, errorMessage, resetRpc } from './ScanAction';

export const web3Connection = () => async (dispatch, getState) => {
  console.log('Start Web3 connection');
  if (isConnected() === false) {
    await dispatch(resetRpc());
    await dispatch(errorMessage());
    return;
  }

  if (getState().modal.web3) { return; }

  dispatch(web3Connect());
};

export const readSmartContract = address => async (dispatch, getState) => {
  const web3 = getState().modal.web3;

  console.log(`Reading Smart contract , RPC connection ${web3 ? 'Connected' : 'Disconnected'}`);
  if (!web3) {
    return;
  }
  const answers = config.ICOs[address].matrix;
  const transparencyDecision = computeICOTransparency(answers)[0];

  dispatch(setProperties(address, { decision: transparencyDecision }));

  const tokenContract = getTokenSmartContract(web3, address);
  const abiAsDictionary = getAbiAsDictionary(tokenContract.abi);

  const parameters = await getICOParameters(web3, address);

  config.ICOs[address].decimals = parameters.decimals || config.ICOs[address].decimals; // set decimals in config from smart contract
  Object.keys(parameters).forEach((par) => {
    const parameter = parameters[par];
    if (parameter === null) return;
    const tempResult = {};
    if (abiAsDictionary[par] === 'bytes32') {
      const asciiValue = web3.toAscii(parameter);
        // check if it has value
      tempResult[par] = asciiValue.replace(/\00+/g, '').length > 0 ? asciiValue.replace(/\00+/g, '') : null;

      dispatch(setProperties(address, tempResult));
    } else if (typeof parameter === 'object' && typeof parameter.then === 'function') {
      parameter.then(async (value) => {
        if (typeof value === 'function') {
          tempResult[par] = await value(web3);
        } else {
          tempResult[par] = value;
        }
        dispatch(setProperties(address, tempResult));
      });
    } else {
      tempResult[par] = parameter;
      dispatch(setProperties(address, tempResult));
    }
  });
  dispatch(setSmartContractLoaded(true));
};

export const getLogs = address => async (dispatch, getState) => {
  dispatch(showLoader());
  const web3 = getState().modal.web3;
  const lastBlockNumber = parseInt(`0x${getState().blocks.number.toString('hex')}`);

  if (!web3) {
    dispatch(errorMessage());
    return;
  }

  const icoConfig = config.ICOs[address];
  const icoContract = getSmartContract(web3, address);

  // now partition into many smaller calls
  const logRequests = [];
  Object.keys(icoConfig.events).forEach((eventName) => {
    const event = icoConfig.events[eventName];
    const firstTxBlockNumber = event.firstTransactionBlockNumber || 0;
    const lastTxBlockNumber = event.lastTransactionBlockNumber || lastBlockNumber;
    console.log(eventName, firstTxBlockNumber, lastTxBlockNumber);

    if (!event.maxBlocksInChunk || !firstTxBlockNumber || lastTxBlockNumber === 'latest') {
      // do in one request
      logRequests.push([firstTxBlockNumber, lastTxBlockNumber, eventName]);
    } else {
      let i = firstTxBlockNumber;
      for (; i < lastTxBlockNumber; i += event.maxBlocksInChunk) {
        logRequests.push([i, i + event.maxBlocksInChunk - 1, eventName]);
      }
      // push last block which is variable
      logRequests.push([i, lastTxBlockNumber, eventName]);
    }
  });

  const allLogs = {};
  const finalProcessor = () => {
    const statistics = getStatistics(icoConfig, allLogs, initStatistics());
      // statistics array of two elements, index number 0 for statistcs, index number 1 for csv content
    dispatch(drawStatistics(statistics[0]));
    dispatch(allocateCSVFile(statistics[1]));

    setCurrency('EUR', new Date(), (error, currencyResult) => {
      if (error) {
        dispatch({ type: 'SET_CURRENCY_ERROR', message: error });
        return;
      }

      const currencyRate = currencyResult.value;
      console.log('Fetched Currency is ', currencyRate);

      dispatch(setStatisticsByCurrency(currencyResult.currency, currencyResult.value, currencyResult.time));
      dispatch(showStatistics());
    });
  };
  const logProcessor = () => {
    const range = logRequests.shift();
    const eventName = range[2];
    getICOLogs(range, icoConfig, icoContract, async (error, logs) => {
      if (error) {
        dispatch(hideLoader());
        dispatch({ type: error });
      } else {
        // store logs, for each event separately
        if (eventName in allLogs) {
          allLogs[eventName].push(...logs);
        } else {
          allLogs[eventName] = logs;
        }
        if (logRequests.length === 0) {
          dispatch(hideLoader());
          finalProcessor();
        } else {
          logProcessor();
        }
      }
    });
  };
  logProcessor();
};
