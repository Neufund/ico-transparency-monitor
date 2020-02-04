import { formatNumber, toPromise } from '../utils';
import moment from 'moment';

class IcoParameters {
  constructor(parameters) {
    this.maxCap = parameters.maxCamp;
    this.minCap = parameters.minCap;
    this.onChainState = parameters.on_chain_state;
    this.icoStartDate = moment(parameters.startDate, 'DD-MM-YYYY');
    this.icoEndDate = moment(parameters.startDate, 'DD-MM-YYYY').add(parameters.public_duration_days, 'days');
  }

  cap() {
    return [`Max: ${formatNumber(this.minCap)} ${this.equity_token_symbol}`, `Min: ${formatNumber(this.maxCap)} ${this.equity_token_symbol}`];
  }

  startDate() {
    return this.icoStartDate;
  }

  endDate() {
    return this.icoEndDate;
  }

  status() {
    const commitmentState = {
      0: 'not started',
      1: 'pre-sale',
      2: 'public sale',
      3: 'in signing',
      4: 'claiming tokens',
      5: 'proceeds payout',
      6: 'eto refund',
    };
    return commitmentState[this.onChainState];
  }
}

class EtoConfig {
  constructor(etoInformation, options) {
    this.minTokenCap = 0;
    this.maxTokenCap = 0;

    this.crowdSaleTokenContract = options.crowdSaleTokenContract;
    this.tokenContract = options.tokenContract;
    this.baseCurrency = options.baseCurrency;
    this.hide = options.hide;

    this.information = {
      name: etoInformation.equity_token_symbol,
      website: `https://platform.neufund.org/eto/view/LI/${etoInformation.preview_code}`,
      logo: etoInformation.equity_token_image,
      offeringType: 'ETO',
    };
    this.events = {
      LogFundsCommitted: {
        args: {
          tokens: 'grantedAmount',
          ether: 'baseCurrencyEquivalent',
          sender: 'investor',
        },
        firstTransactionBlockNumber: 8670835,
        lastTransactionBlockNumber: 9009242,
        countTransactions: true,
      },
    };
    this.icoParameters = new IcoParameters(30000000, 60000000);

    this.matrix = {
      q1: { answer: true },
      q2: { answer: true },
      q3: { answer: true },
      q4: { answer: true },
      q5: { answer: true },
      q6: { answer: true },
      q7: {
        answer: true, comment: `committed funds are under control of
    investors stored in LockedAccount contract`
      },
      q8: {
        answer: true, comment: `stable coin pegged 1:1 to Euro is implemented
     in EuroToken contract`
      },
      q9: {
        answer: true, comment: `withdrawal and deposit happen via bank account,
     this is not trustless but unavoidable`
      },
      q10: { answer: true },
      q11: {
        answer: true, comment: `token holders are legally protected by combination
    of legal and smart contracts which give them equivalent of shareholder rights in Fifth Force GmbH`
      },
      q12: {
        answer: true,
        comment: 'reward is controlled by exponential curve'
      },
      q13: { answer: true },
      q14: {
        answer: true, comment: `ETO ends on specified date, there is no mechanism
    to stop it earlier or halt it. it should be however noted that admin may revoke
    ISSUER right to Commitment contract, there is however 0 incentive for
    platform operator to do that`
      },
    };
    this.decimals = 0;
    this.addedBy = 'rudolfix';
    this.dateAdded = '03-10-2019';
  }
}

export default EtoConfig;
