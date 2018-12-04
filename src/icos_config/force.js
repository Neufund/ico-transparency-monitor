import { BigNumber } from 'bignumber.js';
import { toPromise, formatNumber } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x01A1f17808edAE0B004A4F11a03620D3d804b997',
  tokenContract: '0x164e07ae48ca7774663e90732d44b324f2e3c679',
  baseCurrency: 'EUR',
  information: {
    name: 'FORCE',
    website: 'https://platform.neufund.org/eto/view/efbfc858-0f29-4351-8d07-850b1e0461b8',
    logo: 'https://documents.neufund.org/0x304206eb582705Ea82195B7D12A21A8d98F212f7/c8c4ee72-ca7b-4504-b0f2-93dead0bb3bf.png',
  },
  events: {
    LogFundsCommitted: {
      args: {
        tokens: 'grantedAmount',
        ether: 'baseCurrencyEquivalent',
        sender: 'investor',
      },
      firstTransactionBlockNumber: 	6781631,
      lastTransactionBlockNumber: null,
      countTransactions: true,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract, tokenContract) => {
      // we should take it from token terms, but that would need importing several ABIs
      // which is not suppored now
      // https://etherscan.io/address/0xd7e433a4c11e57fb03795c815ee758534ed5232e#readContract
      return [`Max: ${formatNumber(46000000)} FTH`, `${formatNumber(10000000)} FTH`];
    },
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
      const state = await toPromise(icoContract.timedState);
      return commitmentState[parseInt(state)];
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
    q14: { answer: true, comment: `ICO ends on specified date, there is no mechanism
    to stop it earlier or halt it. it should be however noted that admin may revoke
    ISSUER right to Commitment contract, there is however 0 incentive for
    platform operator to do that` },
  },
  decimals: 1,
  addedBy: 'rudolfix',
  dateAdded: '04-12-2018',
};
