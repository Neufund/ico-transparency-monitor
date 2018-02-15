import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x906A6CEec7256B02Bd16401D2993Bf9B1eD89B9c',
  tokenContract: '0x315cE59FAFd3A8d562b7Ec1C8542382d2710b06c',
  information: {
    name: 'Cacao Shares preVIP',
    logo: 'https://cacaoshares.com/wp-content/uploads/2018/01/logo-cherry-2018-1-e1517104089812.png',
    website: 'https://cacaoshares.com/',
  },
  events: {
    LogFundingReceived: {
      args: {
        sender: '_addr',
        ether: '_amount',
      },
      firstTransactionBlockNumber: 5083667,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: null,
      countTransactions: true,
    },
    LogContributorsPayout: {
      args: {
        tokens: '_amount',
        sender: '_addr',
      },
      firstTransactionBlockNumber: 5083667,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: null,
      countTransactions: false,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => '1.388.888 CCS',
    startDate: async (web3, icoContract) => {
      const startsAt = await toPromise(icoContract.startTime)();
      return convertWeb3Value(startsAt.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.PREVIPdeadline)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const isRunning = await toPromise(icoContract.state)();
      return isRunning.valueOf() ? 'in progress' : 'successful';
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true, comment: 'All codes are verified on etherscan where compiling parameters are available' },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: true },
    q9: { answer: true },
    q10: { answer: true },
    q11: { answer: true, comment: 'Funds are collected only at end on the preVIP, users receive tokens instantly but must wait until main ICO wait period finish for transfers to be unlocked' },
    q12: { answer: true, comment: 'The price is set at 0.36$ with possibility for additional discounts. USD price for maths is taken from a third party smart contract' },
    q13: { answer: true },
    q14: { answer: true },
  },
  addedBy: 'Fares Akel',
  dateAdded: '14-02-2018',
};
