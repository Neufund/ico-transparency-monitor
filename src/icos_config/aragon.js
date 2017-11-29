import { toPromise } from '../utils';
import { convertWeb3Value, convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x0cEB0D54A7e87Dfa16dDF7656858cF7e29851fD7',
  tokenContract: '0x960b236A07cf122663c4303350609A66A7B288C0',
  information: {
    name: 'Aragon',
    logo: 'https://aragon.one/favicon-228.png',
    website: 'https://aragon.network/',
  },
  events: {
    NewBuyer: {
      args: {
        tokens: 'antAmount',
        sender: 'holder',
        ether: 'etherAmount', // status ICO logs actual ether value !== transaction ether as they return overflow to sender
      },
      firstTransactionBlockNumber: 3723000,
      lastTransactionBlockNumber: 3723218,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const hardCapETH = await toPromise(icoContract.hardCap)();
      return `Hard Cap: ${convertWeb3Value(hardCapETH, 'ether')} ETH + hidden cap`;
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.initialBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.finalBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    status: async icoContract => 'successful',
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: {
      answer: true,
      comment: 'Significant effort to manage funds in trustlessway. Locked until ICO is finished and tokens are assigned.',
    },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true, comment: 'Code has high quality' },
    q11: { answer: true },
    q12: { answer: true, comment: 'price goes from block to block' },
    q13: { answer: true },
    q14: {
      answer: true,
      comment: 'there is a hidden cap that is revealed during ICO. hard to say what was the intention of having two caps was',
    },
  },
  addedBy: 'Rudolfix',
  dateAdded: '16-07-2017',
};
