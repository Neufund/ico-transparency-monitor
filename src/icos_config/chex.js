import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crawdSaleTokenContract: '0xD566Fa4a696EAc66f749f7fe999D6673fEe2026c',
  information: {
    aliasName: 'CHEX',
    logo: 'https://tokensale.thechex.com/images/chex-token.jpg',
    website: 'https://tokensale.thechex.com',
  },
  events: {
    Transfer: {
      args: {
        tokens: 'value',
        sender: 'to',
      },
      customArgs: {
        _from: '0x0000000000000000000000000000000000000000',
      },
      firstTransactionBlockNumber: 4203059,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const total = convertWeb3Value(await toPromise(icoContract.tokenCap)(), 'ether');
      return `Max ${formatNumber(total)} CHX`;
    },
    startDate: async icoContract => 'contract creation',
    endDate: async icoContract => 'until cap reached',
    status: async (web3, icoContract) => {
      const frozen = await toPromise(icoContract.frozen)().valueOf();
      const maxCap = convertWeb3Value(await toPromise(icoContract.tokenCap)(), 'ether');
      const supply = convertWeb3Value(await toPromise(icoContract.totalSupply)(), 'ether');
      return maxCap === supply ? 'successful' :
        frozen ? 'paused' : 'in progress';
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
    q8: {
      answer: true,
      comment: 'Adjusts to estimate current bitcoin:ethereum prices, and generates a receipt for real time transaction',
    },
    q9: {
      answer: false,
      comment: 'Non-ethereum transactions (bitcoin, altcoins) are processed primarily through a centralized server',
    },
    q10: { answer: true, comment: 'Simplified and uses common practices' },
    q11: {
      answer: true,
      comment: 'The only exception to this is that the contract uses block time to change phases, which can be lead to slightly early/late dates depending on network congestion',
    },
    q12: { answer: true, comment: 'Price scales according to current block number while sale is active' },
    q13: { answer: true, comment: 'Determined by starting block number' },
    q14: { answer: true, comment: 'Will end either by supply limit reached, manual freeze, or end block reached' },
  },
  addedBy: 'Bravetarget',
};
