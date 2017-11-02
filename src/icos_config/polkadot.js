import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0x54a2d42a40F51259DedD1978F6c118a0f0Eff078',
  baseCurrency: 'ETH',
  tokenContract: '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
  information: {
    aliasName: 'DOT',
    website: 'https://polkadot.io/',
    logo: 'https://polkadot.io/apple-touch-icon.png',
  },
  events: {
    Buyin: {
      args: {
        ether: 'received',
        sender: 'who',
      },
      firstTransactionBlockNumber: 4357050, // 4357229
      lastTransactionBlockNumber: null, // follow last block
      // scan in 3 const eventArgs = selectedICO.event.args;days blocks, last one is open
      maxBlocksInChunk: 12960,
      countTransactions: true,
    },
    Finalised: {
      args: {
        tokens: 'tokens',
        sender: 'who',
      },
      firstTransactionBlockNumber: 4357050,
      lastTransactionBlockNumber: null, // follow last block
      // scan in 3 const eventArgs = selectedICO.event.args;days blocks, last one is open
      maxBlocksInChunk: 12960,
      countTransactions: false,
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCap = await toPromise(icoContract.tokenCap)().valueOf();
      return [`Max: ${maxCap / (10 ** 3)} DOT`, 'None'];
    },
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.beginTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.endTime)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    status: async (web3, icoContract) => {
      const now = Math.floor(new Date().getTime() / 1000);
      const begTs = await toPromise(icoContract.beginTime)();
      const endTs = await toPromise(icoContract.endTime)();
      if (now < begTs) {
        return 'not started';
      } else if (now >= begTs && now <= endTs) {
        return 'in progress';
      }
      // no refund, no min cap
      return 'successful';
    },
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: { answer: true },
    q6: { answer: true, comment: `Admin may manipulate token 
    price via 'inject' function, this however may happen 
    only before auction starts.` },
    q7: { answer: false, comment: `Admin may pretend that Ether was
     sent via 'inject' function, also tokens can be claimed for 
     such non-existing Ether.` },
    q8: { answer: true, comment: 'Internal calculations happen in USD' },
    q9: { answer: false, comment: `USD were collected off-chain and for 
    those contributions 'inject' function is used to allow such 
    investor to claim tokens. Actual number of Ether is 
    calculated via fixed USD to Ether rate for the duration
     of ICO ('USDWEI'). No token represents value contributed this way` },
    q10: { answer: true },
    q11: { answer: false, comment: `There are several problem 
    with the contract: 1. admin may call 'halt' function after 
    auction ends preventing investors to claim tokens, it is hard 
    to explain why 'finalise' may be halted. 2. project may take funds 
    from the multisig wallet before tokens may be claimed, there 
    should be ESCROW or no halt function 3. in case of halt, 
    there is no refund procedure 4. please note that tokens 
    received in this ICO are non transferable and transfer may 
    be enabled _per address_ by token admin. That's in itself 
    an issue with trustless trust` },
    q12: { answer: true, comment: 'However see q6' },
    q13: { answer: true },
    q14: { answer: true, comment: `Admin may use 'halt' function to 
    stop ICO at any stage and just wait for end date, however there 
    is 0 incentive to do that (less money for project)` },
  },
  decimals: 18,
  addedBy: 'Rudolfix',
  dateAdded: '13-10-2017',
};

