import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onModalShow } from '../actions/ModalAction';
import ICOApp from './ICOApp';
import ICOScan from './ICOScan';
import { readSmartContract } from '../reducers/web3';
import { isConnected } from '../utils/web3';
import { errorMessage, resetRpc } from '../actions/ScanAction';

class ICO extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.web3 && !this.props.isSmartContractLoaded) {
      this.props.readSmartContract(this.props.address);
    }
  }

  render() {
    return (
      <div>
        {this.props.isInSingleICOView && <ICOScan address={this.props.address} onModalShow={this.props.onModalShow} />}
        {!this.props.isInSingleICOView && <ICOApp address={this.props.address} onModalShow={this.props.onModalShow} />}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  showModal: state.modal.showModal,
  web3: state.modal.web3,
  isSmartContractLoaded: state.scan.isSmartContractLoaded,
});

const mapDispatchToProps = (dispatch, state) => ({
  onModalShow: (currentICO) => {
    if (isConnected()) {
      dispatch(onModalShow(currentICO));
    } else {
      dispatch(resetRpc());
      dispatch(errorMessage());
    }
  },
  readSmartContract: (address) => {
    dispatch(readSmartContract(address));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ICO);
