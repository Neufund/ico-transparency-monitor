import { getEtherPerCurrency, toPromise } from '../utils';

export const setCurrency = (currency, time = new Date().yyyymmdd(), dispatch, callback) => {
  let currencyFormat = `ETH-${currency}`;
  if (time === 'NOW') { time = new Date().yyyymmdd(); }

  if (currency === 'ETH') {
    return dispatch({
      type: 'SET_CURRENCY',
      currency,
      value: 1,
      time,
    });

    // TODO: needs to be correct value
  } else if (currency === 'BTC') { currencyFormat = 'BTC-EUR'; }

  const result = getEtherPerCurrency(currencyFormat, time);
  result.then((e) => {
    dispatch({ type: 'SET_CURRENCY', currency, value: e.data.data.amount, time });
    if (callback) callback();
  }).catch((error) => {
    dispatch({ type: 'SET_CURRENCY_ERROR', message: error });
  });
};
