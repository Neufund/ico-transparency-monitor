
export const modal = (state = { showModal: false , currentICO:{} , messageType:null,message:[] } , action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return { ...state , showModal : true , currentICO : action.ico , messageType:null};
        case 'HIDE_MODAL':
            return {...state , showModal : false , currentICO : {} , messageType:null};
        case 'SHOW_MODAL_MESSAGE':
        case 'SHOW_MODAL_ERROR':
            state['message']= [];
            let allMessage =  state['message'];

            if(allMessage.indexOf(action.message) === -1) allMessage.push(action.message);

            return {...state, showModal : true , messageType: action.type , message:allMessage};
        default:
            return state
    }
};

export default modal;