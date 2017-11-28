import { toPromise } from '../utils';
import { convertWeb3Value } from '../utils/web3';

export default {
  crowdSaleTokenContract: '0xd4FD252d7D2C9479a8d616F510eAC6243B5DDdf9',
  tokenContract: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
  information: {
    name: '0x Protocol',
    website: 'https://0xproject.com/',
    logo: 'https://0xproject.com/images/favicon/favicon-2-32x32.png',
  },
  events: {
    // unfortunately LogFill does not allow us to connect ETH with particular investor. taker is ICO contract
    // no information on tx.origin
    /* LogFill: {
      // https://etherscan.io/tx/0x4d3f6c254599ea6ff5a90f25ef89fc4c665a3b9b9584da07cafc2c1b22af18d6 - initialize sale
      args: {
        ether: 'filledTakerTokenAmount',
        sender: 'taker',
      },
      customArgs: {
        // orderHash: '0x1cbf70d8f6dfee99ee740f4e0e90a97e8e1f0c38a14b8604adadbe28469c0ffa'
        maker: '0x7f33036d984f67a864c7f413012c31329d4193a2',
        taker: '0xd4fd252d7d2c9479a8d616f510eac6243b5dddf9'
      },
      firstTransactionBlockNumber: 4161301,
      lastTransactionBlockNumber: 4165451,
      countTransactions: false,
      address: '0x12459C951127e0c374FF9105DdA097662A027093'
    }, */
    Transfer: {
      args: {
        tokens: '_value',
        sender: '_to',
        // ZXR price taken directly from caps: getOrderMakerTokenAmount / getOrderTakerTokenAmount
        // our other choice was to not provide any ETH information as ICO smart contract is not auditable
        ether: tokens => tokens / 5906.8750000012323217968752570931,
      },
      customArgs: {
        _from: '0xd4FD252d7D2C9479a8d616F510eAC6243B5DDdf9',
      },
      firstTransactionBlockNumber: 4161301,
      lastTransactionBlockNumber: 4165451,
      countTransactions: true,
      address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498',
    },
  },
  icoParameters: {
    cap: async (web3, icoContract) => {
      const maxCapZrx = await toPromise(icoContract.getOrderMakerTokenAmount)().valueOf();
      const maxCapEth = await toPromise(icoContract.getOrderTakerTokenAmount)().valueOf();
      return `${maxCapZrx / (10 ** 18)} ZRX or ${convertWeb3Value(maxCapEth, 'ether')} ETH`;
    },
    startDate: async (web3, icoContract) => {
      const timestamp = await toPromise(icoContract.startTimeInSec)();
      return convertWeb3Value(timestamp, 'timestamp').formatDate();
    },
    endDate: async () => 'until ZRX cap reached',
    status: async () => 'successful',
  },
  matrix: {
    q1: { answer: true },
    q2: { answer: true },
    q3: { answer: true },
    q4: { answer: true },
    q5: {
      answer: true, comment: `Crowdsale contract provides no tracking data. Actual value of ZXR amount  per ETH amount for given investor is never logged. 
      Thanks to fixed ZXR to ETH peg it can be easily inferred which we do here.` },
    q6: { answer: true },
    q7: { answer: true },
    q8: { answer: null },
    q9: { answer: null },
    q10: { answer: true },
    q11: {
      answer: true, comment: `Crowdsale happens via 0x Exchange. The maker of the order is a simple address so order could be cancelled any time. 
      Otherwise ZRX is ERC20 token and its usage is laid out in Exchange contract. This goes beyond typical ICO which does not showcase future product.` },
    q12: { answer: true },
    q13: { answer: true },
    q14: {
      answer: true, comment: `There is elaborate structure that lets all registered users to participate easily before ICO is finished. 
      There is also a flaw: See Q11. Maker can cancel the order any time thus effectively ending ICO. As there is no incentive for the maker to do so and 
      otherwise smart contracts are nicely trustless we decided not to fail this project here.` },
  },
  decimals: 18,
  addedBy: 'Rudolfix',
  dateAdded: '05-09-2017',
};
