import { getEtherRate } from '../utils';

export const setCurrencyAction = (currency , amount , time) => {
  return { type: 'SET_CURRENCY', currency:currency , value: amount , time : time  };
};

export const setCurrency = (currency, time, callback) => {
  let currencyFormat = `ETH-${currency}`;

  if (currency === 'ETH') {
    return {
      type: 'SET_CURRENCY',
      currency,
      value: 1,
      time,
    };
  }

  const result = getEtherRate(currencyFormat, time);
  result.then((e) => {
    if (callback) callback(null , { currency:currency, value: e.data.data.amount, time:time } );
  }).catch((error) => {
    if (callback) callback(error);
  });
};
