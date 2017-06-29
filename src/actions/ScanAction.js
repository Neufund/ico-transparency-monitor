import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const drawStatistics = (statistics) => {
    return { type: 'DRAW_STATS', stats : statistics }
};

export const setCurrency = (currency, value) => {
    return {type:'SET_CURRENCY' , currency:currency , currencyValue:value}
};
export const showLoader = () => {
    return showLoading();
};
export const hideLoader = () => {
    return hideLoading()
};
