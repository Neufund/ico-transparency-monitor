import { toPromise } from '../utils';

export default {
  crowdSaleTokenContract: '0x5e3346444010135322268a4630d2ed5f8d09446c',
  information: {
    name: 'LockChain',
    website: 'https://lockchain.co/',
    logo: 'https://lockchain.co/img/icon.png',
  },
  events: {
    CreateLOK: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      firstTransactionBlockNumber: 4307927,
      lastTransactionBlockNumber: 4650879,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const tokenSaleCap = await toPromise(icoContract.tokenSaleCap)();
      const tokenPreSaleCap = await toPromise(icoContract.tokenPreSaleCap)();
      return [`Max: ${tokenSaleCap / (10 ** 18)} LOC`,
        `Pre-sale: ${tokenPreSaleCap / (10 ** 18)} LOC`];
    },
    startDate: async (web3, icoContract) => 'Not provided',
    endDate: async (web3, icoContract) => 'Not provided',
    status: async (web3, icoContract) => {
      const isPreSale = await toPromise(icoContract.isPreSale)();
      const isFinalized = await toPromise(icoContract.isFinalized)();
      const isMainSale = await toPromise(icoContract.isMainSale)();

      if (isFinalized) {
        return 'Successful';
      } else if (isMainSale) {
        return 'In Main-Sale';
      } else if (isPreSale) {
        return 'In Pre-sale';
      }
      return 'In Progress';
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
    q10: { answer: false, comment: 'Unused public fields in state, could use some linter.' },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: false, comment: 'Owner can start pre-sale and main-sale via external function' },
    q14: { answer: false, comment: 'Owner calls an external function called finalize to end the sale.' },
  },
  addedBy: 'Mostafa Balata',
  dateAdded: '02-12-2017',
};
