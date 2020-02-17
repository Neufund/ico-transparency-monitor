import { computeICOTransparency, getICOLogs } from '../utils';
import {
  allocateCSVFile,
  drawStatistics,
  hideLoader,
  setEtoProperties,
  setSmartContractLoaded, showIcoNotStarted, showLoader, showStatistics
} from '../actions/ScanAction';
import {
  getAbiAsDictionary,
  getETOParameters,
  getETOTokenSmartContract, getSmartContract
} from './web3';
import { showErrorMessage } from '../actions/ModalAction';
import { getStatistics, initStatistics } from './stats';
import {
  setConversionRate,
  setStatisticsByCurrency
} from '../actions/CurrencyAction';

export const readETOSmartContract = etoConfig => async (dispatch, getState) => {
  if (!etoConfig) { return; }
  const web3 = getState().modal.web3;
  if (!web3) { return; }

  const address = etoConfig.address;
  const answers = etoConfig.matrix;
  const transparencyDecision = computeICOTransparency(answers)[0];

  dispatch(setEtoProperties(address, { decision: transparencyDecision }));

  const tokenContract = await getETOTokenSmartContract(web3, etoConfig);

  if (tokenContract === null) { // Doesn't have smart contract
    dispatch(setSmartContractLoaded(true));
    return;
  }

  const abiAsDictionary = getAbiAsDictionary(Object.values(tokenContract.abi));

  const parameters = await getETOParameters(web3, etoConfig, tokenContract);

  Object.keys(parameters).forEach((par) => {
    const parameter = parameters[par];
    if (parameter === null) return;
    const tempResult = {};
    if (abiAsDictionary[par] === 'bytes32') {
      const asciiValue = web3.toAscii(parameter);
      // check if it has value
      tempResult[par] = asciiValue.replace(/\00+/g, '').length > 0 ?
        asciiValue.replace(/\00+/g, '') : null;
      dispatch(setEtoProperties(address, tempResult));
    } else if (typeof parameter === 'object' && typeof parameter.then === 'function') {
      parameter.then(async (value) => {
        if (typeof value === 'function') {
          tempResult[par] = await value(web3);
        } else {
          tempResult[par] = value;
        }
        dispatch(setEtoProperties(address, tempResult));
      });
    } else {
      tempResult[par] = parameter;
      dispatch(setEtoProperties(address, tempResult));
    }
  });
  dispatch(setSmartContractLoaded(true));
};

export const getETOLogs = etoConfig => async (dispatch, getState) => {
  dispatch(showLoader());
  const web3 = getState().modal.web3;
  const blockNumber = getState().blocks.number;
  const lastBlockNumber = typeof blockNumber === 'string' ? parseInt(blockNumber, 10) : parseInt(`0x${blockNumber.toString('hex')}`, 16);
  const address = etoConfig.address;
  if (!web3) {
    dispatch(showErrorMessage('Web3 is not initialized'));
    return;
  }

  // create interfaces for all smart contracts
  const icoContract = getETOTokenSmartContract(web3, etoConfig, true);
  if (icoContract === null) { // doesn't have smart contract
    dispatch(hideLoader());
    dispatch(drawStatistics(initStatistics()));
    dispatch(allocateCSVFile([]));
    dispatch(showStatistics());
    return;
  }

  const tokenContract = getETOTokenSmartContract(web3, etoConfig);
  const contracts = {
    [address]: icoContract,
    [etoConfig.tokenContract]: tokenContract,
  };

  const baseCurrency = etoConfig.baseCurrency || 'ETH';
  const initialCurrency = baseCurrency === 'EUR' ? 'ETH' : 'EUR';
  await dispatch(readETOSmartContract(etoConfig));
  const time = new Date();
  const conversionRate = await dispatch(setConversionRate(address, initialCurrency, time, etoConfig));
  // load logs for all events
  const logRequests = [];
  Object.keys(etoConfig.events).forEach((eventName) => {
    const event = etoConfig.events[eventName];

    const firstTxBlockNumber = event.firstTransactionBlockNumber || 0;
    const lastTxBlockNumber = event.lastTransactionBlockNumber || lastBlockNumber;

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
      const statistics = getStatistics(etoConfig, allLogs);
      /* statistics array of two elements, index number 0 for statistcs,
      index number 1 for csv content */
      dispatch(drawStatistics(statistics[0]));
      dispatch(allocateCSVFile(statistics[1]));

      dispatch(setStatisticsByCurrency(initialCurrency, conversionRate, time));
      dispatch(showStatistics());
    } else {
      console.log('Sho eto has not started');
      dispatch(showIcoNotStarted());
    }
  };
  const logProcessor = () => {
    const range = logRequests.shift();
    const eventName = range[2];

    getICOLogs(range, etoConfig, contracts, async (error, logs) => {
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
