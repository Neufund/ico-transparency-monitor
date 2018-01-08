import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

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
      ['Hard Cap: 750M EDT'], // from website    
    startDate: async (web3, icoContract) => {
      const openTime = await toPromise(icoContract.openTime)();
      return convertWeb3Value(openTime.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const closeTime = await toPromise(icoContract.closeTime)();
      return convertWeb3Value(closeTime.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const startDateICO = await toPromise(icoContract.openTime)();
      const endDateICO = await toPromise(icoContract.closeTime)();
      const saleStopped = await toPromise(icoContract.saleStopped)();
      if (saleStopped) {
        return 'finished';
      }
      if (now < startDateICO) {
        return 'not started';
      } else if (now >= startDateICO && now < endDateICO) {
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
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true, comment: 'Commented in chinese language' },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  addedBy: 'Mostafa Balata',
  dateAdded: '04-01-2018',
};
