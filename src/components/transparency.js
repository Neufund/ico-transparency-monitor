import React,{Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { connect } from 'react-redux';
import {onModalDispatchToProp} from '../reducers/redux-utils';
// Map Redux actions to component props
import {decisionMatrix} from '../utils'

const getAnswer = (currentICO, questionNumber)=>{
    if (currentICO.matrix[questionNumber].answer === true){
        return "Yes";
    }else if(currentICO.matrix[questionNumber].answer === false){
        return "No";
    }else if(currentICO.matrix[questionNumber].answer === null){
        return `N/A because ${currentICO.matrix[questionNumber].reason}`;
    }
};


const ContentTable = ({currentICO}) => {
    return (
        <div>
            <Row>
                <Col md={6}><h1> {currentICO.name}</h1></Col>
                <Col md={6}>
                    <button href="" className={"transparency-button " + decisionMatrix(currentICO.matrix)[0].replace(/\s+/g, '-').toLowerCase() + "-status"}>
                        <p>Transparency</p>
                        <strong>  {decisionMatrix(currentICO.matrix)[0]} <span className="fa fa-arrow-right"></span> </strong>
                    </button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>

                    <table className="pure-table">
                        <thead>
                        <tr><th>Question</th><th>Answer</th></tr>
                        </thead>
                        <tbody>
                        <tr><td>Is ICO controlled by a smart contract?</td><td>{getAnswer(currentICO,'q1')}</td></tr>
                        <tr><td>Is smart contract source code available?</td><td>{getAnswer(currentICO,'q2')}</td></tr>
                        <tr><td>Is smart contract source code provided in etherscan?</td><td>{getAnswer(currentICO,'q3')}</td></tr>
                        <tr><td>Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)</td><td>{getAnswer(currentICO,'q4')}</td></tr>
                        <tr><td>Does smart contract provide all tracking data via events?</td><td>{getAnswer(currentICO,'q5')}</td></tr>
                        <tr><td>Is information on token price in ETH provided? (via event or in transaction?)</td><td>{getAnswer(currentICO,'q6')}</td></tr>
                        <tr><td>Does smart contract handle ETH in a trustless way?</td><td>{getAnswer(currentICO,'q7')}</td></tr>
                        <tr><td>If ICO is using other currencies is information on token price provided?</td><td>{getAnswer(currentICO,'q8')}</td></tr>
                        <tr><td>Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?</td><td>{getAnswer(currentICO,'q9')}</td></tr>
                        <tr><td>Was smart contract code easy to read and properly commented?</td><td>{getAnswer(currentICO,'q10')}</td></tr>
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
};

const MessageModal = ({type , message}) => {
    return (
        <div>
            <div>
                <h3>{type}</h3>
                <ul>
                {message.map((item)=><li key={Math.random()}>${item}</li>)}
                </ul>
            </div>
        </div>
    );
}

class TransparencyModal extends Component {
    constructor(){
        super();
    }

    render() {
        const {showModal ,onModalClose , messageType ,currentICO , message } = this.props;
        if (messageType === "SHOW_MODAL_ERROR" || messageType ==="SHOW_MODAL_MESSAGE"){
            return (showModal === true && <ModalContainer onClose={onModalClose}>
                <ModalDialog onClose={onModalClose}>
                    <MessageModal type={messageType} message={message}/>
                </ModalDialog>
            </ModalContainer>)

        } else
        return (showModal === true && Object.keys(currentICO).length > 0 && <ModalContainer onClose={onModalClose}>

            <ModalDialog onClose={onModalClose}>
                <ContentTable currentICO={currentICO} />
            </ModalDialog>
        </ModalContainer>)
    };
}

export default connect(
    state => ({
        showModal: state.modal.showModal ,
        currentICO : state.modal.currentICO,
        messageType:state.modal.messageType,
        message:state.modal.message,
    }),
    onModalDispatchToProp
)(TransparencyModal)