import { rpcHost } from './env.json';
import { getICOsAsDict } from './icos_config';
// const icos = process.env.NODE_ENV === 'test' ? require('./config.test').default.ICOs : require('./icos_config').getICOsAsDict;
const icos = getICOsAsDict();
const config = {
  ICOs: icos,
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
      question: 'Does smart contract handle other currencies in a trustless way? Does some smart contract store balance of those currencies?',
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

export default config;
