import { BigNumber } from 'bignumber.js';
import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x5d26239257e6433889F00bB46294C552B4D75EC9',
  tokenContract: '0x0675DAa94725A528b05A3A88635C03EA964BFA7E',
  baseCurrency: 'ETH',
  information: {
    name: 'Taklimakan',
    website: 'https://taklimakan.io/',
    logo: 'https://taklimakan.io/static/img/general/logo.png',
  },
  events: {
    TokenSale: {
      args: {
        tokens: 'tokenAmount',
        ether: 'etherAmount',
        sender: 'tokenReceiver',
      },
      customArgs: {
        tokenPrice: 'tokensPerEther', // Information on token price
      },
      firstTransactionBlockNumber: 4695700,
      lastTransactionBlockNumber: null, // follow last block
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract, tokenContract) => {
      const tklnCap = await toPromise(icoContract.saleGoal)();
      return [`${formatNumber(tklnCap)} TKLN`];
    },
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.saleStartTimestamp)();
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.saleStopTimestamp)();
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const startDateICO = await toPromise(icoContract.saleStartTimestamp)();
      const endDateICO = await toPromise(icoContract.saleStopTimestamp)();
      const goalReached = await toPromise(icoContract.goalReached)();
      if (now < startDateICO) {
        return 'not started';
      } else if (now >= startDateICO && now < endDateICO) {
        if (goalReached) {
          return 'successful';
        }
        return 'in progress';
      }
      if (goalReached) {
        return 'successful';
      }
      return 'failed';
    },
  },
  matrix: {
    q1: { answer: true, comment: 'Yes, the contract name is TaklimakanCrowdsale' },
    q2: { answer: true, comment: 'Source code is available' },
    q3: { answer: true, comment: '' },
    q4: { answer: true, comment: '' },
    q5: { answer: true, comment: '' },
    q6: { answer: true, comment: 'Token rate is provided via TokenSale Event as custom argument: tokensPerEther' },
    q7: { answer: true, comment: 'ETH is sent to smart contract and cannot be withdrawn by owner until the ICO ends (either by reaching maximum cap or by reaching ICO close date)' },
    q8: { answer: true, comment: 'n/a: Taklimakan is only using ETH' },
    q9: { answer: true, comment: 'n/a: Taklimakan is only using ETH' },
    q10: { answer: true, comment: '' },
    q11: { answer: true, comment: '' },
    q12: { answer: true, comment: 'Both price and bonus are controlled by smart contract, see processPayment function in source code.' },
    q13: { answer: true, comment: 'Check in the source code how processPayment function uses SaleStartTimestamp variable that stores ICO start date. SaleStartTimestamp cannot change after contract is deployed.' },
    q14: { answer: true, comment: 'Check in the source code how processPayment function uses SaleStopTimestamp variable that stores ICO end date. SaleStopTimestamp cannot change after contract is deployed. Also, general sale ends when the maximum cap is reached, which is also controlled by this smart contract.' },
  },
  decimals: 18,
  addedBy: 'gzaytsev',
  dateAdded: '12-12-2017',
};
