import chai, { expect, should } from 'chai';

const resolvingPromise = new Promise(resolve =>
    resolve('promise resolved')
);
const rejectingPromise = new Promise((resolve, reject) =>
    reject(new Error('promise rejected'))
);


import { getSmartContract } from '../src/utils/web3';

// var chai = require('chai');
// var expect = chai.expect;
// var chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);


import { toPromise } from '../src/utils';

import { default as config } from '../src/config.js';

describe('Config constants', () => {
    // this.timeout(5000);
  it('assertion success', async () => {
    const result = await resolvingPromise;
    expect(result).to.equal('promise resolved');
  });


  it('symbol', async () => {
    const address = '0xa74476443119a942de498590fe1f2454d7d4ac0d';
    const smartContract = getSmartContract(address);

        // const symbol = await config.ICOs[address].constants.symbol(smartContract);
        // console.log(symbol)
        // expect(symbol).to.equal('GLM');
  });
});
