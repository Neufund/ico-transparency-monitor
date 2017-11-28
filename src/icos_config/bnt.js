import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xBbc79794599b19274850492394004087cBf89710',
  tokenContract: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
  information: {
    name: 'Bancor',
    website: 'https://www.bancor.network/',
    logo: 'https://www.bancor.network/static/images/favicon.ico',
  },
  events: {
    Contribution: {
      args: {
        tokens: '_return',
        sender: '_contributor',
        ether: '_amount',
      },
      firstTransactionBlockNumber: 3851355,
      lastTransactionBlockNumber: 3861767,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const totalEtherCap = await toPromise(icoContract.totalEtherCap)();
      const btcsEtherCap = await toPromise(icoContract.BTCS_ETHER_CAP)();

      return [`Ether Cap: ${convertWeb3Value(totalEtherCap, 'ether')} ETH`,
        `BTCs ETH Cap: ${convertWeb3Value(btcsEtherCap, 'ether')} ETH`];
    },
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.startTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.endTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async icoContract => 'successful',
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
    q11: { answer: true, comment: 'Mind that Bancor token destroys tokens send to its address. 3.5% of all tokens are already destroyed at the moment this entry is added.' },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
  dateAdded: '03-10-2017',
};
