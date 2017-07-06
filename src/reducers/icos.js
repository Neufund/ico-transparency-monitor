const initIco = {
    cap: null,
    endDate: null,
    name: null,
    startDate: null,
    symbol: null,
    totalSupply: null,
    decision: "",
};

const scan = (state = [] , action) => {
    switch (action.type) {
        case 'ADD_ICO':
            return {
                ...state,
                stats: {...action.stats}
            };
        default:
            return state
    }
};

export default scan;