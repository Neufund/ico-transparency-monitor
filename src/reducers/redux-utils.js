import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const mapStateToProps = (state) => {
    console.log(state.modal);
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
        }
    }
};

export const mapScanStatisticsToProps = (dispatch) => {
    return {
        drawStatistics: (statistics) => {
            dispatch({ type: 'DRAW_STATS', stats : statistics , test:"hi" })
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