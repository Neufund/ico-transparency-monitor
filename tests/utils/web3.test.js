import { assert, expect, should } from 'chai';
import { spy } from 'sinon';
import { web3Connection, readSmartContract} from '../../src/actions/web3'
import { getSmartContract, getAbiAsDictionary ,getICOParameters } from '../../src/utils/web3';
import stateProvider from '../helpers/web3Mock';


describe('getSmartContract', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';
  const web3 = stateProvider().modal.web3;

  it('should create new web3 instance' , () => {
    const smartConstract = getSmartContract(web3 , address);
    assert.deepEqual(smartConstract,{ abi: [] })
  })

  it('should return null because web3 is missing' , () => {
    const smartConstract = getSmartContract(null , address);
    assert.deepEqual(smartConstract,null);
  })

});

describe('getAbiAsDictionary', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';
  const web3 = stateProvider().modal.web3;

  it('should convert abi array to an object', () => {
    const smartConstract = getSmartContract(web3 , address);
    const abiObject = getAbiAsDictionary(smartConstract.abi);
    assert.deepEqual(abiObject, {});
  })
});

describe('getICOParameters', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';
  const web3 = stateProvider().modal.web3;

  it('should convert abi array to an object', async () => {
    const res = await getICOParameters(web3 , address);
    assert.deepEqual(res , { name: null,
      totalSupply: 0,
      symbol: null,
      decimals: 18,
      cap: 'TESTING DATA',
      startDate: 'TESTING DATA',
      endDate: 'TESTING DATA',
      status: 'TESTING DATA' })
  })
});

