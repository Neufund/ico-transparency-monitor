import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x8ac03a3304519879e2ddb114c2eb2163043ab4b0',
  tokenContract: '0xca0e7269600d353f70b14ad118a49575455c0f2f',
  information: {
    name: 'AMLT',
    logo: 'https://amlt.coinfirm.io/img/favicon.png',
    website: 'https://amlt.coinfirm.io/',
  },
  events: {
    Invested: {
      args: {
        tokens: 'tokenAmount',
        sender: 'investor',
        ether: 'weiAmount',
      },
      firstTransactionBlockNumber: 4527769,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 52960,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const tokensSold = await toPromise(icoContract.tokensSold)();
      const tokensLeft = await toPromise(icoContract.getTokensLeft)();
      return `${formatNumber(convertWeb3Value(tokensLeft.add(tokensSold), 'ether'))} AMLT`;
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
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true, comment: 'Refund procedure in smart contract is not used so it is not included in scoring (note that procedure itself is flawed)' },
    q12: { answer: false, comment: 'Owner can change pricing scheme any time by calling setPricingStrategy' },
    q13: { answer: true },
    q14: { answer: false, comment: 'The crowd-sale owner can close the sale early or extend it by calling setEndsAt' },
  },
  addedBy: 'Mostafa Balata',
  dateAdded: '11-12-2017',
};
