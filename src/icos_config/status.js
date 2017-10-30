import { toPromise } from '../utils';
import { convertWeb3Value, convertBlockNumberToDate } from '../utils/web3';

export default {
  crawdSaleTokenContract: '0x55d34b686aa8C04921397c5807DB9ECEdba00a4c',
  tokenContract: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
  information: {
    aliasName: 'StatusNetwork',
    logo: 'http://status.im/img/new-site/apple-touch-icon-180.png?v=50fbb69',
    website: 'https://status.im/',
  },
  events: {
    NewSale: {
      args: {
        tokens: '_tokens',
        sender: '_th',
        ether: '_amount', // status ICO logs actual ether value !== transaction ether as they return overflow to sender
      },
      firstTransactionBlockNumber: 3903900,
      lastTransactionBlockNumber: 3907820,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const failSafeETH = await toPromise(icoContract.failSafeLimit)();
      return `${convertWeb3Value(failSafeETH, 'ether')} ETH`;
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.startBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.endBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    // again we could write a proper check here for example by checking finalizedBlock value
    // however we already know that ICO was succesful
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
    q10: { answer: true, comment: 'Code has high quality' },
    q11: { answer: true },
    q12: { answer: true, comment: 'exchangeRate is constant' },
    q13: { answer: true, comment: 'yes, with multiple rounds' },
    q14: { answer: true, comment: 'owner can stop ICO before failSafe' },
  },
  addedBy: 'Rudolfix',
};
