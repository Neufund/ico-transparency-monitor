import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x02174511507a5a2893c02689e0957acb7215bb00',
  tokenContract: '0xb0280743b44bf7db4b6be482b2ba7b75e5da096c',
  information: {
    name: 'TNS',
    logo: 'https://transcodium.com/assets/favicons/favicon-32x32.png',
    website: 'https://transcodium.com/',
  },
  events: {
    TokenPurchase: {
      args: {
        tokens: 'value',
        sender: 'purchaser',
        ether: 'amount',
      },
      firstTransactionBlockNumber: 5457538,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 52960,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const tokensSold = await toPromise(icoContract.tokensSold)();
      const tokensLeft = await toPromise(icoContract.getTokensLeft)();
      return `${formatNumber(convertWeb3Value(tokensLeft.add(tokensSold), 'ether'))} BUZ`;
    },
    startDate: async (web3, icoContract) => {
      const startsAt = await toPromise(icoContract.startsAt)();
      return convertWeb3Value(startsAt.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.endsAt)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const finalized = await toPromise(icoContract.finalized)();
      const isCrowdsaleFull = await toPromise(icoContract.isCrowdsaleFull)();
      const halted = await toPromise(icoContract.halted)();
      const startsAt = await toPromise(icoContract.startsAt)();
      const endDate = await toPromise(icoContract.endsAt)();
      const now = Math.floor(new Date().getTime() / 1000);

      if (finalized || isCrowdsaleFull) {
        return 'Successful';
      } else if (halted) {
        return 'Halted';
      } else if (now < startsAt) {
        return 'Not started';
      } else if (now >= startsAt && now <= endDate) {
        return 'In progress';
      }
      return 'Unknown';
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
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  addedBy: 'Jini Jose',
  dateAdded: '17-05-2018',
};
