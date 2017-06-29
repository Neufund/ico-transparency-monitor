export const onModalClose = () => {
    return { type: 'HIDE_MODAL' }
};

export const onModalShow = (currentICO) => {
    return { type: 'SHOW_MODAL' ,ico : currentICO};
};

export const onErrorMessage = (message)=>{
    return { type: 'SHOW_MODAL_ERROR',message :message };
};

export const onMessage = (message)=>{
    return { type: 'SHOW_MODAL_MESSAGE',message :message };
};
