import GENERAL from '../constants/general';

const initialState = {
  etoData: {},
  etoConfig: null,
}

const ETO = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL.ACTIONS.SET_ETO_DATA: {
      return {
        ...state,
        etoData: action.etoData,
      };
    } default: {
      return state;
    }
  }
};

export default ETO;
