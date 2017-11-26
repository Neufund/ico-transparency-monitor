import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

/*
  please note that GLA has another fundraiser with identical code where they've got 3500 ETH
  you can swith with mods below
  crowdSaleTokenContract: '0x57BFfFD48366F78e787e167419C8c05CDb849EdE',
  tokenContract: '0x4632d1c31c5D9E28E84eAE0173B3aFc9acA81aC8',
  _from: '0x4632d1c31c5D9E28E84eAE0173B3aFc9acA81aC8',
  address: '0x4632d1c31c5D9E28E84eAE0173B3aFc9acA81aC8'
*/

export default {
  crowdSaleTokenContract: '0xaaf4281fd8142dC3263b3303b0a6F62d00B2D07E',
  tokenContract: '0x71d01db8d6a2fbea7f8d434599c237980c234e4c',
  information: {
    aliasName: 'Gladius',
    website: 'https://gladius.io/',
    logo: 'https://gladius.io/favicon/android-icon-192x192.png',
  },
  events: {
    Transfer: {
      args: {
        tokens: '_value',
        sender: '_to',
      },
      customArgs: {
        _from: '0x71d01db8d6a2fbea7f8d434599c237980c234e4c'
      },
      firstTransactionBlockNumber: 4365348,
      lastTransactionBlockNumber: null,
      maxBlocksInChunk: 52960,
      countTransactions: true,
      address: '0x71d01db8d6a2fbea7f8d434599c237980c234e4c'
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.maxAmount)().valueOf();
      const minCap = await toPromise(icoContract.minAmount)().valueOf();
      return [`Max: ${maxCap / (10 ** 18)} ETH`, `Min: ${minCap / (10 ** 18)} ETH`];
    },
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.start)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.crowdsaleEnd)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const begTs = await toPromise(icoContract.start)();
      const presaleEndTs = await toPromise(icoContract.presaleEnd)();
      if (now < begTs) {
        return 'not started';
      } else if (now >= begTs && now <= presaleEndTs) {
        return 'in pre-sale';
      }
      const stage = await toPromise(icoContract.stage)();
      if (stage === 3) {
        return 'successful';
      }
      const endTs = await toPromise(icoContract.crowdsaleEnd)();
      if (now > presaleEndTs && now <= endTs) {
       return 'in crowdsale';
      }
      return "failed (min cap)";
    },
  },
  matrix: {
    q1: { answer: true, comment: `Please note that there was another Gladius fundraiser at address 0x57BFfFD48366F78e787e167419C8c05CDb849EdE 
    and another GL token at 0x4632d1c31c5D9E28E84eAE0173B3aFc9acA81aC8 where around 3500 ETH was raised.` },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true, comment: `Could be better! Crowdsale contract could provide all the info. Instead we must use Transfer event from token.
    It can cause small problem if ETH is sent above maxAmount and part is returned.` },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: { answer: true, comment: `Please note 1. refund does not apply to pre-sale. 2. there are pre-allocated tokens. However overall contract is nicely trustless.` },
    q12: { answer: true },
    q13: { answer: true },
    q14: { answer: true },
  },
  decimals: 18,
  addedBy: 'Marcin Rudolf',
  dateAdded: '26-11-2017',
};
