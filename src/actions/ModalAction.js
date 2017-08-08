export const onModalClose = () => ({ type: 'HIDE_MODAL' });

export const onModalShow = currentICO => ({ type: 'SHOW_MODAL', ico: currentICO });

export const showErrorMessage = message => ({ type: 'SHOW_MODAL_ERROR', message });

export const showMessage = message => ({ type: 'SHOW_MODAL_MESSAGE', message });
