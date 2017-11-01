import axios from 'axios';
import AxiosMock from 'axios-mock-adapter';
import { expect } from 'chai';
import { getSmartContract } from '../../src/utils/web3';
import getLogsDetails from '../helpers/LogsMock';

import {
  getICODuration,
  formatDuration,
  computeICOTransparency,
  getEtherRate,
  getValueOrNotAvailable,
  getStatistics,
  initStatistics,
  getICOLogs } from '../../src/utils';

import config from '../../src/config';
import stateProvider from '../helpers/web3Mock';

describe('Decision Matrix', () => {
  it('Should take ico decision matrix and return and array', () => {
    expect(computeICOTransparency(config.ICOs['0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf'].matrix)).to.deep.equal(
      ['withissues', { q10: true, q14: true }]
    );
  });
});

describe('getEtherRate', () => {
  it('Should return the currency by time', async () => {
    const axiosMock = new AxiosMock(axios);
    axiosMock.onGet('https://api.coinbase.com/v2/prices/ETH-EUR/spot?date=2016-11-03T00:00:00.000Z').reply(200, {
      data: {
        amount: 9,
      },
    });

    const result = await getEtherRate('ETH-EUR', new Date('2016-11-03'));

    expect(result.data.data.amount).to.equal(9);
  });
});

describe('getValueOrNotAvailable', () => {
  const testingObject = {
    name: 'Testing',
  };
  it('Should return the correct name attribute', () => {
    expect(getValueOrNotAvailable(testingObject, 'name')).to.equal('Testing');
  });
  it('Should return Not Available', () => {
    expect(getValueOrNotAvailable(testingObject, 'age')).to.equal('Not Available');
  });
});

describe('getICOLogs', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';
  const icoConfig = config.ICOs[address];
  const web3 = stateProvider().modal.web3;
  icoConfig.address = address;

  it('Should return array of logs', () => {
    const blockRange = [3932884, 3945843, 'LogBuy'];
    const icoContract = getSmartContract(web3, address);
    getICOLogs(blockRange, icoConfig, { [address]: icoContract });
  });
});

describe('getStatistics', () => {
  const address = '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf';
  const icoConfig = config.ICOs[address];
  const logs = getLogsDetails(address);
  const statistics = getStatistics(icoConfig, logs, initStatistics());

  it('Should return array of two objects [stats , csvContent]', () => {
    expect(statistics.length).to.equal(2);
  });

  it('Should return 3 as count of transactions', () => {
    const stats = statistics[0];
    expect(stats.general.transactionsCount).to.equal(3);
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
      duration: formatDuration(getICODuration(expectedEndDate, expectedStartDate)),
    };
    expect(stats.time).to.deep.equal(expectedTimeObject);
  });

  it('Should return 3 investors', () => {
    const stats = statistics[0];
    expect(Object.keys(stats.investors.senders).length).to.equal(3);
  });

  it('Should have sortedByTicket object', () => {
    const stats = statistics[0];
    const expectedObject = [
      { investor: '0x0000000000000000000000000000003', value: 3 },
      { investor: '0x0000000000000000000000000000002', value: 2 },
      { investor: '0x0000000000000000000000000000001', value: 1 }];

    expect(stats.investors.sortedByTicket).to.deep.equal(expectedObject);
  });

  it('Should have sortedByETH object', () => {
    const stats = statistics[0];
    const expectedObject = [{ investor: '0x0000000000000000000000000000001', value: 0.48 },
      { investor: '0x0000000000000000000000000000002', value: 0.48 },
      { investor: '0x0000000000000000000000000000003', value: 0.48 }];

    expect(stats.investors.sortedByETH).to.deep.equal(expectedObject);
  });

  it('Should have money object as the data', () => {
    const stats = statistics[0];
    expect(stats.money).to.deep.equal({ tokenIssued: 6, totalETH: 1.44 });
  });

  it('Should have charts data filled', () => {
    const stats = statistics[0];
    expect(stats.charts.tokensCount.length).to.equal(34690);
    expect(stats.charts.transactionsCount.length).equal(34690);
    // TODO: fix test case below with real logs data
    // expect(stats.charts.tokenHolders.length).to.equal(11);
  });

  it('Should has csv content as array', () => {
    const csvContent = statistics[1];
    expect(csvContent).to.be.an('Array');
  });
});
