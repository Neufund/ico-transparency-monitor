import { toPromise } from '../utils';
import { convertWeb3Value, convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x1d0dcc8d8bcafa8e8502beaeef6cbd49d3affcdc',
  tokenContract: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
  information: {
    aliasName: 'Gnosis',
    website: 'https://gnosis.pm/',
    logo: 'https://coindexter.s3.amazonaws.com/uploads/network/logo/59/gnosis.png',
  },
  events: {
    BidSubmission: {
      args: {
        ether: 'amount',
        sender: 'sender',
      },
      firstTransactionBlockNumber: 3593271,
      lastTransactionBlockNumber: 3593309,
      countTransactions: true,
    },
    Transfer: {
      args: {
        tokens: 'value',
        sender: 'to',
      },
      customArgs: {
        from: '0x1d0dcc8d8bcafa8e8502beaeef6cbd49d3affcdc',
      },
      firstTransactionBlockNumber: 3593310, // next block after finalizeAuction() call
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 12960 * 10, // scan in ~ 30 days blocks, last one is open
      countTransactions: false,
      address: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCapGno = await toPromise(icoContract.MAX_TOKENS_SOLD)().valueOf();
      const maxCapEth = await toPromise(icoContract.ceiling)().valueOf();
      return `${maxCapGno / (10 ** 18)} GNO or ${maxCapEth / (10 ** 18)} ETH`;
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.startBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endTime = await toPromise(icoContract.endTime)();
      return convertWeb3Value(endTime, 'timestamp').formatDate();
    },
    status: async icoContract => 'successful',
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: {
      answer: true,
      comment: 'This ICO was conducted as Dutch Auction so final price was available after ICO finished.',
    },
    q7: { answer: true, comment: 'There is no min cap - tokens will be always distributed.' },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  decimals: 18,
  addedBy: 'Krzysztof Kaczor',
  dateAdded: '09-08-2017',
};
