import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { connect } from 'react-redux';
import { computeICOTransparency, criticalToTransparencyLevel, icoTransparencyLevel } from '../utils';
import { onModalClose, onErrorMessage } from '../actions/ModalAction';
import { default as config } from '../config.js';

class ContentTable extends Component {
  constructor({ currentICO }) {
    super();
    this.state = {
      matrix: {},
      issuesArray: {},
      decision: '',
    };
    this.currentICO = currentICO;
  }
  componentWillMount() {
    const result = computeICOTransparency(this.currentICO.matrix);

    this.setState({
      matrix: this.currentICO.matrix,
      issuesArray: result[1],
      decision: result[0],
    });
    console.log(this.currentICO)
  }
  getRowClassName(key) {
    return this.state.issuesArray[key] ? `${criticalToTransparencyLevel(config.matrix[key].critical)}-row` : '';
  }

  getAlertClassName(key) {
    return this.state.issuesArray[key] ? `${criticalToTransparencyLevel(config.matrix[key].critical)}-alert` : '';
  }

  render() {
    return (
      <div className="modal-container">
        <Row>
          <div className="modal-title-container">
            <div className="modal-title">
              <h3> {this.currentICO.name || this.currentICO.information.aliasName}</h3>
            </div>
            <div className="modal-title-button">
              <button className={`transparency-button ${this.state.decision}-status`}>
                <p>Transparency</p>
                <strong>{icoTransparencyLevel[this.state.decision.toUpperCase()]} </strong>
                <span className="arrow">&#8594;</span>
              </button>
            </div>
          </div>
        </Row>
        <Row>
          <Col md={12}>

            <table className="pure-table">
              <thead>
              </thead>
              <tbody>
                {Object.keys(config.matrix).map((key, index) => {
                  const currentQuestion = this.state.matrix[key];
                  const mappedQuestionMatrix = config.matrix[key];

                  return (<tr key={index}>
                    <td className={this.getRowClassName(key)}>
                      {mappedQuestionMatrix.question}
                      <p className={`alert-error ${this.getAlertClassName(key)}`}>{currentQuestion.comment}</p>
                    </td>
                    <th>
                      <p>{currentQuestion.answer === null ? 'N/A' : (currentQuestion.answer ? 'Yes' : 'No')}</p>
                    </th>
                  </tr>);
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    );
  }
}

const ErrorModal = ({ title, message }) => (<div>
  <div>
    <h3>{title}</h3>
    <p>{message}</p>
    <a href="/" >Reload</a>
  </div>
</div>);

const MessageModal = ({ type, message }) => (
  <div>
    <div>
      <h3>{type}</h3>
      <ul>
        {message.map(item => <li key={Math.random()}>${item}</li>)}
      </ul>
    </div>
  </div>
    );

class MessageBoxModal extends Component {

  render() {
    const { showModal, onModalClose, messageType, currentICO, message } = this.props;
    if (messageType === 'SHOW_MODAL_MESSAGE') {
      return (showModal === true && <ModalContainer onClose={onModalClose}>
        <ModalDialog onClose={onModalClose}>
          <MessageModal type={messageType} message={message} />
        </ModalDialog>
      </ModalContainer>);
    } else if (messageType === 'SHOW_MODAL_ERROR') {
      return (showModal === true && <ModalContainer onClose={onModalClose}>
        <ModalDialog onClose={onModalClose}>
          <ErrorModal code={503} title="RPC connection fail" message={`Trying to connect to rpc node ${config.rpcHost} received an invalid response.`} />
        </ModalDialog>
        </ModalContainer>);
    }

    return (showModal === true && Object.keys(currentICO).length > 0 && <ModalContainer onClose={onModalClose}>

      <ModalDialog onClose={onModalClose}>
        <ContentTable currentICO={currentICO} />
      </ModalDialog>
    </ModalContainer>);
  }
}

const mapStateToProps = state => ({
  showModal: state.modal.showModal,
  currentICO: state.modal.currentICO,
  messageType: state.modal.messageType,
  message: state.modal.message,
});
const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(onModalClose()),
  onErrorMessage: (message) => {
    dispatch(onErrorMessage(message));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBoxModal);
