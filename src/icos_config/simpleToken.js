import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x58b7056deb51ed292614f0da1e94e7e9c589828d',
  tokenContract: '0x2c4e8f2d746113d0696ce89b35f0d8bf88e0aeca',
  baseCurrency: 'ETH',
  information: {
    name: 'Simple Token',
    website: 'https://simpletoken.org/',
    logo: 'https://d36lai1ppm9dxu.cloudfront.net/assets/fav-icon/v2/64.png',
  },
  events: {
    TokensPurchased: {
      args: {
        tokens: '_tokens',
        ether: '_cost',
        sender: '_beneficiary',
      },
      firstTransactionBlockNumber: 4551199,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 12960,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const tokensMax = await toPromise(icoContract.TOKENS_SALE)();
      return [`Hard ${formatNumber(Math.floor(convertWeb3Value(tokensMax, 'ether')))} ST`];
    },
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.PHASE1_START_TIME)();
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.endTime)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const startDate = await toPromise(icoContract.PHASE1_START_TIME)();
      const endDate = await toPromise(icoContract.endTime)();
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
    q7: { answer: false, comment: `Several deals are added without sending ETH via addPresale method that allocated additional tokens.
    No information was provided on deal size. We do not track those tokens.` },
    q8: { answer: true },
    q9: { answer: true },
    q10: { answer: true },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: false, comment: `The sale end time is initially defined by 
    the END_TIME constant but it may get extended if the sale is paused by the admin or the owner.` },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
  dateAdded: '23-11-2017',
};
