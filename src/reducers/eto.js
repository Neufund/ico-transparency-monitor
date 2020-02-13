import GENERAL from '../constants/general';

const initialState = {
  etoData: {},
  etoConfig: null,
  etoBlocks: null,
  properties: {},
};

const ETO = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL.ACTIONS.SET_ETO_DATA: {
      return {
        ...state,
        etoData: action.etoData,
      };
    }
    case GENERAL.ACTIONS.SET_ETO_BLOCKS: {
      return {
        ...state,
        etoBlocks: action.etoBlocks,
      };
    }
    case GENERAL.ACTIONS.SET_ETO_PROPERTY: {
      const key = Object.keys(action.prop)[0];
      if (typeof state.properties[action.address] === 'undefined') { state.properties[action.address] = {}; }
      state.properties[action.address][key] = action.prop[key];

      return {
        ...state,
        properties: state.properties,
      };
    }
    default: {
      return state;
    }
  }
};


const ICO = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ICO_PROPERTY': {
      const key = Object.keys(action.prop)[0];
      if (typeof state.icos[action.address] === 'undefined') { state.icos[action.address] = {}; }
      state.icos[action.address][key] = action.prop[key];

      return {
        ...state,
        icos: state.icos,
      };
    } default: {
      return state;
    }
  }
};

export default ETO;
