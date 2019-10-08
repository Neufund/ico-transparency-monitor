import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xF8094e15c897518B5Ac5287d7070cA5850eFc6ff',
  tokenContract: '0x0abdace70d3790235af448c88547603b945604ea',
  information: {
    name: 'district0x',
    logo: 'https://district0x.io/images/favicon.png',
    website: 'https://district0x.io/',
  },
  events: {
    onContribution: {
      args: {
        tokens: null, // actually district0x does not issue tokens in trustless way
        sender: 'contributor',
        ether: 'amount', // district0x ICO logs actual ether value !== transaction ether as they return overflow to sender
      },
      firstTransactionBlockNumber: 4039777,
      lastTransactionBlockNumber: 4104890, // this will follow new blocks for ongoing ICOs
      countTransactions: true,
    },
    onCompensated: {
      args: {
        tokens: 'amount', // Amount of DNT received. Not really needed to store,
        sender: 'contributor',
      },
      firstTransactionBlockNumber: 4039777,
      lastTransactionBlockNumber: 4104890, // this will follow new blocks for ongoing ICOs
      countTransactions: false,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const softCapETH = await toPromise(icoContract.softCapAmount)();
      const hardCapETH = await toPromise(icoContract.hardCapAmount)();
      return [`Hard: ${convertWeb3Value(hardCapETH, 'ether')} ETH`, `Soft: ${convertWeb3Value(softCapETH, 'ether')} ETH`];
    },
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.startTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.endTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const isRunning = await toPromise(icoContract.isContribPeriodRunning)();
      /* when contribution is over then successful as
      there is not failure condition in smart contract
      */
      return isRunning.valueOf() ? 'in progress' : 'successful';
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true, comment: 'Tokens are not created in trustless way so this information is not available' },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: {
      answer: false,
      comment: 'Several issues: 1. no refund mechanism implemented so this is at good will of multisig owner ' +
            '2. tokens are not generated in trustless way and they may be or may be not generated after ICO by the owner ' +
            '3. ICO owner has access to all funds all the time, he may choose to not generate tokens and still gets all the money, smart contract could protect against that but does not. ' +
            '4. several other minor issues',
    },
    q12: { answer: true, comment: 'price depends on total contribution amount' },
    q13: { answer: true },
    q14: { answer: true },
  },
  addedBy: 'Rudolfix',
  dateAdded: '26-07-2017',
};
