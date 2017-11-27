export default {
  crowdSaleTokenContract: '0xe81d72d14b1516e68ac3190a46c93302cc8ed60f',
  information: {
    aliasName: 'Coinlancer',
    website: 'https://www.coinlancer.io/',
    logo: 'https://www.coinlancer.io/images/Logo-noC-Color32.png',
  },
  events: {
    Transfer: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      customArgs: {
        _from: '0x9b96042c0b9cf2823ebb90b51ceffd67fc70f776',
      },
      firstTransactionBlockNumber: 4414189,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => 'Not Available',
    startDate: async (web3, icoContract) => 'Not Available',
    endDate: async (web3, icoContract) => 'Not Available',
    status: async () => 'Not Available',
  },
  matrix: {
    q1: { answer: false, comment: `Funds are collected on backend. Token contract exists
     but it is not used during fundraiser.` },
    q2: { answer: null },
    q3: { answer: false, comment: `Token contract exists, but it's not used to 
    transfer the money in transparent way.` },
    q4: { answer: null },
    q5: { answer: false, comment: 'Smart contract doesn\'t say any thing.' },
    q6: { answer: false },
    q7: { answer: false },
    q8: { answer: false, comment: 'All other currencies are handled by a backend.' },
    q9: { answer: false },
    q10: { answer: false, comment: `There is no real ICO contract, they only 
    implement basic transfer method.` },
    q11: { answer: false },
    q12: { answer: null },
    q13: { answer: null },
    q14: { answer: null },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
  dateAdded: '27-11-2017',
};
