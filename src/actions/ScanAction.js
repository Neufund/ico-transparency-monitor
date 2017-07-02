export const drawStatistics = (statistics) => {
    return { type: 'DRAW_STATS', stats : statistics }
};

export const showLoader = () => {
    return {type:'SHOW_LOADER'}
};

export const hideLoader = () => {
    return {type:'HIDE_LOADER'}
};