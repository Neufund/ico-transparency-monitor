import { toPromise, formatNumber } from './utils';
import { convertWeb3Value, convertBlockNumberToDate } from './utils/web3';
import testConfig from './config.test';
import { rpcHost } from './env.json';

const gnosis = {
  tokenContract: '0x6810e776880C02933D47DB1b9fc05908e5386b96',
  information: {
    aliasName: 'Gnosis',
    website: 'https://gnosis.pm/',
    logo: 'https://coindexter.s3.amazonaws.com/uploads/network/logo/59/gnosis.png',
  },
  events: {
    BidSubmission: {
      args: {
        ether: 'amount',
        sender: 'sender',
      },
      firstTransactionBlockNumber: 3593271,
      lastTransactionBlockNumber: 3593309,
      countTransactions: true,
    },
    Transfer: {
      args: {
        tokens: 'value',
        sender: 'to',
      },
      customArgs: {
        from: '0x1d0dcc8d8bcafa8e8502beaeef6cbd49d3affcdc',
      },
      firstTransactionBlockNumber: 3593310, // next block after finalizeAuction() call
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 12960 * 10, // scan in ~ 30 days blocks, last one is open
      countTransactions: false,
      tokenEvent: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCapGno = await toPromise(icoContract.MAX_TOKENS_SOLD)().valueOf();
      const maxCapEth = await toPromise(icoContract.ceiling)().valueOf();
      return `${maxCapGno / (10 ** 18)} GNO or ${maxCapEth / (10 ** 18)} ETH`;
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.startBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endTime = await toPromise(icoContract.endTime)();
      return convertWeb3Value(endTime, 'timestamp').formatDate();
    },
    status: async icoContract => 'successful',
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: {
      answer: true,
      comment: 'This ICO was conducted as Dutch Auction so final price was available after ICO finished.',
    },
    q7: { answer: true, comment: 'There is no min cap - tokens will be always distributed.' },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  decimals: 18,
  addedBy: 'Krzysztof Kaczor',
};

let config = {
  ICOs: {
    'filescoin-smart-contract-not-provided': {
      information: {
        aliasName: 'Filecoin ETH fundraiser',
        logo: 'https://pbs.twimg.com/profile_images/489720503892856832/XZt8MkUk.png',
        website: 'https://coinlist.co/',
      },
      events: {
      },
      icoParameters: {
        cap: async icoContract => 'not provided',
        startDate: async icoContract => 'not provided',
        endDate: async icoContract => 'not provided',
        status: async icoContract => 'not provided',
      },
      matrix: {
        q1: { answer: false, comment:
          `Funds in ETH, BTC and USD are gathered by Coinlist's backend so Ether is processed no different form fiat. 
           HD wallets are created for participants (BIP32 we assume) which are probably monitored by backend that can derive private keys to control funds. 
          CoinList could provide public master key for ETH and BTC to let external auditors monitor ICO funds, but we cannot find those. 
          SO WHY IT IS HERE? BECAUSE IT IS PRESENTED AS TOKEN SALE AND IT HAPPENS ON ETHEREUM (among others)`},
        q2: { answer: false },
        q3: { answer: false },
        q4: { answer: null },
        q5: { answer: null },
        q6: { answer: false, comment: "There is no way to externally monitor ETH funds as master public key is not provided. You are as good as sending a signed transaction in envelope to Coinlist."  },
        q7: { answer: false},
        q8: { answer: false, comment: "Fiat is entirely handled by banks, no pegged token is used to represent it, that eliminates fiat from any external auditing." },
        q9: { answer: false},
        q10: { answer: null },
        q11: { answer: true,
          comment: `SAFT agreement is an advance in token holder rights protection. It goes beyond typical ICO terms in using existing legal system for holders protection. 
          Should be cryptographically signed by private key of the token holder and kept in token contract to be trustless.` },
        q12: { answer: false, comment: 'No tokens are generated!' },
        q13: { answer: false, comment: 'No tokens are generated!' },
        q14: { answer: false, comment: 'No tokens are generated!' },
      },
      addedBy: 'Mostafa Balata',
    },
    '0x1d0dcc8d8bcafa8e8502beaeef6cbd49d3affcdc': gnosis,
    '0xF8094e15c897518B5Ac5287d7070cA5850eFc6ff': {
      tokenContract: '0x0abdace70d3790235af448c88547603b945604ea',
      information: {
        aliasName: 'district0x',
        logo: 'https://district0x.io/images/favicon.png',
        website: 'https://district0x.io/',
      },
      events: {
        onContribution: {
          args: {
            tokens: null, // actually district0x does not issue tokens in trustless way
            sender: 'contributor',
            ether: 'amount', // district0x ICO logs actual ether value !== transaction ether as they return overflow to sender
          },
          firstTransactionBlockNumber: 4039777,
          lastTransactionBlockNumber: 4104890, // this will follow new blocks for ongoing ICOs
          countTransactions: true,
        },
        onCompensated: {
          args: {
            tokens: 'amount', // Amount of DNT received. Not really needed to store,
            sender: 'contributor',
          },
          firstTransactionBlockNumber: 4039777,
          lastTransactionBlockNumber: 4104890, // this will follow new blocks for ongoing ICOs
          countTransactions: false,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const softCapETH = await toPromise(icoContract.softCapAmount)();
          const hardCapETH = await toPromise(icoContract.hardCapAmount)();
          return [`Hard: ${convertWeb3Value(hardCapETH, 'ether')} ETH`, `Soft: ${convertWeb3Value(softCapETH, 'ether')} ETH`];
        },
        startDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.startTime)();
          return convertWeb3Value(timestamp, 'timestamp').formatDate();
        },
        endDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.endTime)();
          return convertWeb3Value(timestamp, 'timestamp').formatDate();
        },
        status: async (web3, icoContract) => {
          const isRunning = await toPromise(icoContract.isContribPeriodRunning)();
          // when contribution is over then successful as there is not failure condition in smart contract
          return isRunning.valueOf() ? 'in progress' : 'successful';
        },
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true, comment: 'Tokens are not created in trustless way so this information is not available' },
        q6: { answer: true },
        q7: { answer: true },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true },
        q11: { answer: false,
          comment: 'Several issues: 1. no refund mechanism implemented so this is at good will of multisig owner ' +
        '2. tokens are not generated in trustless way and they may be or may be not generated after ICO by the owner ' +
        '3. ICO owner has access to all funds all the time, he may choose to not generate tokens and still gets all the money, smart contract could protect against that but does not. ' +
        '4. several other minor issues' },
        q12: { answer: true, comment: 'price depends on total contribution amount' },
        q13: { answer: true },
        q14: { answer: true },
      },
      addedBy: 'Rudolfix',
    },
    '0xb56d622DDF60ec532B5f43B4Ff9B0e7b1FF92dB3': {
      information: {
        aliasName: 'TEZOS Fundraiser',
        logo: 'https://www.tezos.com/static/favicon.ico',
        website: 'https://www.tezos.com/',
      },
      events: {
        Deposit: {
          args: {
            tokens: null, // not an ICO
            sender: 'tezos_pk_hash',
          },
          firstTransactionBlockNumber: 3936447,
          lastTransactionBlockNumber: 4016095,
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => 'no max nor min cap',
        startDate: async (web3, icoContract) => 'NOT AN ICO!',
        endDate: async (web3, icoContract) => 'NOT AN ICO!',
        status: async (web3, icoContract) => {
          const isRunning = await toPromise(icoContract.accept)();
          // tezos does what they want. may start at any moment in the future
          return isRunning.valueOf() ? 'in progress' : 'successful';
        },
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true, comment: "They didn't bother to attach code to actual fundraising smart contract but etherscan is solving this by bytecode search" },
        q4: { answer: true },
        q5: { answer: false, comment: 'They do not track senders of ETH, no refund mechanism' },
        q6: { answer: true },
        q7: { answer: true },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true },
        q11: { answer: false, comment: 'No investor rights are protected. You send money and Tezos takes it. Not any better than sending $$$ in envelope to Tezos office.' },
        q12: { answer: false, comment: 'Not an ICO - no tokens created' },
        q13: { answer: false, comment: 'May be started and re-started whenever Tezos wants' },
        q14: { answer: false, comment: 'May be stopped and re-started whenever Tezos wants' },
      },
      addedBy: 'Rudolfix',
    },
    '0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf': {
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
        q7: { answer: true, comment: 'Mind that owners can take ETH whenever thay want - nothing is locked! In principle this allows to manipulate daily EOS price' },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: false, comment: 'Code is short but full of tricks: for example EOS day has 23 hours, claimAll method will soon throw out of gas (it is a gas eater!), one day after ICO ends claims are blocked etc.' },
        q11: { answer: true, comment: 'Contract is designed to be an ETH sucking mechanism without any shame, but as it is done transparently and in a trustless way, we say Yes here. code is law ;>' },
        q12: { answer: true, comment: 'Price set due to demand each day, mind to claim your tokens!' },
        q13: { answer: true },
        q14: { answer: false, comment: 'EOS day has 23 hours and after ICO is closed you lose your ability to claim' },
      },
      alternativeLoadingMsg: 'EOS ICO is generating hundreds of thousands of events that we need to analyze. Loading will take more than one minute.',
      addedBy: 'Rudolfix',
    },
    '0x0cEB0D54A7e87Dfa16dDF7656858cF7e29851fD7': {
      tokenContract: '0x960b236A07cf122663c4303350609A66A7B288C0',
      information: {
        aliasName: 'Aragon Network',
        logo: 'https://aragon.one/favicon.png',
        website: 'https://aragon.network/',
      },
      events: {
        NewBuyer: {
          args: {
            tokens: 'antAmount',
            sender: 'holder',
            ether: 'etherAmount', // status ICO logs actual ether value !== transaction ether as they return overflow to sender
          },
          firstTransactionBlockNumber: 3723000,
          lastTransactionBlockNumber: 3723218,
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const hardCapETH = await toPromise(icoContract.hardCap)();
          return `Hard Cap: ${convertWeb3Value(hardCapETH, 'ether')} ETH + hidden cap`;
        },
        startDate: async (web3, icoContract) => {
          const blockNumber = await toPromise(icoContract.initialBlock)();
          return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
        },
        endDate: async (web3, icoContract) => {
          const blockNumber = await toPromise(icoContract.finalBlock)();
          return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
        },
        status: async icoContract => 'successful',
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true, comment: 'Significant effort to manage funds in trustlessway. Locked until ICO is finished and tokens are assigned.' },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true, comment: 'Code has high quality' },
        q11: { answer: true },
        q12: { answer: true, comment: 'price goes from block to block' },
        q13: { answer: true },
        q14: { answer: true, comment: 'there is a hidden cap that is revealed during ICO. hard to say what was the intention of having two caps was' },
      },
      addedBy: 'Rudolfix',
    },
    '0x55d34b686aa8C04921397c5807DB9ECEdba00a4c': {
      tokenContract: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
      information: {
        aliasName: 'StatusNetwork',
        logo: 'http://status.im/img/new-site/apple-touch-icon-180.png?v=50fbb69',
        website: 'https://status.im/',
      },
      events: {
        NewSale: {
          args: {
            tokens: '_tokens',
            sender: '_th',
            ether: '_amount', // status ICO logs actual ether value !== transaction ether as they return overflow to sender
          },
          firstTransactionBlockNumber: 3903900,
          lastTransactionBlockNumber: 3907820,
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const failSafeETH = await toPromise(icoContract.failSafeLimit)();
          return `${convertWeb3Value(failSafeETH, 'ether')} ETH`;
        },
        startDate: async (web3, icoContract) => {
          const blockNumber = await toPromise(icoContract.startBlock)();
          return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
        },
        endDate: async (web3, icoContract) => {
          const blockNumber = await toPromise(icoContract.endBlock)();
          return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
        },
        // again we could write a proper check here for example by checking finalizedBlock value
        // however we already know that ICO was succesful
        status: async icoContract => 'successful',
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true, comment: 'Code has high quality' },
        q11: { answer: true },
        q12: { answer: true, comment: 'exchangeRate is constant' },
        q13: { answer: true, comment: 'yes, with multiple rounds' },
        q14: { answer: true, comment: 'owner can stop ICO before failSafe' },
      },
      addedBy: 'Rudolfix',
    },
    '0xa74476443119a942de498590fe1f2454d7d4ac0d': {
      information: {
        aliasName: 'Golem',
        website: 'https://golem.network/',
        logo: 'https://golem.network/icons/apple-touch-icon.png',
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
          firstTransactionBlockNumber: 2607801,
          lastTransactionBlockNumber: 2607938, // use block number to skip tokens created in finalize()
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
          const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
          return [`Max: ${maxCap / 10 ** 18} GNT`, `Min: ${minCap / 10 ** 18} GNT`];
        },
        startDate: async (web3, icoContract) => {
          const blockNumber = await toPromise(icoContract.fundingStartBlock)();
          return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
        },
        endDate: async (web3, icoContract) => {
          const blockNumber = await toPromise(icoContract.fundingEndBlock)();
          return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
        },
        status: async icoContract => 'successful', // we know that because it is over, we could write some condition instead
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true },
        q11: { answer: true },
        q12: { answer: true },
        q13: { answer: true },
        q14: { answer: true },
      },
      decimals: 18, // golem does not provide decimals
      addedBy: 'Mostafa Balata',
    },
    '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0': {
      tokenContract: '0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
      information: {
        aliasName: 'MelonPort',
        website: 'https://melonport.com/',
        logo: 'https://melonport.com/favicon.png',
      },
      events: {
        TokensBought: {
          args: {
            tokens: 'amount',
            sender: 'sender',
          },
          firstTransactionBlockNumber: 3175204,
          lastTransactionBlockNumber: 3187613,
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const ethCap = await toPromise(icoContract.ETHER_CAP)();
          // const preEthCap = await toPromise(icoContract.BTCS_ETHER_CAP)();
          return `${convertWeb3Value(ethCap, 'ether')} ETH`;
        },
        startDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.startTime)();
          return convertWeb3Value(timestamp, 'timestamp').formatDate();
        },
        endDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.endTime)();
          return convertWeb3Value(timestamp, 'timestamp').formatDate();
        },
        status: async icoContract => 'successful',

      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true, comment: 'Simple, clean code' },
        q11: { answer: true },
        q12: { answer: true },
        q13: { answer: true },
        q14: { answer: true, comment: 'Halting function has no impact as there is no minimum cap' },
      },
      addedBy: 'Mostafa Balata',
    },
    '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413': {
      information: {
        aliasName: 'TheDAO',
        website: 'https://daowiki.atlassian.net/wiki',
        logo: 'https://daowiki.atlassian.net/wiki/download/attachments/655365/DAO?version=2&modificationDate=1462133209864&cacheVersion=1&api=v2',
      },
      events: {
        CreatedToken: {
          args: {
            tokens: 'amount',
            sender: 'to',
          },
          firstTransactionBlockNumber: 0,
          lastTransactionBlockNumber: 'latest',
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const daoMinCap = await toPromise(icoContract.minTokensToCreate)();
          return [`Min: ${convertWeb3Value(daoMinCap, 'ether')} DAOs `, 'Max: unbounded'];
        },
        startDate: async icoContract => 'contract creation',
        endDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.closingTime)();
          return convertWeb3Value(timestamp, 'timestamp').formatDate();
        },
        status: async icoContract => 'successful', // could return isFueled
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: true },
        q3: { answer: true },
        q4: { answer: true },
        q5: { answer: true },
        q6: { answer: true },
        q7: { answer: true },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: true },
        q11: { answer: true, comment: 'Decision if to treat re-entrancy bug as breach of token holder rights is hard. We decided: NO, as TheDAO stated: code is law ;>' },
        q12: { answer: true },
        q13: { answer: true },
        q14: { answer: true },
      },
      addedBy: 'Mostafa Balata',

    },
    '0xE7775A6e9Bcf904eb39DA2b68c5efb4F9360e08C': {
      information: {
        aliasName: 'TAAS',
        logo: 'https://taas.fund/img/fav_icon.png',
        website: 'https://taas.fund/',
      },
      events: {
        Transfer: {
          args: {
            tokens: 'value',
            sender: 'to',
          },
          customArgs: {
            from: '0x94917caf0cb1131345911874a2ceaf6ae2e8ee0f',
          },
          firstTransactionBlockNumber: 3427798,
          lastTransactionBlockNumber: 3648684,
          countTransactions: true,
        },
      },
      icoParameters: {
        cap: async icoContract => 'not provided',
        startDate: async icoContract => 'not provided',
        endDate: async icoContract => 'not provided',
        status: async icoContract => 'not provided',
      },
      matrix: {
        q1: { answer: true },
        q2: { answer: false, comment: 'Source code provided is just this proxy over EToken2 contract with address 0x331d077518216c07c87f4f18ba64cd384c411f84, basically useless.' },
        q3: { answer: false },
        q4: { answer: null },
        q5: { answer: null },
        q6: { answer: false, comment: 'Ether is not sent to smart contract, probably handled on backend' },
        q7: { answer: null },
        q8: { answer: null },
        q9: { answer: null },
        q10: { answer: null },
        q11: { answer: false },
        q12: { answer: null },
        q13: { answer: null },
        q14: { answer: null },
      },
      addedBy: 'Mostafa Balata',
    }
  },
  rpcHost,
  defaultDecimal: 18,
  matrix: {
    q1: { question: 'Is ICO controlled by a smart contract?', critical: true, notApplicable: false },
    q2: { question: 'Is smart contract source code available?', critical: true, notApplicable: false },
    q3: { question: 'Is smart contract source code provided in etherscan?', critical: false, notApplicable: false },
    q4: {
      question: 'Is instruction provided how to reproduce deployed bytecode?',
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
    q12: {
      question: 'Is price of the token controlled by smart contract?',
      critical: false,
      notApplicable: false,
    },
    q13: {
      question: 'Is ICO start condition controlled by smart contract?',
      critical: false,
      notApplicable: false,
    },
    q14: {
      question: 'Is ICO end condition controlled by smart contract?',
      critical: false,
      notApplicable: false,
    },
  },
};

if (process.env.NODE_ENV === 'test') { config = testConfig; }

export default config;
