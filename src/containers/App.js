import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import '../assets/css/App.css';
import ICO from '../components/ICO';
import Header from '../components/Header';
import { getICOs } from '../utils';
import { web3Connection } from '../reducers/web3';

/* Notice three changes:
   - correct usage of destructuring https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
   - usage of ternary operator
   - i moved rpcConnection() call from markup.
 */
const App = ({ rpcConnection, web3 }) => {
  rpcConnection();
  return (
    <div className="App">
      <Header />
      {web3 ?
        <Grid fluid>
          {getICOs().map(ico => <ICO key={ico.address} ico={ico} address={ico.address} />)}
        </Grid>
        :
        <div>
          <h1>RPC connection Error</h1>
        </div>
      }
    </div>
  );
};

App.propTypes = {
  rpcConnection: PropTypes.func.isRequired,
  web3: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  web3: state.modal.web3,
});

const mapDispatchToProps = (dispatch) => ({
  rpcConnection: () => {
    dispatch(web3Connection());
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
