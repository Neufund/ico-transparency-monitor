import React from 'react';
import {connect} from 'react-redux';
import {onModalShow} from '../actions/ModalAction';
import ICOApp from './ICOApp';
import ICOScan from './ICOScan';
import {readSmartContract} from '../reducers/web3';
import {isConnected} from '../utils/web3';
import {errorMessage,resetRpc} from '../actions/ScanAction';

const ICO = ({...props}) => {
    return (
        <div>
            {props.readSmartContract(props.address)}
            {props.inner && <ICOScan address={props.address} onModalShow = {props.onModalShow}/>}
            {!props.inner && <ICOApp address={props.address} onModalShow = {props.onModalShow}/>}
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        showModal: state.modal.showModal,
    }
};

const mapDispatchToProps = (dispatch , state) => {
    return {
        onModalShow: (currentICO) => {
            if(isConnected())
                dispatch(onModalShow(currentICO))
            else {
                dispatch(resetRpc());
                dispatch(errorMessage());
            }
        },
        readSmartContract:(address) => {
            dispatch(readSmartContract(address))
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ICO);