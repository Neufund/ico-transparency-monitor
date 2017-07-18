import React, { Component } from 'react';
import { connect } from 'react-redux';
import { web3Connection } from '../reducers/web3';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TopHeader from '../components/TopHeader';
import { default as config } from '../config.js';

const RPCConnectionError = ({ ...props }) => (
  <div>
    <TopHeader />
    <Grid fluid>
      <Row className="well well-error">
        <Col md="12" >
          <h1 className="center">RPC connection Error (502)</h1>
          <p>Trying to connect to rpc node {config.rpcHost} received an invalid response.</p>
          <a href="/" >Reload {props.counter}</a>
        </Col>
      </Row>
    </Grid>
  </div>
);

class RPCProvider extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.rpcConnection();
  }

  render() {
    return (
      <div>
        {this.props.web3 && this.props.children }
        {!this.props.web3 && <RPCConnectionError />}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RPCProvider);
