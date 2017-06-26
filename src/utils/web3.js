import Web3 from 'web3';
import { createSelector } from 'reselect';
import {default as config} from '../config.js';
import {toPromise,formateDate} from '../utils';


const ProviderEngine = require('web3-provider-engine');
const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const VmSubprovider = require('web3-provider-engine/subproviders/vm.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');
const HttpProvider = HttpProvider;


const engineWithProviders = (providers) => {
    const engine = new ProviderEngine();
    providers.forEach(provider => (provider !== null ? engine.addProvider(provider) : engine));
    return engine;
};

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
        // new VmSubprovider(),
        new RpcSubprovider({ rpcUrl }),
    ]);


export const web3Connect = () => {
    /**
     * TODO: check if the connection is valid
     * TODO: connection timeout
     */

    const engine = createEngine(config.rpcHost);
    window.web3 = new Web3(engine);

    engine.start();

    console.log(`${config.rpcHost} new conecttion`);
    return window.web3;
};

export const getSmartContract = (icoName)=>{
    const ICO = config.ICOS[icoName];
    const customArgs = ICO.hasOwnProperty('customArgs') ? ICO.customArgs : {};
    const web3 = getWeb3();

    // console.log(web3.net)
    //
    const address = ICO.address;
    const abi = ICO.abi;

    return [web3.eth.contract(abi).at(address) ,ICO['constants'] ];
};


export const getWeb3 = () => {

    if(isConnected() === false)
        throw Error("SHOW_MODAL_ERROR")


    if (window.web3 != undefined)
        return window.web3;

    return web3Connect();
};

export const getSmartContractConstants = (icoName ) => {
    const token = getSmartContract(icoName);
    const smartContract = token[0]; // abi from the config
    // console.log(smartContract);
    const constants = token[1]; // constants from the config
    let result = {};
    // console.log(constants);
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
        case 'timestamp' : return formateDate(new Date(parseInt(constant.valueOf())*1000));
        case 'blockNumber' :
            const timestamp = (await toPromise(web3.eth.getBlock)(constant.valueOf())).timestamp;
            return formateDate(new Date(parseInt(timestamp )*1000));
        default: return null;
    }
};

