import { assert, expect, should } from 'chai';
import {
  getSmartContract } from '../../src/utils/web3';

import config from '../../src/config';

describe('getSmartContract', () => {
  it('should return web3 smart contract', async () => {
    const dispatchMock = spy();
    const stateProvider = () => ({
      modal: {
        web3: {}
      }
    });

    getSmartContract(web3, '0xa74476443119a942de498590fe1f2454d7d4ac0d')

  });
});
