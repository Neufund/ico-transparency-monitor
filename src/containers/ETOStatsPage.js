/* eslint-env browser */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import '../assets/css/App.css';
import ScanBoxLoadingMessage from '../components/ScanBoxLoadingMessage';
import ScanBoxETODetails from './ScanBoxETODetails';
import Error404 from '../components/Error404';
import { getEtoBlocks, getEtoData } from '../actions/EtoActions';
import { getEtoDates, getETOLogs, readETOSmartContract } from '../utils/ETO';
import {
  blocksSelector,
  currencySelector,
  etoConfigSelector,
  etoDataSelector, etoPropertiesSelector, hasNoTransactionsSelector,
  isComponentReadySelector,
  isLoadingSelector,
  isSmartContractLoadedSelector,
  web3Selector,
} from '../selectors/ETO.selectors';

class ETOStatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlockMounted: false,
    };
  }

  componentDidMount() {
    const etoId = this.props.address;
    // get ETO data from backend API
    this.props.getEtoData(etoId).then(() => {
      // get dates from eto and provide top backend in seconds
      const etoDates = getEtoDates(this.props.etoData);
      const blockTimestamps = [etoDates.startDate / 1000];
      if (Date.now() > etoDates.endDate) {
        blockTimestamps.push(etoDates.endDate / 1000);
      }
      return this.props.getEtoBlocks(blockTimestamps);
    }).then((data) => {
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
    const { isLoading, hasNoTransactions, etoConfig, address, isSmartContractLoaded, blocks, getLogs, isComponentReady } = this.props;
    if (!address) { return <Error404 message={`Address ${this.props.address}`} />; }
    if (isSmartContractLoaded
      && blocks && this.state.isBlockMounted === false) {
      this.setState({ isBlockMounted: true });
      getLogs(etoConfig);
    }
    return (
      <div className="App">
        {this.state.isBlockMounted && etoConfig && <div>
          <Grid className="scanbox ico-box-scan">
            {isLoading &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg={etoConfig.alternativeLoadingMsg}
              />}
            {hasNoTransactions &&
              <ScanBoxLoadingMessage
                alternativeLoadingMsg="No transactions were found, please check later"
              />}
            {etoConfig && etoConfig.icoParameters.status() === 'not started' &&
            <ScanBoxLoadingMessage
              alternativeLoadingMsg="ETO has not started yet"
            />}
            {!isLoading && isComponentReady &&
              <ScanBoxETODetails address={address} symbol={etoConfig.information.name} etoConfig={etoConfig} offeringType={etoConfig.information.offeringType} />
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
    etoData: etoDataSelector(state),
    etoConfig: etoConfigSelector(state),
    smartContractProps: etoPropertiesSelector(state, address),
    currencyValue: currencySelector(state),
    isComponentReady: isComponentReadySelector(state),
    isLoading: isLoadingSelector(state),
    web3: web3Selector(state),
    blocks: blocksSelector(state),
    isSmartContractLoaded: isSmartContractLoadedSelector(state),
    hasNoTransactions: hasNoTransactionsSelector(state),
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
