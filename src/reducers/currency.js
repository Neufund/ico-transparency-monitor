export const currency = (state = {currency : "EUR" ,value:null , time: new Date().yyyymmdd()}, action) => {
    switch (action.type){

        case 'SET_CURRENCY':

            return {...state ,
                currency:action.currency,
                value:action.value,
                time:action.time
            };

        case 'SET_CURRENCY_ERROR':
            return {...state , currency:state.currency , value:state.value};

        default:
            return state;
    }

};
export default currency;