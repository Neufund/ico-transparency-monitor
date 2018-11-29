export default {
  crowdSaleTokenContract:'0x123ab195dd38b1b40510d467a6a359b201af056f',
  information: {
    name: "Legolas Exchange",
    website: "https://lgo.exchange/",
    logo: 'https://lgo.exchange/img/logo.png'
  },
  events: {
    Transfer: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      customArgs: {
        _from: '0x0000000000000000000000000000000000000000',
      },
      countTransactions: true
    },
    ...
  },
  icoParameters: {
    // should be written manually using JavaScript code that connects with the smart contract
    cap: async icoContract => 'not provided',
    startDate: async icoContract => '2018-02-01',
    endDate: async icoContract => '2018-02-15',
    // known because the ico is over, so there is no need to write a condition to determine status
    status: async () => 'successful',
  },
  matrix: {
    q1: { answer: true, comment: '' },
    q2: { answer: true, comment: '' },
    q3: { answer: true, comment: 'Contract Source Code Verified (Exact Match) according to etherscan ' },
    q4: { answer: false, comment: '' },
    q5: { answer: true, comment: '' },
    q6: { answer: true, comment: '' },
    q7: { answer: false, comment: '' },
    q8: { answer: null, comment: '' },
    q9: { answer: null, comment: '' },
    q10: { answer: true, comment: '' },
    q11: { answer: false, comment: '' },
    q12: { answer: true, comment: '' },
    q13: { answer: true, comment: '' },
    q14: { answer: true, comment: '' },
  }
  alternativeLoadingMsg:
  addedBy:"Kabbykabs",
  dateAdded: '2018-11-29',
}
