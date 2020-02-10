/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import '../assets/css/App.css';
import ScanBoxLoadingMessage from '../components/ScanBoxLoadingMessage';
import ScanBoxDetails from './ScanBoxDetails';
import config, { appendICO } from '../config';
import Error404 from '../components/Error404';
import { getLogs, readSmartContract } from '../actions/web3';
import { onModalShow, showErrorMessage } from '../actions/ModalAction';
import { resetRpc } from '../actions/ScanAction';
import { isConnected } from '../utils/web3';
import { getICOByAddress } from '../icos_config';

class ICOStatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlockMounted: false,
    };
  }

  componentDidMount() {
    appendICO(this.props.address, getICOByAddress(this.props.address));

    if (this.props.web3 && typeof config.ICOs[this.props.address] !== 'undefined') {
      this.props.readSmartContract(this.props.address);
    }
  }

  componentDidUpdate() {
    const { scrollHeight: height } = document.body;
    const { isLoading, isComponentReady } = this.props;

    if (window.parent && !isLoading && isComponentReady) {
      /* Send message to parent with it's current height
        only if it's loadede within iframe
       */
      window.parent.postMessage(height, '*');
    }
  }

  render() {
    if (typeof config.ICOs[this.props.address] === 'undefined') { return <Error404 message={`Address ${this.props.address}`} />; }

    if (this.props.isSmartContractLoaded
      && this.props.blocks && this.state.isBlockMounted === false) {
      this.setState({ isBlockMounted: true });
      this.props.getLogs(this.props.address);
    }

    const { information } = this.props.ico;

    return (
      <div className="App">
        {this.state.isBlockMounted && <div>
          <Grid className="scanbox ico-box-scan">
            {this.props.isLoading &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg={this.props.ico.alternativeLoadingMsg}
              />}
            {this.props.hasNoTransactions &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg="No transactions were found, please check later"
              />}
            {!this.props.isLoading && this.props.isComponentReady &&
              <ScanBoxDetails address={this.props.address} icoConfig={config.ICOs[this.props.address]} offeringType={information.offeringType || 'ICO'} /> }
          </Grid>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const address = props.match.params.name;
  return {
    address,
    ico: config.ICOs[address],
    smartContractProps: state.ICO.icos[address],
    currencyValue: state.currency.value,
    isComponentReady: state.scan.showStats,
    isLoading: state.scan.showLoader,
    web3: state.modal.web3,
    blocks: state.blocks,
    isSmartContractLoaded: state.scan.isSmartContractLoaded,
    hasNoTransactions: state.scan.hasNoTransactions,
  };
};

const mapDispatchToProps = dispatch => ({
  getLogs: (address) => {
    dispatch(getLogs(address));
  },
  readSmartContract: (address) => {
    dispatch(readSmartContract(address));
  },
  onModalShow: (currentICO) => {
    if (isConnected()) {
      dispatch(onModalShow(currentICO));
    } else {
      dispatch(resetRpc());
      dispatch(showErrorMessage(`Trying to connect to
      rpc node ${config.rpcHost} received an invalid response.`));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ICOStatsPage);
