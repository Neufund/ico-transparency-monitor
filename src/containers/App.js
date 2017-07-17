import React from 'react';
import '../assets/css/App.css';
import { Grid } from 'react-flexbox-grid';
import ICO from '../components/ICO';
import Header from '../components/Header';
import { getICOs } from '../utils';
import { web3Connection } from '../reducers/web3';
import { connect } from 'react-redux';

const App = ({ ...props }) => (
  <div className="App">
    <Header />

    {props.rpcConnection()}
    {props.web3 &&

    <Grid fluid>
      {getICOs().map(ico => <ICO key={ico.address} ico={ico} address={ico.address} />)}
    </Grid>}
    {!props.web3 &&
    <div>
      <h1>RPC connection Error</h1>
    </div>
            }
  </div>
    );

const mapStateToProps = (state, props) => ({
  web3: state.modal.web3,
});
const mapDispatchToProps = (dispatch, state) => ({
  rpcConnection: () => {
    dispatch(web3Connection());
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
