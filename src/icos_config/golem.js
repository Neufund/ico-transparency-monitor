import { toPromise } from '../utils';
import { convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xa74476443119a942de498590fe1f2454d7d4ac0d',
  information: {
    aliasName: 'Golem Network Token',
    website: 'https://golem.network/',
    logo: 'https://golem.network/icons/apple-touch-icon.png',
  },
  events: {
    Transfer: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      customArgs: {
        _from: '0x0000000000000000000000000000000000000000',
      },
      firstTransactionBlockNumber: 2607801,
      lastTransactionBlockNumber: 2607938, // use block number to skip tokens created in finalize()
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
      const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
      return [`Max: ${maxCap / (10 ** 18)} GNT`, `Min: ${minCap / (10 ** 18)} GNT`];
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.fundingStartBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.fundingEndBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    // we know that because it is over, we could write some condition instead
    status: async () => 'successful',
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
  decimals: 18, // golem does not provide decimals
  addedBy: 'Mostafa Balata',
  dateAdded: '14-07-2017',
};
