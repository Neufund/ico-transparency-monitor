import {initStatistics} from '../utils'

const scan = (state = { stats:initStatistics() , currency :null , currencyValue:0}, action) => {
    // console.log(`Scan Action ${action.type} , state`,state);
    switch (action.type) {
        case 'DRAW_STATS':
            return {
                ...state ,
                stats : {...action.stats}
            };
        case 'SET_CURRENCY':
            return {...state , currency : action.currency , currencyValue:action.currencyValue};
        default:
            return state
    }
};

export default scan