const initialState = {
  icos: {
  },
};


const ICO = (state = initialState, action) => {
  // console.log("Action" , action)
  switch (action.type) {
    case 'SET_ICO_PROPERTY':

      const key = Object.keys(action.prop)[0];
      // console.log(`Action is ${action.type}, ${key}, ${action.prop[key]}`)
      if (typeof state.icos[action.address] === 'undefined') { state.icos[action.address] = {}; }
      state.icos[action.address][key] = action.prop[key];

      return {
        ...state,
        icos: state.icos,
      };
    default:
      return state;
  }
};

export default ICO;
