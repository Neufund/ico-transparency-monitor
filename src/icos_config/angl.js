import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xE1f243A9AbfeeF646bE6BeF7b8C2018276574294',
  tokenContract: '0xc499eA948a1aD5D8Eaf12abd2F67975c4Dbe21aa',
  information: {
    name: 'ANGL',
    logo: 'https://angelinvestors.io/wp-content/uploads/2017/10/angel-ogo.png',
    website: 'https://angelinvestors.io/',
  },
  events: {
    InvestmentEvent: {
      args: {
        tokens: 'angel',
        sender: 'investor',
        ether: 'eth',
      },
      firstTransactionBlockNumber: 4631550,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 52960,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => '100 000 000 ANGL',
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.icoLaunchTimestamp)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.icoFinishTimestamp)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const icoLaunchTimestamp = await toPromise(icoContract.icoLaunchTimestamp)();
      const icoFinishTimestamp = await toPromise(icoContract.icoFinishTimestamp)();
      const secondRefundFinish =
        await toPromise(icoContract.secondRefundRoundFinishTimestamp)();
      const now = Math.floor(new Date().getTime() / 1000);

      if (now < icoLaunchTimestamp) {
        return 'Not started';
      } else if (now < icoFinishTimestamp) {
        return 'In progress';
      } else if (now < secondRefundFinish) {
        return 'Refund period';
      }
      return 'Finished';
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
    q14: { answer: true },
  },
  addedBy: 'Bitcoin Friends',
  dateAdded: '15-12-2017',
};
