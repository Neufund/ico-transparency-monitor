import config from '../config';
import { getICOParameters, isConnected, web3Connect,
  getSmartContract, getAbiAsDictionary, getTokenSmartContract } from '../utils/web3';
import { computeICOTransparency, getICOLogs, getStatistics, initStatistics } from '../utils';
import { setCurrency, setStatisticsByCurrency } from './CurrencyAction';
import { drawStatistics, showStatistics, hideLoader, showLoader, allocateCSVFile,
  setSmartContractLoaded, setProperties, resetRpc, showIcoNotStarted } from './ScanAction';
import { showErrorMessage } from './ModalAction';

export const web3Connection = () => async (dispatch, getState) => {
  if (isConnected() === false) {
    await dispatch(resetRpc());
    dispatch(showErrorMessage(`Trying to connect to rpc node ${config.rpcHost} received an invalid response.`));
    return;
  }

  if (getState().modal.web3) { return; }

  dispatch(web3Connect());
};

export const readSmartContract = address => async (dispatch, getState) => {
  const web3 = getState().modal.web3;
  if (!web3) { return; }
  const configFile = config.ICOs;

  const answers = configFile[address].matrix;
  const transparencyDecision = computeICOTransparency(answers)[0];

  dispatch(setProperties(address, { decision: transparencyDecision }));

  const tokenContract = getTokenSmartContract(web3, address);

  if (tokenContract === null) { // Doesn't have smart contract
    dispatch(setSmartContractLoaded(true));
    return null;
  }
  const abiAsDictionary = getAbiAsDictionary(tokenContract.abi);

  const parameters = await getICOParameters(web3, address);

  // set decimals in config from smart contract
  configFile[address].decimals = parameters.decimals || configFile[address].decimals;
  Object.keys(parameters).forEach((par) => {
    const parameter = parameters[par];
    if (parameter === null) return;
    const tempResult = {};
    if (abiAsDictionary[par] === 'bytes32') {
      const asciiValue = web3.toAscii(parameter);
      // check if it has value
      tempResult[par] = asciiValue.replace(/\00+/g, '').length > 0 ?
        asciiValue.replace(/\00+/g, '') : null;
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
  const blockNumber = getState().blocks.number;

  const lastBlockNumber = typeof blockNumber === 'string' ? parseInt(blockNumber, 10) :
    parseInt(`0x${blockNumber.toString('hex')}`, 10);

  if (!web3) {
    dispatch(showErrorMessage('Web3 is not initialized'));
    return;
  }

  const icoConfig = config.ICOs[address];
  icoConfig.address = address;
  // create interfaces for all smart contracts
  const icoContract = getSmartContract(web3, address);
  if (icoContract === null) { // doesn't have smart contract
    dispatch(hideLoader());
    dispatch(drawStatistics(initStatistics()));
    dispatch(allocateCSVFile([]));
    dispatch(showStatistics());
    return null;
  }
  const tokenContract = icoConfig.tokenContract ? getTokenSmartContract(web3, address) : null;
  const contracts = {
    [address]: icoContract,
    [icoConfig.tokenContract]: tokenContract,
  };

  // load logs for all events
  const logRequests = [];
  Object.keys(icoConfig.events).forEach((eventName) => {
    const event = icoConfig.events[eventName];

    const firstTxBlockNumber = event.firstTransactionBlockNumber || 0;
    const lastTxBlockNumber = event.lastTransactionBlockNumber || lastBlockNumber;
    console.log(eventName, firstTxBlockNumber, lastTxBlockNumber);
    // if event needs ABI for not yet loaded smart contract
    if (event.address && !contracts[event.address]) {
      contracts[event.address] = getSmartContract(web3, event.address);
    }
    // now partition into many smaller calls
    if (!event.maxBlocksInChunk || !firstTxBlockNumber || lastTxBlockNumber === 'latest') {
      // do in one request
      logRequests.push([firstTxBlockNumber, lastTxBlockNumber, eventName]);
    } else {
      let i = firstTxBlockNumber;
      const lastFullBlockNumber = lastTxBlockNumber - event.maxBlocksInChunk;
      for (; i < lastFullBlockNumber; i += event.maxBlocksInChunk) {
        logRequests.push([i, (i + event.maxBlocksInChunk) - 1, eventName]);
      }
      // push last block which is variable
      logRequests.push([i, lastTxBlockNumber, eventName]);
    }
  });

  const allLogs = {};
  const finalProcessor = () => {
    if (Object.keys(allLogs).length > 0) {
      const statistics = getStatistics(icoConfig, allLogs, initStatistics());
      /* statistics array of two elements, index number 0 for statistcs, 
      index number 1 for csv content */
      dispatch(drawStatistics(statistics[0]));
      dispatch(allocateCSVFile(statistics[1]));

      setCurrency('EUR', new Date(), (error, currencyResult) => {
        if (error) {
          dispatch({ type: 'SET_CURRENCY_ERROR', message: error });
          return;
        }
        dispatch(setStatisticsByCurrency(currencyResult.currency,
          currencyResult.value, currencyResult.time));
        dispatch(showStatistics());
      });
    } else {
      dispatch(showIcoNotStarted());
    }
  };
  const logProcessor = () => {
    const range = logRequests.shift();
    const eventName = range[2];

    getICOLogs(range, icoConfig, contracts, async (error, logs) => {
      if (error) {
        dispatch(hideLoader());
        dispatch({ type: error, message: logs });
      } else {
        // store logs, for each event separately
        if (logs.length > 0) {
          if (eventName in allLogs) {
            allLogs[eventName].push(...logs);
          } else {
            allLogs[eventName] = logs;
          }
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
