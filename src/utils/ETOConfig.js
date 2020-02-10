import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import { toChecksumAddress } from 'web3-utils';
import { apiUrl } from '../env.json';
import { formatNumber } from '../utils';
import GENERAL from '../constants/general';

const ETOContractABI = require('../assets/ETOContractABI');
const CrowdSaleABI = require('../assets/CrowdSaleABI');

class ETOParameters {
  constructor(parameters) {
    this.maxCap = parameters.maxCap;
    this.minCap = parameters.minCap;
    this.onChainState = parameters.onChainState;
    this.icoStartDate = moment(parameters.startDate, GENERAL.FORMATS.DATE_FORMAT);
    this.icoEndDate = moment(parameters.startDate, GENERAL.FORMATS.DATE_FORMAT).add(parameters.duration, 'days');
    this.equityTokenSymbol = parameters.equityTokenSymbol;
  }

  async cap() {
    return [`Max: ${formatNumber(this.maxCap)} ${this.equityTokenSymbol}`, `Min: ${formatNumber(this.minCap)} ${this.equityTokenSymbol}`];
  }

  async startDate() {
    return this.icoStartDate;
  }

  async endDate() {
    return this.icoEndDate;
  }

  async status() {
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
    this.crowdSaleABI = CrowdSaleABI;
    this.crowdSaleTokenContract = toChecksumAddress(etoData.eto_id);
    this.tokenContract = toChecksumAddress(etoData.equity_token_contract_address);
    this.baseCurrency = 'EUR';
    this.hide = true;
    this.address = toChecksumAddress(etoData.eto_id);
    this.alternativeLoadingMsg = `EOS ICO is generating hundreds of
  thousands of events that we need to analyze. Loading
  will take more than one minute.`;

    this.information = {
      name: etoData.equity_token_symbol,
      website: `${apiUrl}eto/view/LI/${etoData.preview_code}`,
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
      equityTokenSymbol: etoData.equity_token_symbol,
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
    investors stored in LockedAccount contract`,
      },
      q8: {
        answer: true, comment: `stable coin pegged 1:1 to Euro is implemented
     in EuroToken contract`,
      },
      q9: {
        answer: true, comment: `withdrawal and deposit happen via bank account,
     this is not trustless but unavoidable`,
      },
      q10: { answer: true },
      q11: {
        answer: true, comment: `token holders are legally protected by combination
    of legal and smart contracts which give them equivalent of shareholder rights in Fifth Force GmbH`,
      },
      q12: {
        answer: true,
        comment: 'reward is controlled by exponential curve',
      },
      q13: { answer: true },
      q14: {
        answer: true, comment: `ETO ends on specified date, there is no mechanism
    to stop it earlier or halt it. it should be however noted that admin may revoke
    ISSUER right to Commitment contract, there is however 0 incentive for
    platform operator to do that`,
      },
    };
    this.decimals = new BigNumber(0);
    this.addedBy = 'platform';
  }
}

export default EtoConfig;
