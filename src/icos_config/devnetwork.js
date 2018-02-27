export default {
  crowdSaleTokenContract:'devnetwork-smart-contract-not-provided',
  information: {
    name: "Devnetwork",
    website: "https://dev.wi.th/ico",
    logo: 'https://dev.wi.th/ico/wp-content/uploads/2018/01/utility-token.png'
  },
  events: {},
  icoParameters: {
    cap: async (web3, icoContract) => '400 000 000 DEV',
    startDate: async icoContract => 'Feb. 16th, 2018 (from webpage)',
    endDate: async icoContract => 'Mar. 30th, 2018 (from webpage)',
    status: async () => 'in progress',
  },
  matrix: {
    q1: { answer: false, comment: 'Funds are collected on backend. Token contract exists but it is not used during fundraiser' },
    q2: { answer: false, comment: '' },
    q3: { answer: false, comment: '' },
    q4: { answer: null, comment: '' },
    q5: { answer: false, comment: '' },
    q6: { answer: false, comment: 'Funds gathering process is not auditable. It happens via an account generated per investor for which it does not have private key.' },
    q7: { answer: null, comment: '' },
    q8: { answer: false, comment: 'Internal calculations happen in ETH'  },
    q9: { answer: null, comment: 'Transactions are processed through an account generated per investor in each coin\'s respective network (except XLM and XRP that use different memos generation).' },
    q10: { answer: false, comment: '' },
    q11: { answer: false, comment: 'All stages of ICO are triggered by the admin. Token transfers are enabled when ICO is finalized so it is subject to admin good will and is not controlled by the contract.' },
    q12: { answer: false, comment: '' },
    q13: { answer: false, comment: '' },
    q14: { answer: false, comment: '' },
  },
  addedBy: 'thanawatnew',
  dateAdded: '27-02-2018',
}
