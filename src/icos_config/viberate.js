import { toPromise } from '../utils';
import { convertWeb3Value, convertBlockNumberToDate } from '../utils/web3';

export default {
  tokenContract: '0x2c974b2d0ba1716e644c1fc59982a89ddd2ff724',
  information: {
    aliasName: 'Viberate',
    website: 'https://www.viberate.com/',
    logo: 'https://viberateassets.azureedge.net/favicon.ico',
  },
  events: {
    Mint: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      firstTransactionBlockNumber: 4240691,
      lastTransactionBlockNumber: 4240950,
      countTransactions: true,
      address: '0x2c974b2d0ba1716e644c1fc59982a89ddd2ff724'
    }
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.maxCap)().valueOf();
      const minCap = await toPromise(icoContract.minCap)().valueOf();
      return [`Max ${convertWeb3Value(maxCap, 'ether').toFixed(2)} ETH`, `Min ${convertWeb3Value(minCap, 'ether').toFixed(2)} ETH`];
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.crowdsaleStartBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      /**
       * The ICO using `4348935` block number as end date for the crowd sale,
       * and this number still is not reached yet, so it will raise an exception that there's
       * no timestamp for this block number
       */
      const blockNumber = await toPromise(icoContract.crowdsaleEndedBlock)();
      try {
        return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
      } catch (e) {
        const blockNumberValue = blockNumber.valueOf();
        return `${blockNumberValue} block no.`;
      }
    },
    status: async icoContract => 'successful',
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: false, comment: 'Crowdsale contract provides no log event, we had to use Mint event from token contract.' },
    q6: { answer: false, comment: 'Most of the tokens were generated via pushAngelInvestmentData and we do not see if depositAngelInvestmentEth was ever used to send matching amount.' },
    q7: { answer: false, comment: 'Owner of the contract can generate any number of tokens without sending ETH via pushAngelInvestmentData function' },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: false, comment: 'Code looks dirty, public methods are not marked as public. Logically it is not hard to read.' },
    q11: { answer: true, comment: 'Escrow and claim tokens are properly implemented.' },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
};
