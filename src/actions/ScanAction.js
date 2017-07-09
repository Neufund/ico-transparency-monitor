export const drawStatistics = (statistics) => {
    return { type: 'DRAW_STATS', stats : statistics }
};

export const showLoader = () => {
    return {type:'SHOW_LOADER'}
};

export const hideLoader = () => {
    return {type:'HIDE_LOADER'}
};

export const setProperties = (address,prop) => {
    return {type:'SET_ICO_PROPERTY' , address:address, prop:prop}
};