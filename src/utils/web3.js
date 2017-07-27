import Web3 from 'web3';
import config from '../config.js';
import testConfig from '../config.test.js';
import { toPromise } from '../utils';
import { setBlock } from '../actions/ScanAction';

const ProviderEngine = require('web3-provider-engine');
// const CacheSubprovider = require('web3-provider-engine/subproviders/cache.js');
const FixtureSubprovider = require('web3-provider-engine/subproviders/fixture.js');
// const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js');
const NonceSubprovider = require('web3-provider-engine/subproviders/nonce-tracker.js');
const RpcSubprovider = require('web3-provider-engine/subproviders/rpc.js');

const engineWithProviders = (providers) => {
  const engine = new ProviderEngine();
  providers.forEach(provider => (provider !== null ? engine.addProvider(provider) : engine));
  return engine;
};


// TODO: Find another solution
export const isConnected = () => {
  if (process.NODE_ENV === 'test') {
    return true;
  }
  const web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider(config.rpcHost));
  return web3.isConnected();
};

export const createEngine = rpcUrl =>
  engineWithProviders([
    new FixtureSubprovider({
      web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
      net_listening: true,
      eth_hashrate: '0x00',
      eth_mining: false,
      eth_syncing: true,
    }),
    // new CacheSubprovider(),
    // new FilterSubprovider(),
    new NonceSubprovider(),
    new RpcSubprovider({ rpcUrl }),
  ]);


export const web3Connect = () => async (dispatch, getState) => {
  const engine = createEngine(config.rpcHost);
  const web3 = new Web3(engine);
  const currentBlock = getState().blocks;
  engine.start();

  console.log(`${config.rpcHost} new connection`);
  // start monitoring current block
  engine.on('block', (block) => {
    if (currentBlock === null) {
      dispatch(setBlock(block));
    }
  });

  dispatch({ type: 'SET_WEB3_CONNECTION', web3 });
};

export const getSmartContract = (web3, address) => {
  if (!web3) { return null; }

  const abi = require(`../smart_contracts/${address}.json`);
  return web3.eth.contract(abi).at(address);
};

export const getCurrentBlock = () => undefined;

const getERC20Parameters = async (smartContract) => {
  const name = smartContract.name ? await toPromise(smartContract.name)() : null;
  const totalSupply = smartContract.totalSupply ? await toPromise(smartContract.totalSupply)() : null;
  const symbol = smartContract.symbol ? await toPromise(smartContract.symbol)() : null;
  const decimals = smartContract.decimals ? await toPromise(smartContract.decimals)() : config.defaultDecimal;

  return {
    name,
    totalSupply: totalSupply / 10 ** decimals,
    symbol,
    decimals,
  };
};

export const getAbiAsDictionary = (abi) => {
  const result = {};
  abi.forEach(item => result[item.name] = item.outputs && item.outputs.length > 0 ? item.outputs[0].type : null);
  return result;
};

export const getTokenSmartContract = (web3, address) => {
  const tokenContractAddress = config.ICOs[address].tokenContract || address;
  return getSmartContract(web3, tokenContractAddress);
};


export const getICOParameters = async (web3, address) => {
  let configFile = config.ICOs;
  if (process.env.NODE_ENV === 'test') { configFile = testConfig.ICOs; }

  // tokenContract may be different that ICO contract that governs ICO process
  const tokenContract = getTokenSmartContract(web3, address);
  // read standard ERC20 parameters
  const result = await getERC20Parameters(tokenContract);

  const tokenContractAddress = configFile[address].tokenContract || address;
  const icoContract = tokenContractAddress === address ? tokenContract : getSmartContract(web3, address);
  const icoParameters = configFile[address].icoParameters;
  Object.keys(icoParameters).forEach((prop) => {
    if (icoParameters[prop] !== null) { result[prop] = icoParameters[prop](web3, icoContract); }
  });
  return result;
};

export const convertBlockNumberToDate = async (web3, blockNumber) => {
  const timestamp = (await toPromise(web3.eth.getBlock)(blockNumber.valueOf())).timestamp;
  return new Date(parseInt(timestamp) * 1000);
};

export const convertWeb3Value = (value, type) => {
  switch (type) {
    case 'string' :return value;
    case 'ether' :return parseFloat(value.div(10 ** 18).valueOf());
    case 'timestamp' :return new Date(parseInt(value.valueOf()) * 1000);
  }
};
