import { BigNumber } from 'bignumber.js';
import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x73E44092B5A886a37bea74bFc90911D0c98F6A15',
  tokenContract: '0x535bfaeb50580f674bd2e076d6073adf28a46fa8',
  baseCurrency: 'EUR',
  information: {
    name: 'GRP',
    website: 'https://platform.neufund.org/eto/view/LI/1eb004fd-c44d-4bed-9e76-0e0858649587',
    logo: 'https://documents.neufund.org/0xB8a93FDC69Df45c59302FE867877786A5e05bE05/106967f6-d673-452c-9e92-6b5a844e9a5b.png',
    offeringType: 'ETO',
  },
  events: {
    LogFundsCommitted: {
      args: {
        tokens: 'grantedAmount',
        ether: 'baseCurrencyEquivalent',
        sender: 'investor',
      },
      firstTransactionBlockNumber: 8670835,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract, tokenContract) =>
      // we should take it from token terms, but that would need importing several ABIs
      // which is not suppored now
      [`Max: ${formatNumber(30000000)} GRP`, `Min: ${formatNumber(6000000)} GRP`],
    startDate: async (web3, icoContract) => {
      const startDate = await toPromise(icoContract.startOf)(1);
      return convertWeb3Value(startDate.valueOf(), 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const endDate = await toPromise(icoContract.startOf)(3);
      return convertWeb3Value(endDate.valueOf(), 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const commitmentState = {
        0: 'not started',
        1: 'pre-sale',
        2: 'public sale',
        3: 'in signing',
        4: 'claiming tokens',
        5: 'proceeds payout',
        6: 'eto refund',
      };
      const state = await toPromise(icoContract.timedState)();
      return commitmentState[state.valueOf()];
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true },
    q7: { answer: true, comment: `committed funds are under control of
    investors stored in LockedAccount contract` },
    q8: { answer: true, comment: `stable coin pegged 1:1 to Euro is implemented
     in EuroToken contract` },
    q9: { answer: true, comment: `withdrawal and deposit happen via bank account,
     this is not trustless but unavoidable` },
    q10: { answer: true },
    q11: { answer: true, comment: `token holders are legally protected by combination
    of legal and smart contracts which give them equivalent of shareholder rights in Fifth Force GmbH` },
    q12: { answer: true, comment: 'reward is controlled by exponential curve' },
    q13: { answer: true },
    q14: { answer: true, comment: `ETO ends on specified date, there is no mechanism
    to stop it earlier or halt it. it should be however noted that admin may revoke
    ISSUER right to Commitment contract, there is however 0 incentive for
    platform operator to do that` },
  },
  decimals: 0,
  addedBy: 'rudolfix',
  dateAdded: '03-10-2019',
};
