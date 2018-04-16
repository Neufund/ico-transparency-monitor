import { BigNumber } from 'bignumber.js';
import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xf432cec23b2a0d6062b969467f65669de81f4653',
  tokenContract: '0xa823e6722006afe99e91c30ff5295052fe6b8e32',
  baseCurrency: 'EUR',
  information: {
    name: 'Neufund',
    website: 'https://commit.neufund.org/',
    logo: 'https://neufund.org/img/favicon_neufund.ico',
  },
  events: {
    LogFundsCommitted: {
      args: {
        tokens: 'grantedAmount',
        ether: 'eurEquivalent',
        sender: 'investor',
      },
      firstTransactionBlockNumber: 4514628,
      lastTransactionBlockNumber: 4748122,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract, tokenContract) => {
      const maxCapEurBigNumber = await toPromise(icoContract.maxCapEur)();
      const neuCap = await toPromise(tokenContract.cumulative)(maxCapEurBigNumber);
      return [`${formatNumber(Math.floor(convertWeb3Value(neuCap, 'ether')))} NEU`];
    },
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.startOf)(1);
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.startOf)(3);
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const startDate = await toPromise(icoContract.startOf)(1);
      const endDate = await toPromise(icoContract.startOf)(3);
      if (now < startDate) {
        return 'not started';
      } else if (now >= startDate && now <= endDate) {
        return 'in progress';
      }
      return 'successful';
    },
    currencyRate: async (web3, icoContract) => {
      const ethEuroFraction = await toPromise(icoContract.ethEurFraction)();
      const result = new BigNumber(1).div(ethEuroFraction.div(new BigNumber(10).pow(18)));
      return result.toNumber();
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true, comment: `committed funds are under control of 
    investors stored in LockedAccount contract` },
    q8: { answer: true, comment: `stable coin pegged 1:1 to Euro is implemented
     in EuroToken contract` },
    q9: { answer: true, comment: `withdrawal and deposit happen via bank account,
     this is not trustless but unavoidable` },
    q10: { answer: true },
    q11: { answer: true, comment: `token holders are legally protected by combination 
    of legal and smart contracts undeniably referencing each other` },
    q12: { answer: true, comment: 'reward is controlled by exponential curve' },
    q13: { answer: true },
    q14: { answer: true, comment: `ICO ends on specified date, there is no mechanism 
    to stop it earlier or halt it. it should be however noted that admin may revoke 
    ISSUER right to Commitment contract, there is however 0 incentive for 
    platform operator to do that` },
  },
  decimals: 18,
  addedBy: 'chfast',
  dateAdded: '14-12-2017',
};
