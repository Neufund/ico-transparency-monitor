import { getEtherRate ,getDistributedDataFromDataset } from '../utils';

export const setCurrencyAction = (currency , amount , time) => {
  return { type: 'SET_CURRENCY', currency:currency , value: amount , time : time  };
};

export const setCurrency = (currency, time, callback) => {
  let currencyFormat = `ETH-${currency}`;

  if (currency === 'ETH')
    return callback(null, {currency:currency, value: 1 , time: time});


  const result = getEtherRate(currencyFormat, time);
  result.then((e) => {
    if (callback) callback(null , { currency:currency, value: e.data.data.amount, time:time } );
  }).catch((error) => {
    if (callback) callback(error);
  });
};


export const setStatisticsByCurrency = (currency, value, time) => async (dispatch , getState ) => {
  dispatch(setCurrencyAction(currency, value, time ));
  const currentStatistics = getState().scan.stats;
  const distribution = getDistributedDataFromDataset(currentStatistics.etherDataset, value);
  currentStatistics.charts.investorsDistribution = distribution[0];
  currentStatistics.charts.investmentDistribution = distribution[1];
  dispatch({ type: 'DRAW_STATS', stats: currentStatistics });
};
