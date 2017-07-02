import React, {Component} from 'react';
import {constantValueOf, getSmartContractConstants} from '../utils/web3';
import {connect} from 'react-redux';
import {decisionMatrix} from '../utils';
import {default as config} from '../config.js';
import {onModalShow, onErrorMessage, onMessage} from '../actions/ModalAction';
import {ICOApp} from './ICOApp';
import {ICOScan} from './ICOScan';


class ICO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cap: null,
            endDate: null,
            name: null,
            startDate: null,
            symbol: null,
            totalSupply: null,
            decision: ""
        }
    }

    componentWillMount() {
        if (typeof this.props.address === "undefined") return;
        const transparencyDecision = decisionMatrix(this.props.ico.matrix)[0];

        this.setState({decision: transparencyDecision});

        let constansPromises = null;
        try {
            constansPromises = getSmartContractConstants(this.props.address);
        } catch (error) {
            this.props.onErrorMessage(`Cant read smart Contract for ${this.props.address} from RPC Host url ${config.rpcHost}.`);
            return;
        }

        Object.keys(constansPromises).map((constant) => {
            const tempResult = {};
            constansPromises[constant].value.then(async (singlePromise) => {
                tempResult[constant] = await constantValueOf(singlePromise, constansPromises[constant].type);
                this.setState(tempResult);
            }).catch((error) =>
                this.props.onErrorMessage(`Cant read smart Contract for ${this.props.ico.name} ${error}`))
        });
    }

    render() {
        if (this.props.inner)
            return ( <ICOScan props={this.props} state={this.state} status={this.props.ico.information.status}/>);
        else
            return ( <ICOApp props={this.props} state={this.state}/>);
    }
}


const mapStateToProps = (state) => {
    return {
        showModal: state.modal.showModal,
        currentICO: state.modal.currentICO,
        showLoader: state.scan.showLoader
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onModalShow: (currentICO) => {
            dispatch(onModalShow(currentICO))
        },
        onErrorMessage: (message) => {
            dispatch(onErrorMessage(message));
        },
        onMessage: (message) => {
            dispatch(onMessage(message));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ICO);
