
export const modal = (state = { showModal: false , currentICO:{} } , action) => {
    console.log(`Modal Action ${action.type} , state`,state);
    switch (action.type) {
        case 'SHOW_MODAL':
            console.log("This action happed `SHOW_MODAL`")
            return { ...state , showModal : true , currentICO : action.ico}
            // return state;

        case 'HIDE_MODAL':
            return {...state , showModal : false , currentICO : {}};

        default:
            return state
    }
};

export default modal;