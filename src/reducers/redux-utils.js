import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const mapStateToProps = (state) => {
    return {
        showModal: state.modal.showModal,
        currentICO : state.modal.currentICO
    }
};


export const doShowModal = currentICO => {
    return { type: 'SHOW_MODAL' ,ico : currentICO};
};

// Map Redux actions to component props
export const onModalDispatchToProp = (dispatch) => {
    return {
        onModalClose: () => dispatch({ type: 'HIDE_MODAL' }),
        onModalShow: (currentICO) => {
            dispatch(doShowModal(currentICO))
        },
        onErrorMessage : (message)=>{

            dispatch({ type: 'SHOW_MODAL_ERROR',message :message });
        },

        onMessage : (message)=>{
            dispatch({ type: 'SHOW_MODAL_MESSAGE',message :message });
            dispatch({ type: 'SHOW_MODAL_ERROR',message :message })
        },

    }
};

export const mapScanStatisticsToProps = (dispatch) => {
    return {
        drawStatistics: (statistics) => {
            dispatch({ type: 'DRAW_STATS', stats : statistics })
        } ,
        setCurrency : (currency, value) => {
            dispatch({type:'SET_CURRENCY' , currency:currency , currencyValue:value})
        },
        showLoader : () => {
            dispatch(showLoading())
        },
        hideLoader : () => {
            dispatch(hideLoading())
        }
    }
};

