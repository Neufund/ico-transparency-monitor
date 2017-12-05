import { toPromise } from '../utils';

export default {
  crowdSaleTokenContract: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  information: {
    name: 'Ethlend',
    website: 'https://ethlend.io/',
    logo: 'https://s3.ap-south-1.amazonaws.com/ethlend-assets/static/img/favicons/apple-touch-icon.png',
  },
  events: {
    LogBuy: {
      args: {
        tokens: 'value',
        sender: 'owner',
      },
      firstTransactionBlockNumber: 4285018,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 42960,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.TOTAL_SOLD_TOKEN_SUPPLY_LIMIT)().valueOf();
      return `Max: ${maxCap / (10 ** 18)} LEND`;
    },
    startDate: async () => 'by admin',
    endDate: async () => 'by admin',
    status: async (web3, icoContract) => {
      const state = await toPromise(icoContract.currentState)().valueOf();
      if (state === 5) {
        return 'successful';
      }
      return 'in progress';
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
    q11: { answer: false, comment: `Note that all stages of ICO are triggered by the admin. this destroy trustlessnes of this otherwise nice contract!
    1. token transfers are enabled when ICO is finalized so it is subject to admin good will and is not controlled by the contract,
    2. funds are not held in escrow until finalization and can be withdrawn at any moment,
    One small change: adding onlyInState(State.ICOFinished) to setTokenManager function would make this contract fully trustless. Adding a simple state machine to
    setState function would also help.` },
    q12: { answer: true },
    q13: { answer: false, comment: 'admin triggers ICO stages, he can even go back from sale to pre-sale etc.' },
    q14: { answer: false, comment: 'admin triggers ICO stages, he can even go back from sale to pre-sale etc.' },
  },
  addedBy: 'Marcin Rudolf',
  dateAdded: '27-11-2017',
};
