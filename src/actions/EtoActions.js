import GENERAL from '../constants/general';
import { apiUrl } from '../env';

const setEdtoData = etoData => ({
  type: GENERAL.ACTIONS.SET_ETO_DATA,
  etoData,
});
const getEtoData = etoId => dispatch => fetch(`${apiUrl}/api/eto-listing/etos/${etoId}`)
  .then(response => response.json())
  .then(data => dispatch(setEdtoData(data)));

export default getEtoData;
