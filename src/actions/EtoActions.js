import GENERAL from '../constants/general';
import { apiUrl } from '../env';

const setEdtoData = etoData => ({
  type: GENERAL.ACTIONS.SET_ETO_DATA,
  etoData,
});
const setEtoBlocks = etoBlocks => ({
  type: GENERAL.ACTIONS.SET_ETO_BLOCKS,
  etoBlocks,
});
const getEtoDates = (etoData) => {
  const startDate = new Date(etoData.start_date).getTime();
  const endDate = startDate + etoData.public_duration_days * 24 * 60 * 60 * 1000;
  return {
    startDate,
    endDate,
  };
};

const getEtoBlocks = timestamps => dispatch => fetch(`${apiUrl}/api/analytics-api/blocks?exact=false&timestamps=${timestamps}`)
  .then(response => response.json())
  .then(data => dispatch(setEtoBlocks(data)));

const getEtoData = etoId => dispatch => fetch(`${apiUrl}/api/eto-listing/etos/${etoId}`)
  .then(response => response.json())
  .then(data => dispatch(setEdtoData(data)));

export {
  getEtoData,
  getEtoBlocks,
  getEtoDates,
};
