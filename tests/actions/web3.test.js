import { expect } from 'chai';
import { spy } from 'sinon';
import { web3Connection } from '../../src/actions/web3'
import { web3Connect } from '../../src/utils/web3';

describe('web3Connection', () => {
  it('should not create an instance when there is already one', async () => {
    const dispatchMock = spy();
    const stateProvider = () => ({
      modal: {
        web3: {}
      }
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


