export default {
  information: {
    aliasName: 'Kin',
    logo: 'https://kin.kik.com/favicon-32x32.png',
    website: 'https://kin.kik.com/',
  },
  events: {},
  icoParameters: {
    cap: async icoContract => 'not provided',
    startDate: async icoContract => 'not provided',
    endDate: async icoContract => 'not provided',
    status: async icoContract => 'not provided',
  },
  matrix: {
    q1: {
      answer: false, comment: `No source code and no information how actual fundraiser will proceed is disclosed. Is there crowdsale smart contract? Is it backend driven fundraiser 
      like Filecoin? Certainly less information is available to external observers than in Filecoin case. On the other hand it is announced that funds are raised only in ETH and kin is 
      ERC20 token so we `
    },
    q2: { answer: false },
    q3: { answer: false },
    q4: { answer: null },
    q5: { answer: null },
    q6: { answer: false, comment: 'Auditing funds not possible.' },
    q7: { answer: false },
    q8: { answer: false },
    q9: { answer: false },
    q10: { answer: null },
    q11: {
      answer: false,
      comment: 'No token smart contract available. No legal contract like SAFT available. Is token transferable? Is secondary market allowed? Any vesting? This remains unanswered.'
    },
    q12: { answer: false },
    q13: { answer: false },
    q14: { answer: false }
  },
  addedBy: 'Rudolfix',
};
