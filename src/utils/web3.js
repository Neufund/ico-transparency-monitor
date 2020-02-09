import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
import FixtureSubprovider from 'web3-provider-engine/subproviders/fixture';
import NonceSubprovider from 'web3-provider-engine/subproviders/nonce-tracker';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc';
import config from '../config';
import { toPromise } from '../utils';
import { setBlock } from '../actions/ScanAction';

const engineWithProviders = (providers) => {
  const engine = new ProviderEngine();
  providers.forEach(provider => (provider !== null ? engine.addProvider(provider) : engine));
  return engine;
};

export function isNeufundAddress(address) {
  return address === '0xf432cec23b2a0d6062b969467f65669de81f4653';
}

// TODO: Find another solution
export const isConnected = () => {
  if (process.env.NODE_ENV === 'test') {
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
    new NonceSubprovider(),
    new RpcSubprovider({ rpcUrl }),
  ]);


export const web3Connect = () => async (dispatch, getState) => {
  const engine = createEngine(config.rpcHost);
  const web3 = new Web3(engine);
  const currentBlock = getState().blocks;
  engine.start();
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
  try {
    // eslint-disable-next-line import/no-dynamic-require
    const abi = require(`../smart_contracts/${address}.json`);
    return web3.eth.contract(abi).at(address);
  } catch (err) {
    console.error(`smart contract json with address ${address} not found`);
    return null;
  }
};


export const getSmartContractByAddress = async (web3, address) => {
  if (!address) { return null; }
  try {
    const contractAbi = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`)
      .then(result => result.json());
    return web3.eth.contract(contractAbi).at(address);
  } catch (err) {
    console.log(`smart contract json with address ${address} not found`);
    return null;
  }
};

export const getCurrentBlock = () => undefined;

const getERC20Parameters = async (smartContract) => {
  const name = smartContract.name ? await toPromise(smartContract.name)() : null;
  const totalSupply = smartContract.totalSupply ?
    await toPromise(smartContract.totalSupply)() : null;
  const symbol = smartContract.symbol ? await toPromise(smartContract.symbol)() : null;
  const decimals = smartContract.decimals ?
    await toPromise(smartContract.decimals)() : config.defaultDecimal;

  return {
    name,
    totalSupply: totalSupply / (10 ** decimals),
    symbol,
    decimals,
  };
};

export const getAbiAsDictionary = (abi) => {
  const result = {};
  abi.forEach((item) => {
    result[item.name] = item.outputs &&
    item.outputs.length > 0 ? item.outputs[0].type : null;
  });
  return result;
};

export const getTokenSmartContract = (web3, address) => {
  const tokenContractAddress = config.ICOs[address].tokenContract || address;
  return getSmartContract(web3, tokenContractAddress);
};

export const getETOTokenSmartContract = (web3, etoConfig) => {
  if (!web3) { return null; }

  try {
    return web3.eth.contract(etoConfig.abi).at(etoConfig.tokenContract);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getICOParameters = async (web3, address) => {
  const configFile = config.ICOs;
  // tokenContract may be different that ICO contract that governs ICO process
  const tokenContract = getTokenSmartContract(web3, address);
  // read standard ERC20 parameters
  const result = await getERC20Parameters(tokenContract);

  const tokenContractAddress = configFile[address].tokenContract || address;
  const icoContract = tokenContractAddress === address ?
    tokenContract : getSmartContract(web3, address);
  const icoParameters = configFile[address].icoParameters;
  Object.keys(icoParameters).forEach((prop) => {
    if (icoParameters[prop] !== null) {
      result[prop] = icoParameters[prop](web3, icoContract, tokenContract);
    }
  });
  return result;
};
export const getETOParameters = async (web3, etoConfig, tokenContract) => {
  // read standard ERC20 parameters
  const result = await getERC20Parameters(tokenContract);
  const icoParameters = etoConfig.icoParameters;

  Object.keys(icoParameters).forEach((prop) => {
    if (icoParameters[prop] !== null && typeof icoParameters[prop] === 'function') {
      result[prop] = icoParameters[prop]();
    }
  });
  return result;
};

export const convertBlockNumberToDate = async (web3, blockNumber) => {
  const block = await toPromise(web3.eth.getBlock)(blockNumber.valueOf());
  // @todo: modify this
  if (!block) return new Date();
  const timestamp = block.timestamp;
  return new Date(parseInt(timestamp, 10) * 1000);
};

export const convertWeb3Value = (value, type) => {
  switch (type) {
    case 'string': return value;
    case 'ether': return value.div(10 ** 18).toNumber();
    case 'timestamp': return new Date(parseInt(value.valueOf(), 10) * 1000);
    default: throw new Error('Unexpected input');
  }
};
