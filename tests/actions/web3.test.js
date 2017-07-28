import { expect } from 'chai';
import { spy } from 'sinon';
import { web3Connection, readSmartContract, getLogs } from '../../src/actions/web3';
import { setProperties, showLoader } from '../../src/actions/ScanAction';
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

    expect(dispatchMock).to.have.been.calledOnce; // it should be stricter expection
  });
});


describe('readSmartContract', async () => {
  const dispatchMock = spy();
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';

  it('should read smart contract', async () => {
    await readSmartContract(address)(dispatchMock, stateProvider);
    expect(dispatchMock.calledWith(setProperties(address, { decision: 'withissues' }))).to.equal(true);
    expect(dispatchMock.calledWith(setProperties(address, { totalSupply: 0 }))).to.equal(true);
    expect(dispatchMock.calledWith(setProperties(address, { cap: 'TESTING DATA' }))).to.equal(true);
    expect(dispatchMock.calledWith(setProperties(address, { startDate: 'TESTING DATA' }))).to.equal(true);
    expect(dispatchMock.calledWith(setProperties(address, { endDate: 'TESTING DATA' }))).to.equal(true);
    expect(dispatchMock.calledWith(setProperties(address, { status: 'TESTING DATA' }))).to.equal(true);
    expect(dispatchMock.calledWith({ type: 'IS_SMART_CONTRACT_LOADED', value: true })).to.equal(true);
  });
});

describe('getLogs', async () => {
  const dispatchMock = spy();
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';

  it('Should get all the logs from the smart contract', async () => {
    await getLogs(address)(dispatchMock, stateProvider);
    expect(dispatchMock.calledWith(showLoader())).to.be.true;
  });
});

