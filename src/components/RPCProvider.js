import React, { Component } from 'react';
import { connect } from 'react-redux';
import { web3Connection } from '../reducers/web3';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TopHeader from '../components/TopHeader';
import { default as config } from '../config.js';

class RPCProvider extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    this.props.rpcConnection();
  }

  render() {
    return (
      <div>
        {this.props.children }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, state) => ({
  rpcConnection: () => {
    dispatch(web3Connection());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(RPCProvider);
