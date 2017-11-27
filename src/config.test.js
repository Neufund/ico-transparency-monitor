export default {
  ICOs: {
    '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf': {
      tokenContract: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
      information: {
        name: 'EOS',
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
        cap: (web3, icoContract) => 'TESTING DATA',
        startDate: (web3, icoContract) => 'TESTING DATA',
        endDate: (web3, icoContract) => 'TESTING DATA',
        status: (web3, icoContract) => 'TESTING DATA',
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true, comment: `Mind that owners can take ETH 
        whenever thay want - nothing is locked! In principle this 
        allows to manipulate daily EOS price` },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: false, comment: `Code is short but full of 
        tricks: for example EOS day has 23 hours, claimAll method
         will soon throw out of gas (it is a gas eater!), one day
          after ICO ends claims are blocked etc.` },
        q11: { answer: true, comment: `Contract is designed to be
         an ETH sucking mechanism without any shame, but as it is 
         done transparently and in a trustless way, we say Yes 
         here. code is law ;>` },
        q12: { answer: true, comment: `Price set due to demand each day,
         mind to claim your tokens!` },
        q13: { answer: true, comment: `May be started and re-started 
        whenever Tezos wantsz` },
        q14: { answer: false, comment: `EOS day has 23 hours and after ICO is
         closed you lose your ability to claim` },
      },
      addedBy: 'Marcin Rudlfix',
      decimals: 18,
    },
  },
};
