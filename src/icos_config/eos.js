import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crawdSaleTokenContract: '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf',
  tokenContract: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
  information: {
    aliasName: 'EOS',
    logo: 'https://d340lr3764rrcr.cloudfront.net/Images/favicon.ico',
    website: 'https://eos.io/',
  },
  events: {
    // in this transactions investors send money but claim their tokens later
    LogBuy: {
      args: {
        tokens: null, // tokens not generated here, just ether gathered
        sender: 'user',
        ether: null, // we will take ether from transaction value
      },
      firstTransactionBlockNumber: 3932884,
      lastTransactionBlockNumber: null, // follow last block
      maxBlocksInChunk: 12960, // scan in 3 const eventArgs = selectedICO.event.args;days blocks, last one is open
      countTransactions: true,
    },
    // in this transaction people come and claim their tokens
    LogClaim: {
      args: {
        tokens: 'amount', // tokens are generated when claimed
        sender: 'user',
      },
      firstTransactionBlockNumber: 3932884,
      lastTransactionBlockNumber: null, // follow last block
      maxBlocksInChunk: 12960, // scan in 3 days blocks, last one is open
      countTransactions: false,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const totEOS = convertWeb3Value(await toPromise(icoContract.totalSupply)(), 'ether');
      const foundersEOS = convertWeb3Value(await toPromise(icoContract.foundersAllocation)().valueOf(), 'ether');
      return `Max ${formatNumber(totEOS - foundersEOS)} EOS, no ETH cap!`;
    },
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.openTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = parseInt(await toPromise(icoContract.startTime)().valueOf());
      // (timestamp - startTime) / 23 hours + 1 -> EOS day has 23 hour days :P
      // enddate = (numberofdays - 1) * 23h + startdate
      const endTs = (await toPromise(icoContract.numberOfDays)().valueOf() - 1) * 23 * 60 * 60 + timestamp;
      return (new Date(endTs * 1000)).formatDate();
    },
    status: async (web3, icoContract) => {
      // mind EOS 23h days
      // assert(time() >= openTime && today() <= numberOfDays);
      const today = await toPromise(icoContract.today)().valueOf();
      const noDays = await toPromise(icoContract.numberOfDays)().valueOf();
      console.log(`${today} ${noDays}`);
      return today <= noDays ? 'in progress' : 'successful';
    },
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
      comment: 'Mind that owners can take ETH whenever thay want - nothing is locked! In principle this allows to manipulate daily EOS price',
    },
    q8: { answer: null },
    q9: { answer: null },
    q10: {
      answer: false,
      comment: 'Code is short but full of tricks: for example EOS day has 23 hours, claimAll method will soon throw out of gas (it is a gas eater!), one day after ICO ends claims are blocked etc.',
    },
    q11: {
      answer: true,
      comment: 'Contract is designed to be an ETH sucking mechanism without any shame, but as it is done transparently and in a trustless way, we say Yes here. code is law ;>',
    },
    q12: { answer: true, comment: 'Price set due to demand each day, mind to claim your tokens!' },
    q13: { answer: true },
    q14: { answer: false, comment: 'EOS day has 23 hours and after ICO is closed you lose your ability to claim' },
  },
  alternativeLoadingMsg: 'EOS ICO is generating hundreds of thousands of events that we need to analyze. Loading will take more than one minute.',
  addedBy: 'Rudolfix',
};
