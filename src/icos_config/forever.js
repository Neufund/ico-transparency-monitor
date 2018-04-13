import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xfb072e58741738fc26e86d2c49db3179ea8d5d55',
  tokenContract: '0xfdb1d263112b0a668dce5748d961b4851cfca8ee',
  baseCurrency: 'ETH',
  information: {
    name: 'Forever Has Fallen',
    website: 'https://foreverhasfallen.com/',
    logo: 'https://foreverhasfallen.com/logo/fhf-icon-only.png',
  },
  events: {
    TokenSale: {
      args: {
        tokens: 'tokenAmount',
        ether: 'etherAmount',
        sender: 'tokenReceiver',
      },
      firstTransactionBlockNumber: 5287891,
      lastTransactionBlockNumber: null, // follow last block
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const cap = await toPromise(icoContract.saleGoal)();
      return [`${formatNumber(cap)} FC`];
    },
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.generalSaleStartDate)();
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.generalSaleEndDate)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const isActive = await toPromise(icoContract.isICOActive)();
      if (isActive) {
        return 'in progress';
      }
      const goalReached = await toPromise(icoContract.goalReached)();
      if (goalReached) {
        return 'successful';
      }
      const now = Math.floor(new Date().getTime() / 1000);
      const startDateICO = await toPromise(icoContract.generalSaleStartDate)();
      if (now < startDateICO) {
        return 'not started';
      }
      return 'failed';
    },
  },
  matrix: {
    q1: { answer: true, comment: 'Yes, the contract name is FHFTokenCrowdsale' },
    q2: { answer: true, comment: 'Source code is available' },
    q3: { answer: true, comment: '' },
    q4: { answer: true, comment: '' },
    q5: { answer: true, comment: '' },
    q6: { answer: true, comment: 'Token rate is provided via TokenSale Event as custom argument: tokensPerEther' },
    q7: { answer: true, comment: 'ETH is sent to smart contract and cannot be withdrawn by owner until the ICO ends (either by reaching maximum cap or by reaching ICO close date)' },
    q8: { answer: true, comment: 'n/a: Forever is only using ETH' },
    q9: { answer: true, comment: 'n/a: Forever is only using ETH' },
    q10: { answer: true, comment: '' },
    q11: { answer: true, comment: '' },
    q12: { answer: true, comment: 'Both price and bonus are controlled by smart contract, see processPayment function in source code.' },
    q13: { answer: true, comment: '' },
    q14: { answer: true, comment: '' },
  },
  decimals: 18,
  addedBy: 'vpredtechenskaya',
  dateAdded: '21-03-2018',
};
