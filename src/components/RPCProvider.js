import React, { Component } from 'react';
import { connect } from 'react-redux';
import { web3Connection } from '../reducers/web3';

class RPCProvider extends Component {


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
