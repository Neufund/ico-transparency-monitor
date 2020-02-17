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

const getEtoBlocks = timestamps => dispatch => fetch(`${apiUrl}/api/analytics-api/blocks?exact=false&timestamps=${timestamps}`)
  .then(response => response.json())
  .then(data => dispatch(setEtoBlocks(data)));

const getEtoData = etoId => dispatch => fetch(`${apiUrl}/api/eto-listing/etos/${etoId}`)
  .then(response => response.json())
  .then(data => dispatch(setEdtoData(data)));

export {
  getEtoData,
  getEtoBlocks
};
