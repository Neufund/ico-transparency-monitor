import React,{Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { connect } from 'react-redux';
import {onModalDispatchToProp} from '../reducers/redux-utils';
// Map Redux actions to component props


export const TransparancyTable = ({logo}) => (
        <table className="pure-table">
            <thead>
                <tr><th>Question</th><th>Answer</th></tr>
            </thead>
            <tbody>
                <tr><td>Is ICO controlled by a smart contract?</td><td></td></tr>
                <tr><td>Is smart contract source code available?</td><td></td></tr>
                <tr><td>Is smart contract source code provided in etherscan?</td><td></td></tr>
                <tr><td>Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)</td><td></td></tr>
                <tr><td>Does smart contract provide all tracking data via events?</td><td></td></tr>
                <tr><td>Is information on token price in ETH provided? (via event or in transaction?)</td><td></td></tr>
                <tr><td>Does smart contract handle ETH in a trustless way?</td><td></td></tr>
                <tr><td>If ICO is using other currencies is information on token price provided?</td><td></td></tr>
                <tr><td>Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?</td><td></td></tr>
                <tr><td>Was smart contract code easy to read and properly commented?</td><td></td></tr>
            </tbody>
        </table>
);


class TransparencyModal extends Component {
    constructor({...props}){
        super()
        console.log(props)
    }
    render() {
        const {showModal ,onModalClose , currentICO } = this.props;
        // console.log(props)
        return (showModal === true && <ModalContainer onClose={onModalClose}>
            <ModalDialog onClose={onModalClose}>
                <Row>
                    <Col md={6}><h1> {currentICO.name}</h1></Col>
                    <Col md={6}>
                        <button href="" className={"transparency-button " + "" + "-status"}>
                            <p>Transparency</p>
                            <strong> Not Transparent <span className="fa fa-arrow-right">-></span> </strong>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <TransparancyTable/>
                    </Col>
                </Row>
            </ModalDialog>
        </ModalContainer>)
    };
}

export default connect(
    state => ({
        showModal: state.modal.showModal ,
        currentICO : state.modal.currentICO
    }),
    onModalDispatchToProp
)(TransparencyModal)