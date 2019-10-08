/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import '../assets/css/App.css';
import GoNextGoBackBar from '../components/GoNextGoBackBar';
import IcoRowSinglePage from '../components/IcoRowSinglePage';
import ScanBoxLoadingMessage from '../components/ScanBoxLoadingMessage';
import ScanBoxDetails from './ScanBoxDetails';
import IcoScanHeader from '../components/ICOScanHeader';
import config, { appendICO } from '../config';
import Error404 from '../components/Error404';
import { getLogs, readSmartContract } from '../actions/web3';
import { onModalShow, showErrorMessage } from '../actions/ModalAction';
import { resetRpc } from '../actions/ScanAction';
import { isConnected } from '../utils/web3';
import { getICOByAddress } from '../icos_config';

class InnerIcoPage extends Component {
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

  render() {
    if (typeof config.ICOs[this.props.address] === 'undefined') { return <Error404 message={`Address ${this.props.address}`} />; }

    if (this.props.isSmartContractLoaded
      && this.props.blocks && this.state.isBlockMounted === false) {
      this.setState({ isBlockMounted: true });
      this.props.getLogs(this.props.address);
    }

    const { name, totalSupply, symbol, cap, startDate,
      endDate, status, decision } = this.props.smartContractProps || {};
    const { address, information, addedBy, tokenContract } = this.props.ico;
    const showLoader = this.props.isLoading;
    const onModalShowCallback = this.props.onModalShow;
    const icoModalData = {
      name,
      matrix: this.props.ico.matrix,
      information: this.props.ico.information,
    };

    return (
      <div className="App">
        {this.state.isBlockMounted && <div>
          <GoNextGoBackBar address={this.props.address} />
          <Grid className="scanbox ico-box-scan">
            <IcoScanHeader
              address={address}
              information={information}
              name={name}
              addedBy={addedBy}
              decision={decision}
              tokenContract={tokenContract}
              onModalShow={onModalShowCallback}
              icoModalData={icoModalData}
            />

            <IcoRowSinglePage
              address={this.props.address}
              totalSupply={totalSupply}
              symbol={symbol}
              cap={cap}
              startDate={startDate}
              endDate={endDate}
              status={status}
              isLoading={showLoader}
            />

            {this.props.isLoading &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg={this.props.ico.alternativeLoadingMsg}
              />}
            {this.props.hasNoTransactions &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg="No transactions were found, please check later"
              />}
            {!this.props.isLoading && this.props.isComponentReady &&
              <ScanBoxDetails address={this.props.address} offeringType={information.offeringType || 'ICO'} /> }
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
)(InnerIcoPage);
