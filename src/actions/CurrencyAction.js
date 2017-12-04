import axios from 'axios';
import moment from 'moment';
import config from '../config';
import { getEtherDistribution } from '../utils';
import { generateMoneyChartDataset } from '../utils/stats';

export const setCurrencyAction = (currency, amount, time) =>
  ({ type: 'SET_CURRENCY', currency, value: amount, time });

export const setExchangeProviderInfo = provider => async (dispatch, getState) => {
  dispatch({ type: 'SET_CURRENCY_PROVIDER', provider });
};

export const getExchangeRate = async (base, to, provider, time) => {
  let result = null;
  switch (provider) {
    case 'coinbase':
      // coinbase requires UTC string
      const converted = base === 'ETH' ? to : base;
      const key = `ETH-${converted}`.toUpperCase();
      result = await axios.get(`https://api.coinbase.com/v2/prices/${key}/spot?date=${time.toISOString()}`);
      return base === 'ETH' ? result.data.data.amount : (1 / result.data.data.amount);
    case 'fixer':
      const timeFormated = moment(time).format('YYYY-MM-DD');
      result = await axios.get(`https://api.fixer.io/${timeFormated}?base=${base}`);
      return result.data.rates[to];
    default:
      throw new Error('Not supported exchange');
  }
};

export const getExchangeProviderInfo = (key) => {
  switch (key) {
    case 'ETH-EUR-SM':
      return {
        name: 'Smart Contract',
        link: 'Conversion rate exists in the smart contract.',
      };
    case 'ETH-EUR':
    case 'EUR-ETH':
    case 'ETH-USD':
    case 'USD-ETH':
      return {
        name: 'coinbase',
        link: 'https://api.coinbase.com/v2/prices',
      };
    case 'EUR-USD':
    case 'USD-EUR':
      return {
        name: 'fixer',
        link: 'https://api.fixer.io/',
      };
    case 'ETH-ETH':
    case 'USD-USD':
    case 'EUR-EUR':
      return {
        name: '',
        link: '',
      };
    default:
      throw new Error('Not supported exchange');
  }
};

export const getCurrencyConversionRate = async (currency, baseCurrency, time) => {
  if (currency === baseCurrency) return 1;

  const currencyKey = `${baseCurrency}-${currency}`.toUpperCase();
  const providerInfo = getExchangeProviderInfo(currencyKey);
  const result = await getExchangeRate(baseCurrency,
    currency,
    providerInfo.name,
    time
  );
  return result;
};

export const setStatisticsByCurrency = (currency, value, time) => async (dispatch, getState) => {
  dispatch(setCurrencyAction(currency, value, time));
  const currentStatistics = getState().scan.stats;
  const distribution = getEtherDistribution(currentStatistics.investors.sortedByETH, value);
  currentStatistics.charts.investorsDistribution = distribution[0];
  currentStatistics.charts.investmentDistribution = distribution[1];

  currentStatistics.charts.etherCount =
  generateMoneyChartDataset(currentStatistics.charts.baseCurrencyCount, value);
  console.log(currentStatistics);
  dispatch({ type: 'DRAW_STATS', stats: currentStatistics });
};

export const setConversionRate = (address, currency, time) => async (dispatch, getState) => {
  const icoConfig = config.ICOs[address];
  const baseCurrency = icoConfig.baseCurrency || 'ETH';

  const smartContractConversionRate = getState().ICO.icos[address].currencyRate;

  let conversionRate = null;
  let currencyProviderKey = `${baseCurrency}-${currency}`;

  if (smartContractConversionRate && currencyProviderKey === 'EUR-ETH') {
    conversionRate = smartContractConversionRate;
    currencyProviderKey = 'ETH-EUR-SM';
  } else {
    conversionRate = await getCurrencyConversionRate(currency, baseCurrency, time);
  }

  const providerInfo = getExchangeProviderInfo(currencyProviderKey);
  dispatch(setExchangeProviderInfo(providerInfo.link));

  return conversionRate;
};
