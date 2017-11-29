import { toPromise, formatNumber } from '../utils';
import { convertBlockNumberToDate } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x568251d813e4c639cea5fd637bc59790dd4d5958',
  tokenContract: '0x6ec8a24cabdc339a06a172f8223ea557055adaa5',
  information: {
    name: 'Genaro',
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
      const hardCap = await toPromise(icoContract.hardCap)().valueOf();
      return [`Hard Cap: ${formatNumber(hardCap / (10 ** 18))} ETH`];
    },
    startDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.initialBlock)();
      return (await convertBlockNumberToDate(web3, blockNumber)).formatDate();
    },
    endDate: async (web3, icoContract) => {
      const blockNumber = await toPromise(icoContract.finalBlock)();
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
    q2: { answer: false, comment: `Source code of GenaroTokenSale in github https://github.com/GenaroSanada/Genaro does not correspond to deployed bytecode, as confirmed by Genaro.
    All analytics below are based on unverified source code which has similar/identical ABI to deployed code.` },
    q3: { answer: false },
    q4: { answer: false },
    q5: { answer: true },
    q6: { answer: true, comment: `Some tokens are pre-allocated due to presale, however it does not decrease the tokens for sale, no more allocations are accepted afterwards.` },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true, comment: `This is a nice trustless contract, the problem is that bytecode does not verify...` },
    q12: { answer: true },
    q13: { answer: true, comment: 'Sale may be ended earlier by emergencyStop, but no later than end date. There is no incentive for Genaro to do it so we do not fail this question' },
    q14: { answer: true },
  },
  addedBy: 'Mostafa Balata',
  dateAdded: '27-11-2017',
};
