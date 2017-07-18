export const onModalClose = () => ({ type: 'HIDE_MODAL' });

export const onModalShow = currentICO => ({ type: 'SHOW_MODAL', ico: currentICO });

export const onErrorMessage = message => ({ type: 'SHOW_MODAL_ERROR', message });

export const onMessage = message => ({ type: 'SHOW_MODAL_MESSAGE', message });
