import { toPromise } from '../utils';
import { convertWeb3Value, convertBlockNumberToDate } from '../utils/web3';


export default {
  crowdSaleTokenContract:'0x123ab195dd38b1b40510d467a6a359b201af056f',
  information: {
    name: "Legolas Exchange",
    website: "https://lgo.exchange/",
    logo: 'https://lgo.exchange/img/logo.png'
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
      countTransactions: true
    },
    ...
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.tokenCreationCap)().valueOf();
      const minCap = await toPromise(icoContract.tokenCreationMin)().valueOf();
      // check the caps for LGO
      // return [`Max: ${maxCap / (10 ** 18)} GNT`, `Min: ${minCap / (10 ** 18)} GNT`];
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.fundingStartBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.fundingEndBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    // known because the ico is over, so there is no need to write a condition to determine status
    status: async () => 'successful',
  },
  matrix: {
    q1: { answer: true, comment: '' },
    q2: { answer: true, comment: '' },
    q3: { answer: false, comment: '' },
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
  }
  alternativeLoadingMsg:
  addedBy:"YOUR-NAME",
  dateAdded: 'DD-MM-YYYY',
}
