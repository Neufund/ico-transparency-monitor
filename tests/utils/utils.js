import { assert, expect, should } from 'chai';
import {
    formateDate,
    decisionMatrix,
    getEtherPerCurrency,
    getICOs,
    getValueOrNotAvailable,
    getStatistics,
    initStatistics,
    getICOLogs } from '../../src/utils';

import { default as config } from '../../src/config.js';

describe('Format Date function', () => {
  it('Accepts Date object and expect YYYY-MM-DD format', () => {
    assert.equal(formateDate(new Date('2017-07-04T12:15:26.878Z')), '2017-07-04 12:15:26');
  });
});

describe('Decision Matrix', () => {
  it('Should take ico decision matrix and return and array', () => {
    assert.typeOf(decisionMatrix(config.ICOs['0xa74476443119a942de498590fe1f2454d7d4ac0d'].matrix),
            'Array');
  });
});

describe('getEtherPerCurrency', () => {
  it('Should return the currency by time', () => getEtherPerCurrency('ETH-EUR', '2016-11-03').then((result) => {
    assert.equal(result.data.data.amount, '9.64');
  }).catch((error) => {
    assert.equal(error, null);
  }));
});

describe('getICOs', () => {
  it('Should return the currency by time', () => {
    assert.typeOf(getICOs(), 'Array');
  });
});

describe('getValueOrNotAvailable', () => {
  const testingObject = {
    name: 'Testing',
  };
  it('Should return the correct name attribute', () => {
    assert.equal(getValueOrNotAvailable(testingObject, 'name'), 'Testing');
  });
  it('Should return Not Available', () => {
    assert.equal(getValueOrNotAvailable(testingObject, 'age'), 'Not Available');
  });
});

describe('statistics', () => {
  const icoAddress = '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0';
  const ico = config.ICOs[icoAddress];
  let events = [];

  it('Accepts ICO address and should returns array of logs', (done) => {
    getICOLogs(icoAddress, (error, result) => {
      console.log(result);
      events = result;
      assert.equal(error, null);
      done();
    });
  });

  it('Accept Should return block number', () => {
    return;
    try {
      const stats = getStatistics(ico, events, initStatistics(), 9.6);
    } catch (error) {
      assert.equal(error, null);
    }
  });
});
