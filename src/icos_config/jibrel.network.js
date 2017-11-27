export default {
  crowdSaleTokenContract: 'jibrel-smart-contract-not-provided',
  information: {
    name: 'Jibrel Network',
    logo: 'https://jibrel.network/assets/img/favicon.png',
    website: 'https://jibrel.network/',
  },
  events: {},
  icoParameters: {
    cap: async icoContract => 'not provided',
    startDate: async icoContract => 'Nov. 27th, 2017 (from webpage)',
    endDate: async icoContract => 'not provided',
    status: async icoContract => 'not provided',
  },
  matrix: {
    q1: {
      answer: false, comment: 'There was audit on crowdsale smart contract code, however process on sale.jibrel.network indicated backend driven fundraiser.' },
    q2: { answer: false, comment: `Smart contract code was removed from github (https://github.com/jibrelnetwork/jibrel-contracts),
      we also could not find the audited code mentioned in blog. Sale page returned cloudflare error invalid cert (https://sale.jibrel.network/), as of 26.11.2017 it works again.` },
    q3: { answer: false },
    q4: { answer: null },
    q5: { answer: null },
    q6: { answer: false },
    q7: { answer: false },
    q8: { answer: false },
    q9: { answer: false },
    q10: { answer: null },
    q11: {
      answer: false,
      comment: 'No token smart contract available. We can re-consider when smart contract deployed.',
    },
    q12: { answer: false },
    q13: { answer: false },
    q14: { answer: false },
  },
  addedBy: 'Rudolfix',
  dateAdded: '23-11-2017',
};
