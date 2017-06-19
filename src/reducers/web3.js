/**
 * Created by mostafa on 6/16/17.
 */
import { createWeb3 } from '../web3';
import {createSelector } from 'reselect';
import jQuery from "jquery";
import {toPromise , objectMap} from '../utils';

let currentWeb3 = null;
export const reducer = makeReducer(reducers, initialState);
export const creators = makeCreators(reducers);

export default reducer;

export const getWeb3 = createSelector([state => state.web3.rpcProvider], (rpcProvider) => {

        // Stop current web3 instance if supported
        if (currentWeb3 && currentWeb3.currentProvider && currentWeb3.currentProvider.stop) {
            currentWeb3.currentProvider.stop();
        }

        // Create a new web3 instance
        const newWeb3 = createWeb3(rpcProvider);

        // Store new instance in various places
        currentWeb3 = newWeb3;
        window.currentWeb3 = currentWeb3;
        return currentWeb3;
    }
);

export const getLogs = () => {
    const web3 = createSelector([getWeb3], web3 => objectMap(web3.eth, toPromise));
    console.log(web3);


    // const ICO = config.ICOS[icoName];
    // const customArgs = ICO.hasOwnProperty('customArgs') ? ICO.customArgs : {};
    // const web3 = web3Connect();
    // const address = ICO.address;
    // const abi = ICO.abi;
    //
    // const smartContract = web3.eth.contract(abi).at(address);
    //
    // let event = smartContract[ICO.event](customArgs, {fromBlock: 0, toBlock: 3607800});
    // jQuery.ajax({
    //     type: "POST",
    //     url: config.rpcHost,
    //     Accept: "application/json",
    //     contentType: "application/json",
    //     data: JSON.stringify({
    //         "id": parseInt(Math.random()),
    //         "jsonrpc": "2.0",
    //         "params": [{
    //             "fromBlock": event.options.fromBlock, "toBlock": event.options.toBlock,
    //             "address": address,
    //             "topics": event.options.topics
    //         }]
    //         , "method": "eth_getLogsDetails"
    //     }),
    //     success: (e) => {
    //         let res = e.result;
    //         callback(null, res.map(function (log) {
    //             return event.formatter ? event.formatter(log) : log;
    //         }));
    //     },
    //     dataType: 'json'
    // });
};

export const makeCreators = reducers =>
    objectMap(reducers, (_, type) => (...payload) => ({ type, payload }));

export const makeReducer = (reducers, initialState) => (state = initialState, { type, payload }) =>
    reducers[type] ? reducers[type](state, ...payload) : state;


export const setRpcProvider = url => async (dispatch, getState) => {
    if (getState().web3.rpcProvider === url) {
        return;
    }
};
