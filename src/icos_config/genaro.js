import { toPromise, formatNumber } from '../utils';
import { convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x568251d813e4c639cea5fd637bc59790dd4d5958',
  tokenContract: '0x6ec8a24cabdc339a06a172f8223ea557055adaa5',
  information: {
    aliasName: 'Genaro',
    website: 'https://genaro.network',
    logo: 'https://static.genaro.network/images/favicon.ico',
  },
  events: {
    NewBuyer: {
      args: {
        tokens: 'gnrAmount',
        ether: 'etherAmount',
        sender: 'holder',
      },
      firstTransactionBlockNumber: 4569928,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      console.log(icoContract);
      const hardCap = await toPromise(icoContract.hardCap)().valueOf();
      return [`Hard Cap: ${formatNumber(hardCap / (10 ** 18))} ETH`];
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.initialBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.finalBlock)();
      console.log(blockNumber.valueOf());
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    status: async (web3, icoContract) => {
      const saleStopped = await toPromise(icoContract.saleStopped)().valueOf();
      const saleFinalized = await toPromise(icoContract.saleFinalized)().valueOf();
      let status = null;
      if(saleFinalized) {
        status = "Successful"
      } else if (!saleStopped) {
        status = "In process"
      } else {
        status = "Stopped"
      }
      return status;
    }
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: false ,comment: 'Source code on etherscan is an old version.' },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true },
    q12: { answer: true },
    q13: { answer: true ,comment: 'ICO starts when activateSale function is called by someone.' },
    q14: { answer: true },
  },
  addedBy: 'Mostafa Balata',
  dateAdded: '27-11-2017',
};
