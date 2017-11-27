import { toPromise } from '../utils';
import { convertWeb3Value, convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  information: {
    aliasName: 'Basic Attention Token',
    website: 'https://basicattentiontoken.org/',
    logo: 'https://basicattentiontoken.org/images/BAT_logo_color_sansBAT.png',
  },
  events: {
    CreateBAT: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      countTransactions: true,
      firstTransactionBlockNumber: 3798640,
      lastTransactionBlockNumber: 3798720,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
      const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
      return [`Max: ${convertWeb3Value(maxCap, 'ether')} BAT`, `Min: ${convertWeb3Value(minCap, 'ether')} BAT`];
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.fundingStartBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.fundingEndBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
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
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
  dateAdded: '26-09-2017',
};
