/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import '../assets/css/App.css';
import ScanBoxLoadingMessage from '../components/ScanBoxLoadingMessage';
import ScanBoxETODetails from './ScanBoxETODetails';
import Error404 from '../components/Error404';
import { getEtoBlocks, getEtoData } from '../actions/EtoActions';
import EtoConfig from '../utils/ETOConfig';
import { getEtoDates, getETOLogs, readETOSmartContract } from '../utils/ETO';

class ETOStatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlockMounted: false,
    };
  }

  componentDidMount() {
    const etoId = this.props.address;
    this.props.getEtoData(etoId).then(() => {
      const etoDates = getEtoDates(this.props.etoData);
      const blockTimestamps = [etoDates.startDate / 1000];
      if (Date.now() > etoDates.endDate) {
        blockTimestamps.push(etoDates.endDate / 1000);
      }
      return this.props.getEtoBlocks(blockTimestamps);
    }).then(() => {
      this.props.readSmartContract(this.props.etoConfig);
    });
  }

  componentDidUpdate() {
    const { scrollHeight: height } = document.body;
    const { isLoading, isComponentReady } = this.props;

    if (window.parent && !isLoading && isComponentReady) {
      /* Send message to parent with it's current height
        only if it's loaded within iframe
       */
      window.parent.postMessage(height, '*');
    }
  }

  render() {
    if (!this.props.address) { return <Error404 message={`Address ${this.props.address}`} />; }
    if (this.props.isSmartContractLoaded
      && this.props.blocks && this.state.isBlockMounted === false) {
      this.setState({ isBlockMounted: true });
      this.props.getLogs(this.props.etoConfig);
    }
    return (
      <div className="App">
        {this.state.isBlockMounted && this.props.etoConfig && <div>
          <Grid className="scanbox ico-box-scan">
            {this.props.isLoading &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg={this.props.etoConfig.alternativeLoadingMsg}
              />}
            {this.props.hasNoTransactions &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg="No transactions were found, please check later"
              />}
            {this.props.etoConfig && this.props.etoConfig.icoParameters.status() === 'not started' &&
            <ScanBoxLoadingMessage
              alternativeLoadingMsg="ETO has not started yet"
            />}
            {!this.props.isLoading && this.props.isComponentReady &&
              <ScanBoxETODetails address={this.props.address} symbol={this.props.etoConfig.information.name} etoConfig={this.props.etoConfig} offeringType={this.props.etoConfig.information.offeringType || 'ICO'} />
            }
          </Grid>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const address = props.match.params.etoId;
  return {
    address,
    etoData: state.ETO.etoData,
    etoConfig: state.ETO.etoData && new EtoConfig(state.ETO.etoData, state.ETO.etoBlocks),
    smartContractProps: state.ETO.properties[address],
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
  getLogs: (etoConfig) => {
    dispatch(getETOLogs(etoConfig));
  },
  getEtoData: etoId => dispatch(getEtoData(etoId)),
  getEtoBlocks: timestamps => dispatch(getEtoBlocks(timestamps)),
  readSmartContract: (etoConfig) => {
    dispatch(readETOSmartContract(etoConfig));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ETOStatsPage);
