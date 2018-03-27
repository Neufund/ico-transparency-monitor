import { toPromise } from '../utils';
import { convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xf2Fbb2939981594e25d93e6226231FcC1b01718e',
  baseCurrency: 'ETH',
  information: {
    aliasName: 'Leverj',
    website: 'https://leverj.io/',
    logo: 'https://leverj.io/images/logo.svg',
  },
  events: {
    PurchasedTokens: {
      args: {
        tokens: 'amount',
        sender: 'purchaser',
      },
      firstTransactionBlockNumber: 4494275,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => 'not provided',
    startDate: async (web3, icoContract) => {
      const startBlock = await toPromise(icoContract.startBlock)();
      return (await convertBlockNumberToDate(web3, startBlock)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endBlock = await toPromise(icoContract.endBlock)();
      return (await convertBlockNumberToDate(web3, endBlock)).formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);

      const startBlock = await toPromise(icoContract.startBlock)();
      const startDate = (await convertBlockNumberToDate(web3, startBlock)).getTime() / 1000;

      const endBlock = await toPromise(icoContract.endBlock)();
      const endDate = (await convertBlockNumberToDate(web3, endBlock)).getTime() / 1000;

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
    q10: { answer: true },
    q11: { answer: true },
    q12: { answer: false},
    q13: { answer: true },
    q14: { answer: false},
  },
  decimals: 9,
  addedBy: 'Mostafa balata',
  dateAdded: '23-11-2017',
};
