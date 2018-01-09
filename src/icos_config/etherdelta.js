import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

const icoStatus = {
  0: 'Before sale',
  1: 'In sale',
  2: 'Finished',
};

export default {
  crowdSaleTokenContract: '0xCe53a179047ebed80261689367c093C90A94cC08',
  information: {
    name: 'etherdelta',
    website: 'https://etherdelta.com/',
    logo: 'https://pbs.twimg.com/profile_images/775077934650494976/YuV0wuPn_normal.jpg',
  },
  events: {
    Buy: {
      args: {
        tokens: 'token',
        ether: 'eth',
        sender: 'sender',
      },
      firstTransactionBlockNumber: 4830751,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 42960,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) =>
      ['Hard Cap: 750M EDT'],
    startDate: async (web3, icoContract) => {
      const openTime = await toPromise(icoContract.openTime)();
      return convertWeb3Value(openTime.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const closeTime = await toPromise(icoContract.closeTime)();
      return convertWeb3Value(closeTime.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const status = await toPromise(icoContract.getPeriod)();
      return icoStatus[status.valueOf()];
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
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true, comment: `The owner can finish the ICO earlier 
    via stopSale method` },
  },
  addedBy: 'Mostafa Balata',
  dateAdded: '04-01-2018',
};
