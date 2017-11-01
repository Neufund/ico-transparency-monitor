import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crawdSaleTokenContract: '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0',
  tokenContract: '0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
  information: {
    aliasName: 'MelonPort',
    website: 'https://melonport.com/',
    logo: 'https://d33wubrfki0l68.cloudfront.net/bae9d6917783575baff8141cc9e2008f9b3cbc2f/25049/assets/melonport_logo.svg',
  },
  events: {
    TokensBought: {
      args: {
        tokens: 'amount',
        sender: 'sender',
      },
      firstTransactionBlockNumber: 3175204,
      lastTransactionBlockNumber: 3187613,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const ethCap = await toPromise(icoContract.ETHER_CAP)();
      // const preEthCap = await toPromise(icoContract.BTCS_ETHER_CAP)();
      return `${convertWeb3Value(ethCap, 'ether')} ETH`;
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
    q10: { answer: true, comment: 'Simple, clean code' },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true, comment: 'Halting function has no impact as there is no minimum cap' },
  },
  addedBy: 'Mostafa Balata',
  addingDate: '14-07-2017',
};
