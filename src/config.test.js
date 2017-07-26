const rpcHost = require('./env.json').rpcHost;

export default {
  ICOs: {
    '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf': {
      tokenContract: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
      information: {
        aliasName: 'EOS',
        logo: 'https://d340lr3764rrcr.cloudfront.net/Images/favicon.ico',
        website: 'https://eos.io/',
      },
      events: {
        LogBuy: {
          args: {
            tokens: null, // tokens not generated here, just ether gathered
            sender: 'user',
          },
          firstTransactionBlockNumber: 3932884,
          lastTransactionBlockNumber: null, // follow last block
          maxBlocksInChunk: 12960, // scan in 3 const eventArgs = selectedICO.event.args;days blocks, last one is open
          countTransactions: true,
        },
        LogClaim: {
          args: {
            tokens: 'amount', // tokens are generated when claimed
            sender: 'user',
          },
          firstTransactionBlockNumber: 3932884,
          lastTransactionBlockNumber: null, // follow last block
          maxBlocksInChunk: 12960, // scan in 3 days blocks, last one is open
        },
      },
      icoParameters: {
        cap: (web3, icoContract) => {
          return `TESTING DATA`;
        },
        startDate: (web3, icoContract) => {
          return `TESTING DATA`;
        },
        endDate: (web3, icoContract) => {
          return `TESTING DATA`;
        },
        status: (web3, icoContract) => {
          return `TESTING DATA`;
        },
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true, comment: 'Mind that owners can take ETH whenever thay want - nothing is locked! In principle this allows to manipulate daily EOS price' },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: false, comment: 'Code is short but full of tricks: for example EOS day has 23 hours, claimAll method will soon throw out of gas (it is a gas eater!), one day after ICO ends claims are blocked etc.' },
        q11: { answer: true, comment: 'Contract is designed to be an ETH sucking mechanism without any shame, but as it is done transparently and in a trustless way, we say Yes here. code is law ;>' },
        q12: { answer: true, comment: 'Price set due to demand each day, mind to claim your tokens!' },
        q13: { answer: true, comment: 'May be started and re-started whenever Tezos wants' },
        q14: { answer: false, comment: 'EOS day has 23 hours and after ICO is closed you lose your ability to claim' },
      },
      addedBy: 'Marcin Rudlfix',
      decimals : 18
    }
  },
  rpcHost,
  defaultDecimal: 18,
  matrix: {
    q1: { question: 'Is ICO controlled by a smart contract?', critical: false, notApplicable: false },
    q2: { question: 'Is smart contract source code available?', critical: true, notApplicable: false },
    q3: { question: 'Is smart contract source code provided in etherscan?', critical: false, notApplicable: false },
    q4: {
      question: 'Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)',
      critical: false,
      notApplicable: false,
    },
    q5: {
      question: 'Does smart contract provide all tracking data via events?',
      critical: false,
      notApplicable: false,
    },
    q6: {
      question: 'Is information on token price in ETH provided? (via event or in transaction?)',
      critical: true,
      notApplicable: true,
    },
    q7: { question: 'Does smart contract handle ETH in a trustless way?', critical: false, notApplicable: true },
    q8: {
      question: 'If ICO is using other currencies is information on token price provided?',
      critical: true,
      notApplicable: true,
    },
    q9: {
      question: 'Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?',
      critical: false,
      notApplicable: true,
    },
    q10: {
      question: 'Was smart contract code easy to read and properly commented?',
      critical: false,
      notApplicable: false,
    },
    q11: {
      question: 'Are token holder rights protected in trustless way?',
      critical: true,
      notApplicable: false,
    },
    q12: { question: 'Is price of the token deterministic?', critical: false, notApplicable: false },
    q13: {
      question: 'Is ICO start condition specified in contract?',
      critical: false,
      notApplicable: false,
    },
    q14: {
      question: 'Is ICO end condition specified in contract?',
      critical: false,
      notApplicable: false,
    },
  },
};
