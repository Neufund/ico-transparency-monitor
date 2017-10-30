import {initStatistics} from '../utils';

const scan = (state = {
  stats: initStatistics(),
  currency: null,
  currencyValue: 0,
  showLoader: false,
  showStats: false,
  isSmartContractLoaded: false,
  hasNoTransactions: false
}, action) => {
  switch (action.type) {
    case 'DRAW_STATS':
      return {
        ...state,
        stats: {...action.stats},
      };
    case 'CSV_FILE':
      return {
        ...state,
        csvContent: action.csvContent,
      };
    case 'SET_CURRENCY':
      return {...state, currency: action.currency, currencyValue: action.currencyValue};
    case 'SHOW_LOADER':
      return {...state, showLoader: true};
    case 'HIDE_LOADER':
      return {...state, showLoader: false};
    case 'SHOW_STATS':
      return {...state, showStats: true};
    case 'SHOW_ICO_NOT_STARTED':
      return {...state, hasNoTransactions: true};
    case 'IS_SMART_CONTRACT_LOADED':
      return {...state, isSmartContractLoaded: action.value};
    default:
      return state;
  }
};

export default scan;
