export default {
  crawdSaleTokenContract: 'filescoin-smart-contract-not-provided',
  information: {
    aliasName: 'Filecoin ETH fundraiser',
    logo: 'https://pbs.twimg.com/profile_images/489720503892856832/XZt8MkUk.png',
    website: 'https://coinlist.co/',
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
      answer: false, comment: `Funds in ETH, BTC and USD are gathered by Coinlist's backend so Ether is processed no different form fiat. 
           HD wallets are created for participants (BIP32 we assume) which are probably monitored by backend that can derive private keys to control funds. 
          CoinList could provide public master key for ETH and BTC to let external auditors monitor ICO funds, but we cannot find those. 
          SO WHY IT IS HERE? BECAUSE IT IS PRESENTED AS TOKEN SALE AND IT HAPPENS ON ETHEREUM (among others)`,
    },
    q2: { answer: false },
    q3: { answer: false },
    q4: { answer: null },
    q5: { answer: null },
    q6: {
      answer: false,
      comment: 'There is no way to externally monitor ETH funds as master public key is not provided. You are as good as sending a signed transaction in envelope to Coinlist.',
    },
    q7: { answer: false },
    q8: {
      answer: false,
      comment: 'Fiat is entirely handled by banks, no pegged token is used to represent it, that eliminates fiat from any external auditing.',
    },
    q9: { answer: false },
    q10: { answer: null },
    q11: {
      answer: true,
      comment: `SAFT agreement is an advance in token holder rights protection. It goes beyond typical ICO terms in using existing legal system for holders protection. 
          Still you need to personally trust Filecoin that tokens will be generated or refunded if deadline is not met - so it is NOT TRUSTLESS as in smart contract that will guarantee such things. 
          See SAFT for more details.`,
    },
    q12: { answer: false, comment: 'No tokens are generated!' },
    q13: { answer: false, comment: 'No tokens are generated!' },
    q14: { answer: false, comment: 'No tokens are generated!' },
  },
  addedBy: 'Mostafa Balata',
  addingDate: '10-08-2017'
};
