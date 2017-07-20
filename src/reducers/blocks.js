const blocks = (state = null, action) => {
  switch (action.type) {
    case 'SET_BLOCK':
      return action.block;
    default:
      return state;
  }
};
export default blocks;
