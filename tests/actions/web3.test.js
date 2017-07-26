import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { web3Connection, readSmartContract, getLogs } from '../../src/actions/web3';
import { setProperties,showLoader} from '../../src/actions/ScanAction';
import stateProvider from '../helpers/web3Mock';

describe('web3Connection', () => {
  it('should not create an instance when there is already one', async () => {
    const dispatchMock = spy();
    const stateProvider = () => ({
      modal: {
        web3: {},
      },
    });

    await web3Connection()(dispatchMock, stateProvider);

    expect(dispatchMock.called).to.be.false;
  });

  it('should create new connection', async () => {
    const dispatchMock = spy();
    const stateProvider = () => ({ modal: {} });

    await web3Connection()(dispatchMock, stateProvider);

    expect(dispatchMock).to.have.been.calledOnce; // it should be stricter assertion
  });
});


describe('readSmartContract', async () => {
  const dispatchMock = spy();
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';

  it('should read smart contract', async () => {
    await readSmartContract(address)(dispatchMock, stateProvider);
    assert(dispatchMock.calledWith(setProperties(address, { decision: 'withissues' })));
    assert(dispatchMock.calledWith(setProperties(address, { totalSupply: 0 })));
    assert(dispatchMock.calledWith(setProperties(address, { cap: 'TESTING DATA' })));
    assert(dispatchMock.calledWith(setProperties(address, { startDate: 'TESTING DATA' })));
    assert(dispatchMock.calledWith(setProperties(address, { endDate: 'TESTING DATA' })));
    assert(dispatchMock.calledWith(setProperties(address, { status: 'TESTING DATA' })));
    assert(dispatchMock.calledWith({ type: 'IS_SMART_CONTRACT_LOADED', value: true }));
  });
});

describe('getLogs', async () => {
  const dispatchMock = spy();
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';

  it.only('Should get all the logs from the smart contract', async () => {
    await getLogs(address)(dispatchMock, stateProvider);
    assert(dispatchMock.calledWith(showLoader()));
  });
});

