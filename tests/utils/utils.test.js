import { assert, expect, should } from 'chai';
import {getSmartContract} from '../../src/utils/web3';
import {getICODuration, formatDuration} from '../../src/utils';
import getLogsDetails from '../helpers/LogsMock';

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

describe('Decision Matrix', () => {
  it('Should take ico decision matrix and return and array', () => {
    assert.typeOf(computeICOTransparency(config.ICOs['0xa74476443119a942de498590fe1f2454d7d4ac0d'].matrix),
            'Array');
  });
});

describe('getEtherRate', () => {
  it('Should return the currency by time', () => getEtherRate('ETH-EUR', new Date('2016-11-03')).then((result) => {
    assert.equal(parseInt(result.data.data.amount), 9);
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
  let logs = getLogsDetails(address);
  const statistics = getStatistics(icoConfig, logs , initStatistics());

  it('Should return array of two objects [stats , csvContent]', () => {
    const stats = statistics[0];
    assert.equal(statistics.length , 2);
  });

  it('Should return 1 as count of transactions', () => {
    const stats = statistics[0];
    assert.equal(stats.general.transactionsCount , 1)
  });

  it('Should return an object of time', () => {
    const stats = statistics[0];
    const expectedStartDate = new Date(1498598604 * 1000);
    const expectedEndDate = new Date(1498598604 * 3 * 1000);

    const expectedTimeObject = {
      startDate: expectedStartDate,
      endDate: expectedEndDate,
      scale: 'days',
      durationDays: 21,
      duration: formatDuration(getICODuration(expectedEndDate , expectedStartDate))
    }
    assert.deepEqual(stats.time, expectedTimeObject);
  });

  it('Should return 6 investors' , () => {
    const stats = statistics[0];
    assert.equal(Object.keys(stats.investors.senders).length , 3)
  });
  it('Should has sortedByTicket object' , () => {
    const stats = statistics[0];
    const expectedObject = [
      { investor: '0x0000000000000000000000000000001', value: 0 },
      { investor: '0x0000000000000000000000000000002', value: 0 },
      { investor: '0x0000000000000000000000000000003', value: 0 }]

    assert.deepEqual(stats.investors.sortedByTicket , expectedObject);
  });

  it('Should has sortedByETH object' , () => {
    const stats = statistics[0];
    const expectedObject = [ { investor: '0x0000000000000000000000000000001', value: 0.48 },
      { investor: '0x0000000000000000000000000000002', value: 0.48 },
      { investor: '0x0000000000000000000000000000003', value: 0.48 } ]

    assert.deepEqual(stats.investors.sortedByETH , expectedObject);
  });

  it('Should has money object as the data' , () => {
    const stats = statistics[0];
    assert.deepEqual(stats.money , { tokenIssued: 0, totalETH: 1.44 });
  });

  it('Should has charts data filled' , () => {
    const stats = statistics[0];
    assert.equal(stats.charts.transactionsCount.length,34690)
    assert.equal(stats.charts.tokensCount.length,34690)
    assert.equal(stats.charts.tokenHolders.length,11)
  });

  it('Should has csv content as array', () => {
    const csvContent = statistics[1];
    const expectedCSVArray =  [[ '0x0000000000000000000000000000001', 0, 0.24, 1498598604 ],
      [ '0x0000000000000000000000000000002', 0, 0.24, 2997197208 ],
      [ '0x0000000000000000000000000000003', 0, 0.24, 4495795812 ],
      [ '0x0000000000000000000000000000001', 0, 0.24, 1498598604 ],
      [ '0x0000000000000000000000000000002', 0, 0.24, 2997197208 ],
      [ '0x0000000000000000000000000000003', 0, 0.24, 4495795812 ]]

    assert.deepEqual(csvContent,expectedCSVArray);
  });

});
