import { toPromise } from '../utils';

export default {
  crawdSaleTokenContract: '0xb56d622DDF60ec532B5f43B4Ff9B0e7b1FF92dB3',
  information: {
    aliasName: 'TEZOS Fundraiser',
    logo: 'https://www.tezos.com/static/favicon.ico',
    website: 'https://www.tezos.com/',
  },
  events: {
    Deposit: {
      args: {
        tokens: null, // not an ICO
        sender: 'tezos_pk_hash',
      },
      firstTransactionBlockNumber: 3936447,
      lastTransactionBlockNumber: 4016095,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => 'no max nor min cap',
    startDate: async (web3, icoContract) => 'NOT AN ICO!',
    endDate: async (web3, icoContract) => 'NOT AN ICO!',
    status: async (web3, icoContract) => {
      const isRunning = await toPromise(icoContract.accept)();
      // tezos does what they want. may start at any moment in the future
      return isRunning.valueOf() ? 'in progress' : 'successful';
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: {
      answer: true,
      comment: "They didn't bother to attach code to actual fundraising smart contract but etherscan is solving this by bytecode search",
    },
    q4: { answer: true },
    q5: { answer: false, comment: 'They do not track senders of ETH, no refund mechanism' },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: {
      answer: false,
      comment: 'No investor rights are protected. You send money and Tezos takes it. Not any better than sending $$$ in envelope to Tezos office.',
    },
    q12: { answer: false, comment: 'Not an ICO - no tokens created' },
    q13: { answer: false, comment: 'May be started and re-started whenever Tezos wants' },
    q14: { answer: false, comment: 'May be stopped and re-started whenever Tezos wants' },
  },
  addedBy: 'Rudolfix',
  addingDate: '20-07-2017',
};
