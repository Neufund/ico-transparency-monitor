import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x6ceE948C9d593c58Cba5Dfa70482444899D1341c',
  baseCurrency: 'ETH',
  information: {
    name: 'Spectre',
    website: 'https://spectre.ai',
    logo: 'https://spectre.ai/img/ico/favicon.png?v=1.0',
  },
  events: {
    Transfer: {
      args: {
        tokens: 'value',
        sender: 'to',
      },
      customArgs: {
        from: '0x0000000000000000000000000000000000000000',
      },
      firstTransactionBlockNumber: 4439146,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract, tokenContract) => {
      const minCap = await toPromise(icoContract.MIN_CAP)();
      const maxCap = await toPromise(icoContract.TOKENS_AVAILABLE)();
      return [`Min: ${formatNumber(minCap / 10 ** 18)} SXS`, `Max: ${formatNumber(maxCap / 10 ** 18)} SXS`];
    },
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.saleStart)();
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.saleEnd)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const startDate = await toPromise(icoContract.saleStart)();
      const endDate = await toPromise(icoContract.saleEnd)();
      if (now < startDate) {
        return 'not started';
      } else if (now >= startDate && now <= endDate) {
        return 'in progress';
      }
      return 'successful';
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: true },
    q9: { answer: true },
    q10: { answer: false, comment: `Contract code is messy. 50% of the code could be removed. Standard transfer functions are overridden 
      and never used. Why TokenControlled is implemented when no one controls anything and internal interface is not used etc.?` },
    q11: { answer: false, comment: `Refund procedure is not trustless. withdrawEther may be called at any time and then owner needs to send funds back to the contract with fundContract.
       A simple condition on withdrawEther that rejects if MIN_CAP is not met would solve the problem.` },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true, comment: 'There is a pause function but it does not change end date.' },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
  dateAdded: '29-11-2017',
};
