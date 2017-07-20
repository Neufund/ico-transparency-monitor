import { toPromise } from './utils';
import { convertWeb3Value, convertBlockNumberToDate } from './utils/web3';

const rpcHost = require('./env.json').rpcHost;

export default {
  ICOs: {
    '0xF8094e15c897518B5Ac5287d7070cA5850eFc6ff': {
      tokenContract: '0x0abdace70d3790235af448c88547603b945604ea',
      information: {
        aliasName: 'district0x',
        logo: 'https://district0x.io/images/favicon.png',
        website: 'https://district0x.io/',
      },
      event: {
        args: {
          tokens: null, // actually district0x does not issue tokens in trustless way
          sender: 'contributor',
          ether: 'amount', // district0x ICO logs actual ether value !== transaction ether as they return overflow to sender
        },
        name: 'onContribution',
        firstTransactionBlockNumber: 4039777,
        lastTransactionBlockNumber: null, // this will follow new blocks for ongoing ICOs
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const softCapETH = await toPromise(icoContract.softCapAmount)();
          const hardCapETH = await toPromise(icoContract.hardCapAmount)();
          return `Hard: ${convertWeb3Value(web3, hardCapETH, 'ether')} ETH, Soft: ${convertWeb3Value(web3, softCapETH, 'ether')} ETH`;
        },
        startDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.startTime)();
          return convertWeb3Value(web3, timestamp, 'timestamp').formatDate();
        },
        endDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.endTime)();
          return convertWeb3Value(web3, timestamp, 'timestamp').formatDate();
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
          comment: 'Several issues: 1. no refund mechanism implemented so this is at good will of multisig owner' +
        '2. tokens are not generated in trustless way and they may be or may be not generated after ICO by the owner' +
        '3. ICO owner has access to all funds all the time, he may choose to not generate tokens and still gets all the money, smart contract could protect against that but does not.' +
        '4. several other minor issues' },
        q12: { answer: true, comment: 'price depends on total contribution amount' },
        q13: { answer: true },
        q14: { answer: true },
      },
    },
    '0x55d34b686aa8C04921397c5807DB9ECEdba00a4c': {
      tokenContract: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
      information: {
        aliasName: 'StatusNetwork',
        logo: 'http://status.im/img/new-site/apple-touch-icon-180.png?v=50fbb69',
        website: 'https://status.im/',
      },
      event: {
        args: {
          tokens: '_tokens',
          sender: '_th',
          ether: '_amount', // status ICO logs actual ether value !== transaction ether as they return overflow to sender
        },
        name: 'NewSale',
        firstTransactionBlockNumber: 3903900,
        lastTransactionBlockNumber: 3907820,
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const failSafeETH = await toPromise(icoContract.failSafeLimit)();
          return `${convertWeb3Value(web3, failSafeETH, 'ether')} ETH`;
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
        q14: { answer: false, comment: 'no, ICO can be stopped and rounds revealed at owner whim' },
      },
    },
    '0xa74476443119a942de498590fe1f2454d7d4ac0d': {
      information: {
        aliasName: 'Golem',
        website: 'https://golem.network/',
        logo: 'https://golem.network/icons/apple-touch-icon.png',
      },
      event: {
        args: {
          tokens: '_value',
          sender: '_to',
        },
        name: 'Transfer',
        customArgs: {
          _from: '0x0000000000000000000000000000000000000000',
        },
        firstTransactionBlockNumber: 2607801,
        lastTransactionBlockNumber: 2607938, // use block number to skip tokens created in finalize()
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
          const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
          return `Max: ${maxCap / 10 ** 18}\n Min: ${minCap / 10 ** 18} GNT`;
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
    },
    '0x3BF541f87056D134E0109BE1Be92978b26Cb09e0': {
      tokenContract: '0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1',
      information: {
        aliasName: 'MelonPort',
        website: 'https://melonport.com/',
        logo: 'https://melonport.com/favicon.png',
      },
      event: {
        args: {
          tokens: 'amount',
          sender: 'sender',
        },
        name: 'TokensBought',
        firstTransactionBlockNumber: 3175204,
        lastTransactionBlockNumber: 3187613,
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const ethCap = await toPromise(icoContract.ETHER_CAP)();
          // const preEthCap = await toPromise(icoContract.BTCS_ETHER_CAP)();
          return `${convertWeb3Value(web3, ethCap, 'ether')} ETH`;
        },
        startDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.startTime)();
          return convertWeb3Value(web3, timestamp, 'timestamp').formatDate();
        },
        endDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.endTime)();
          return convertWeb3Value(web3, timestamp, 'timestamp').formatDate();
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
    },
    '0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413': {
      information: {
        aliasName: 'TheDAO',
        website: 'https://daowiki.atlassian.net/wiki',
        logo: 'https://daowiki.atlassian.net/wiki/download/attachments/655365/DAO?version=2&modificationDate=1462133209864&cacheVersion=1&api=v2',
      },
      event: {
        args: {
          tokens: 'amount',
          sender: 'to',
        },
        name: 'CreatedToken',
        firstTransactionBlockNumber: 0,
        lastTransactionBlockNumber: 'latest',
      },
      icoParameters: {
        cap: async (web3, icoContract) => {
          const daoMinCap = await toPromise(icoContract.minTokensToCreate)().valueOf();
          return `Min: ${daoMinCap} DAOs Max: unbounded`;
        },
        startDate: async icoContract => 'contract creation',
        endDate: async (web3, icoContract) => {
          const timestamp = await toPromise(icoContract.closingTime)();
          return convertWeb3Value(web3, timestamp, 'timestamp').formatDate();
        },
        status: async icoContract => 'successful', // could return isFueled
      },
      matrix: {
        q1: { answer: true, comment: '' },
        q2: { answer: true, comment: '' },
        q3: { answer: true, comment: 'Source code is not exists' },
        q4: { answer: true, comment: '' },
        q5: { answer: true, comment: '' },
        q6: { answer: true, comment: '' },
        q7: { answer: null, comment: '' },
        q8: { answer: true, comment: '' },
        q9: { answer: false, comment: '' },
        q10: { answer: true, comment: '' },
        q11: { answer: true, comment: '' },
        q12: { answer: true, comment: '' },
        q13: { answer: true, comment: '' },
        q14: { answer: true, comment: '' },
      },

    },
    '0xE7775A6e9Bcf904eb39DA2b68c5efb4F9360e08C': {
      information: {
        aliasName: 'TAAS',
        logo: 'https://taas.fund/img/fav_icon.png',
        website: 'https://taas.fund/',
      },
      event: {
        name: 'Transfer',
        args: {
          tokens: 'value',
          sender: 'to',
        },
        customArgs: {
          from: '0x94917caf0cb1131345911874a2ceaf6ae2e8ee0f',
        },
        firstTransactionBlockNumber: 3427798,
        lastTransactionBlockNumber: 3648684,
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
    },
  },
    // https://neufund.net/nodes/mainnet
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
