import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crawdSaleTokenContract: '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413',
  information: {
    aliasName: 'TheDAO',
    website: 'https://daowiki.atlassian.net/wiki',
    logo: 'https://daowiki.atlassian.net/wiki/download/attachments/655365/DAO?version=2&modificationDate=1462133209864&cacheVersion=1&api=v2',
  },
  events: {
    CreatedToken: {
      args: {
        tokens: 'amount',
        sender: 'to',
      },
      firstTransactionBlockNumber: 0,
      lastTransactionBlockNumber: 'latest',
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const daoMinCap = await toPromise(icoContract.minTokensToCreate)();
      return [`Min: ${convertWeb3Value(daoMinCap, 'ether')} DAOs `, 'Max: unbounded'];
    },
    startDate: async icoContract => 'contract creation',
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.closingTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async icoContract => 'successful', // could return isFueled
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: {
      answer: true,
      comment: 'Decision if to treat re-entrancy bug as breach of token holder rights is hard. We decided: NO, as TheDAO stated: code is law ;>',
    },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  addedBy: 'Mostafa Balata',
  addingDate: '14-07-2017'
};
