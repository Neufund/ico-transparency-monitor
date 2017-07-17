import {getEtherPerCurrency, toPromise} from '../utils';

export const setCurrency = (currency, time = new Date().yyyymmdd() , dispatch) =>  {
    let currencyFormat = `ETH-${currency}`;
    if (time === "NOW")
        time = new Date().yyyymmdd();

    if (currency === "ETH")
        return dispatch({
            type: 'SET_CURRENCY',
            currency: currency,
            value: 1,
            time: time
        });
    else if (currency === "BTC")
        currencyFormat = `BTC-EUR`;

    let result = getEtherPerCurrency(currencyFormat, time);
    result.then((e) => {
        dispatch({type: 'SET_CURRENCY', currency: currency, value: e.data.data.amount, time: time})
    }).catch((error) => {
            dispatch({type: 'SET_CURRENCY_ERROR', message: error})
        });

};


export const setCurrency3 = (currency, time = new Date().yyyymmdd(), callback) => async (dispatch) => {
    let currencyFromat = `ETH-${currency}`;
    if (time === "NOW")
        time = new Date().yyyymmdd();


    if (currency === "ETH") {
        dispatch({
            type: 'SET_CURRENCY',
            currency: currency,
            value: 1,
            time: time
        });
        dispatch({type: 'HIDE_LOADER'});
        callback();
        return;
    } else if (currency === "BTC") {
        currencyFromat = `BTC-EUR`;
    }

    dispatch({type: 'SHOW_LOADER'});

    let result = getEtherPerCurrency(currencyFromat, time);
    result.then((result) => {
        dispatch({
            type: 'SET_CURRENCY',
            currency: currency,
            value: result.data.data.amount,
            time: time
        });
        callback();
        dispatch({type: 'HIDE_LOADER'});
    }).catch((error) => {
        dispatch({type: 'SET_CURRENCY_ERROR', message: error});
    })

};

