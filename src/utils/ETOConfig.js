import { formatNumber } from '../utils';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import * as ETOContractABI  from '../assets/ETOContractABI';

class ETOParameters {
  constructor(parameters) {
    this.maxCap = parameters.maxCap;
    this.minCap = parameters.minCap;
    this.onChainState = parameters.onChainState;
    this.icoStartDate = moment(parameters.startDate, 'DD-MM-YYYY');
    this.icoEndDate = moment(parameters.startDate, 'DD-MM-YYYY').add(parameters.duration, 'days');
    this.equityTokenSymbol = parameters.equity_token_symbol;
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
  constructor(etoData) {
    this.abi = ETOContractABI;
    this.crowdSaleTokenContract = etoData.eto_id;
    this.tokenContract = etoData.equity_token_contract_address;
    this.baseCurrency = 'ETH';
    this.hide = true;
    this.address = etoData.eto_id;
    this.alternativeLoadingMsg = `EOS ICO is generating hundreds of
  thousands of events that we need to analyze. Loading
  will take more than one minute.`;

    this.information = {
      name: etoData.equity_token_symbol,
      website: `https://platform.neufund.org/eto/view/LI/${etoData.preview_code}`,
      logo: etoData.equity_token_image,
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
    this.icoParameters = new ETOParameters({
      minCap: etoData.equity_tokens_per_share * etoData.minimum_new_shares_to_issue,
      maxCap: etoData.equity_tokens_per_share * etoData.new_shares_to_issue,
      onChainState: etoData.on_chain_state,
      icoStartDate: etoData.start_date,
      duration: etoData.public_duration_days,
    });

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
    this.decimals = new BigNumber(0);
    this.addedBy = 'rudolfix';
    this.dateAdded = '03-10-2019';
  }
}

export default EtoConfig;
