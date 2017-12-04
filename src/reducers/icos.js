const ICO = (state, action) => {
  switch (action.type) {
    case 'SET_ICO_PROPERTY':
      const key = Object.keys(action.prop)[0];
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
