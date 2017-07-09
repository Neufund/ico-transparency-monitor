import React, {Component} from 'react';
import {constantValueOf, getSmartContractConstants} from '../utils/web3';
import {connect} from 'react-redux';
import {decisionMatrix} from '../utils';
import {onModalShow, onErrorMessage, onMessage} from '../actions/ModalAction';
import {setProperties} from '../actions/ScanAction';
import ICOApp from './ICOApp';
import ICOScan from './ICOScan';
import {default as config} from '../config.js';


class ICO extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (typeof this.props.address === "undefined") return;
        const transparencyDecision = decisionMatrix(this.props.ico.matrix)[0];

        this.props.setICOProperties(this.props.ico.address,{decision: transparencyDecision})
        getSmartContractConstants(this.props.address).then((parameters)=>{
            Object.keys(parameters).map((constant) => {
                const parameter = parameters[constant];
                if (parameter === null) return;
                const tempResult = {};
                if (typeof parameter === "object" && typeof parameter.then === "function")
                    parameter.then((value)=>{
                        tempResult[constant] = value;
                        this.props.setICOProperties(this.props.ico.address,tempResult)
                    });
                else{
                    tempResult[constant] = parameter;
                    this.props.setICOProperties(this.props.ico.address,tempResult)
                }
            });
        });
    }

    render() {

        if (this.props.inner)
            return ( <ICOScan address={this.props.ico.address} onModalShow = {this.props.onModalShow}/>);
        else
            return ( <ICOApp address={this.props.ico.address}
                             onModalShow = {this.props.onModalShow}
            />);
    }
}


const mapStateToProps = (state) => {
    // console.log(state.ICO.icos);
    return {
        showModal: state.modal.showModal,
        currentICO: state.modal.currentICO,
        ICOs : state.ICO.icos
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
        },
        setICOProperties: (address,obj) => {
            dispatch(setProperties(address,obj))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ICO);
