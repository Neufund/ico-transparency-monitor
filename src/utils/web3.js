import Web3 from 'web3';
import { createSelector } from 'reselect';
import {default as config} from '../config.js';
import {toPromise,formateDate,formatNumber} from '../utils';


const ProviderEngine = require('web3-provider-engine');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const HttpProvider = HttpProvider;


const engineWithProviders = (providers) => {
    const engine = new ProviderEngine();
    providers.forEach(provider => (provider !== null ? engine.addProvider(provider) : engine));
    return engine;
};


// TODO: Find another solution
const isConnected = ()=>{
    let web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.rpcHost));
    return web3.isConnected();
};

export const createEngine = (rpcUrl) =>
    engineWithProviders([
        new FixtureSubprovider({
            web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
            net_listening: true,
            eth_hashrate: '0x00',
            eth_mining: false,
            eth_syncing: true,
        }),
        new CacheSubprovider(),
        new FilterSubprovider(),
        new NonceSubprovider(),
        new RpcSubprovider({ rpcUrl }),
    ]);


export const web3Connect = () => {
    /**
     * TODO: connection timeout
     */

    const engine = createEngine(config.rpcHost);
    window.web3 = new Web3(engine);

    engine.start();

    console.log(`${config.rpcHost} new connection`);
    return window.web3;
};

export const getSmartContract = (address)=>{
    const abi = require(`../smart_contracts/${address}.json`);
    const web3 = getWeb3();
    return web3.eth.contract(abi).at(address);
};


export const getWeb3 = () => {

    if(isConnected() === false)
        throw Error("SHOW_MODAL_ERROR");


    if (window.web3 !== undefined)
        return window.web3;

    return web3Connect();
};

export const getSmartContractConstants = (address) => {
    const smartContract = getSmartContract(address); // abi from the config
    const constants = config.ICOs[address].constants; // constants from the config
    let result = {};

    Object.keys(constants).map((constant)=>{

        if(constants[constant] == null) return;
        const constantKey = constants[constant]['name'];
        const constantDataType = constants[constant]['type'];
        if(smartContract[constantKey] != undefined) {
            result[constant] = {value:toPromise(smartContract[constantKey])() , type:constantDataType};
        }
    });
    return result;
};

export const constantValueOf = async (constant , type) => {
    const web3 = getWeb3();

    switch(type){
        case 'string' :return constant;
        case 'uint256' :return web3.fromWei(constant , "ether").valueOf();
        case 'timestamp' :return formateDate(new Date(parseInt(constant.valueOf())*1000) , false);
        case 'blockNumber':
            const timestamp = (await toPromise(web3.eth.getBlock)(constant.valueOf())).timestamp;
            return formateDate(new Date(parseInt(timestamp )*1000), false);
        default: return null;
    }
};

