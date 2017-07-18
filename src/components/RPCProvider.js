import React, { Component } from 'react';
import { connect } from 'react-redux';
import { web3Connection } from '../reducers/web3';
import { increaseCounter, resetCounter } from '../actions/ScanAction';

class RPCProvider extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.rpcConnection();

    if (!this.props.web3) { this.props.reconnect(); }
  }

  render() {
    return (
      <div>
        {this.props.web3 &&
      this.props.children
      }
        {!this.props.web3 &&
        <div>
          <h1 className="center">RPC connection Error</h1>
          <a href="/" >Reload {this.props.counter}</a>
        </div>
      }

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  web3: state.modal.web3,
  counter: state.notifications,
});
const mapDispatchToProps = (dispatch, state) => ({
  rpcConnection: () => {
    dispatch(web3Connection());
  },
  // TODO
  reconnect: () => {

  },
  resetCounter: () => {
    dispatch(resetCounter());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RPCProvider);
