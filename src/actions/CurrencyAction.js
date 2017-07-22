import { getEtherRate, getEtherDistribution } from '../utils';

export const setCurrencyAction = (currency, amount, time) => ({ type: 'SET_CURRENCY', currency, value: amount, time });

export const setCurrency = (currency, time, callback) => {
  const currencyFormat = `ETH-${currency}`;

  if (currency === 'ETH') { return callback(null, { currency, value: 1, time }); }


  const result = getEtherRate(currencyFormat, time);
  result.then((e) => {
    if (callback) callback(null, { currency, value: e.data.data.amount, time });
  }).catch((error) => {
    if (callback) callback(error);
  });
};


export const setStatisticsByCurrency = (currency, value, time) => async (dispatch, getState) => {
  dispatch(setCurrencyAction(currency, value, time));
  const currentStatistics = getState().scan.stats;
  const distribution = getEtherDistribution(currentStatistics.investors.sortedByETH, value);
  currentStatistics.charts.investorsDistribution = distribution[0];
  currentStatistics.charts.investmentDistribution = distribution[1];
  dispatch({ type: 'DRAW_STATS', stats: currentStatistics });
};
