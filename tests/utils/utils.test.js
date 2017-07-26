import { assert, expect, should } from 'chai';
import {getSmartContract} from '../../src/utils/web3';
import {
    formateDate,
    computeICOTransparency,
    getEtherRate,
    getICOs,
    getValueOrNotAvailable,
    getStatistics,
    initStatistics,
    getICOLogs } from '../../src/utils';

import { default as config } from '../../src/config.js';
import testConfig from '../../src/config.test';
import stateProvider from '../helpers/web3Mock';
import { spy } from 'sinon';

describe('Format Date function', () => {
  it('Accepts Date object and expect YYYY-MM-DD format', () => {
    assert.equal(formateDate(new Date('2017-07-04T12:15:26.878Z')), '2017-07-04 12:15:26');
  });
});

describe('Decision Matrix', () => {
  it('Should take ico decision matrix and return and array', () => {
    assert.typeOf(computeICOTransparency(config.ICOs['0xa74476443119a942de498590fe1f2454d7d4ac0d'].matrix),
            'Array');
  });
});

describe('getEtherRate', () => {
  it('Should return the currency by time', () => getEtherRate('ETH-EUR', new Date('2016-11-03')).then((result) => {
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

describe('getICOLogs', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'
  const icoConfig = testConfig.ICOs[address];
  const web3 = stateProvider().modal.web3;

  it('Should return array of logs', () => {
    const blockRange = [3932884, 3945843, "LogBuy"];
    const icoContract = getSmartContract(web3, address)
    const request = getICOLogs(blockRange, icoConfig, icoContract );
  });
});

describe('getStatistics', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'
  const icoConfig = testConfig.ICOs[address];
  icoConfig.events
  let logs = {

  };

  it.only('Should', () => {
    const stats = getStatistics(icoConfig, logs , initStatistics());
  });
});
