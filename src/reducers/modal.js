export const modal = (state = { showModal: false,
  currentICO: {},
  messageType: null,
  message: [],
  web3: null }, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, showModal: true, currentICO: action.ico, messageType: null };
    case 'HIDE_MODAL':
      return { ...state, showModal: false, currentICO: {}, messageType: null, message: [] };
    case 'SHOW_MODAL_MESSAGE':
    case 'SHOW_MODAL_ERROR': {
      const allMessage = state.message;
      if (allMessage.indexOf(action.message) === -1) allMessage.push(action.message);
      return { ...state, showModal: true, messageType: action.type, message: allMessage };
    }
    case 'RESET_RPC':
      return { ...state, web3: null };
    case 'SET_WEB3_CONNECTION' :
      return {
        ...state,
        web3: action.web3,
      };
    default:
      return state;
  }
};

export default modal;
