export default {
  crowdSaleTokenContract: '0x246023fcBEf2465C8E562a2b3a046eBa492d39B1',
  information: {
    aliasName: 'Crypterium',
    website: 'https://crypterium.io',
    logo: 'https://crypterium.io/favicon.ico',
  },
  events: {
    Transfer: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      customArgs: {
        _from: '0xf0ff880297de7bd3e04a7f4381a8644fb89f2f5d',
      },
      firstTransactionBlockNumber: 4621744,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async () => 'Not Available',
    startDate: async () => 'Not Available',
    endDate: async () => 'Not Available',
    status: async () => 'in progress',
  },
  matrix: {
    q1: { answer: false, comment: 'Funds are collected on backend. Token contract exists but it is not used during fundraiser' },
    q2: { answer: null },
    q3: { answer: null },
    q4: { answer: null },
    q5: { answer: null },
    q6: { answer: false, comment: 'Funds gathering process is not auditable. It happens via accounts generated per investor for which it does not have private key.' },
    q7: { answer: false },
    q8: { answer: false, comment: 'All other currencies are handled by a backend. Process is not auditable.' },
    q9: { answer: false },
    q10: { answer: false, comment: `There is no ICO contract. Token contract exists and looks dirty. For example it is linked to SafeMath which is not at all used. 
    approveAndCall is needlessly complicated. ERC20 behaviors are not correctly implemented, allowance mechanism does not protect from transaction reordering attack etc.` },
    q11: { answer: false },
    q12: { answer: null },
    q13: { answer: null },
    q14: { answer: null },
  },
  decimals: 18,
  addedBy: 'Marcin Rudolf',
  dateAdded: '20-11-2017',
};
