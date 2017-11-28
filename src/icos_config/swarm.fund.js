import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x96a0599930a67f72c713e6566687960882c5f7f9',
  tokenContract: '0x9e88613418cf03dca54d6a2cf6ad934a78c7a17a',
  information: {
    name: 'Swarm',
    logo: 'https://tokenmarket.net/blockchain/ethereum/assets/swarm-fund/logo_big.png',
    website: 'https://www.swarm.fund/',
  },
  events: {
    TokenPurchase: {
      args: {
        tokens: 'amount',
        ether: 'value',
        sender: 'beneficiary',
      },
      firstTransactionBlockNumber: 4372441,
      lastTransactionBlockNumber: 4443043,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async () =>
      // constant not exposed
      `${formatNumber(33333333)} SWM`,
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.startTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.endTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async () => 'successful',
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true, comment: 'We were able to add source code ourselves' },
    q4: { answer: true, comment: 'Code verifies. Solidity 0.4.14 was used, contrary to documentation' },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: false, comment: 'Tokens can be generated in presaleMint without sending ETH.' },
    q8: { answer: null, comment: 'Does not seem any other currency besides ETH was accepted, except pre-sale which was not public (probably)' },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true, comment: 'Please note that MiniMe token is used and it enables controller to disable transfers. Controller source code is not provided.' },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  addedBy: 'Marcin Rudolf',
  dateAdded: '25-11-2017',
};
