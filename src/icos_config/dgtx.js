import { toPromise, kFormatter } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x1c83501478f1320977047008496dacbd60bb15ef',
  information: {
    name: 'DGTX',
    website: 'https://digitexfutures.com',
    logo: 'https://digitexfutures.com/wp-content/uploads/2017/11/cropped-favicon-digitex.png',
  },
  events: {
    Transfer: {
      args: {
        tokens: 'value',
        sender: 'to',
      },
      firstTransactionBlockNumber: 4912400,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const softcapInTokens = await toPromise(icoContract.softcapInTokens)().valueOf();
      const hardcapInTokens = await toPromise(icoContract.hardcapInTokens)().valueOf();
      return [`Soft: ${kFormatter(convertWeb3Value(softcapInTokens, 'ether'))} DGTX`,
        `Hard: ${kFormatter(convertWeb3Value(hardcapInTokens, 'ether'))} DGTX`];
    },
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.ICOstarttime)();
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.ICOendtime)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const isICOactive = await toPromise(icoContract.ICOactive)();
      return isICOactive ? 'In progress' : 'Successful';
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: true },
    q9: { answer: true },
    q10: { answer: true, comment: `Trustless refund of 96% of funds is implemented
     if goal not reached` },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true, comment: `Due to min ticket size, ICO cannot reach the 
    exact hard cap. It will wait till end date for finalization` },
  },
  decimals: 18,
  addedBy: 'Mostafa Balata',
  dateAdded: '15-01-2018',
};
