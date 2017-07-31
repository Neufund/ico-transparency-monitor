export const drawStatistics = statistics => ({ type: 'DRAW_STATS', stats: statistics });

export const allocateCSVFile = statistics => ({ type: 'CSV_FILE', csvContent: statistics });

export const showStatistics = () => ({ type: 'SHOW_STATS' });

export const showLoader = () => ({ type: 'SHOW_LOADER' });

export const hideLoader = () => ({ type: 'HIDE_LOADER' });

export const setProperties = (address, prop) => ({ type: 'SET_ICO_PROPERTY', address, prop });

export const setSmartContractLoaded = value => ({ type: 'IS_SMART_CONTRACT_LOADED', value });

export const resetRpc = () => ({ type: 'RESET_RPC' });

export const setBlock = block => ({ type: 'SET_BLOCK', block });
