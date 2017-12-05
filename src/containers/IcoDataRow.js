import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getValueOrDefault } from '../utils';
import config from '../config';
import { onModalShow, showErrorMessage } from '../actions/ModalAction';
import { readSmartContract } from '../actions/web3';
import { resetRpc } from '../actions/ScanAction';
import { isConnected, isNeufundAddress } from '../utils/web3';

export class IcoDataRow extends Component {
  static getDecisionValue(decision) {
    switch (decision) {
      case 'transparent': return 'Transparent';
      case 'nontransparent': return 'Non Transparent';
      case 'withissues': return 'With issues';
      default: return null;
    }
  }

  constructor(props) {
    super(props);
    this.address = this.props.address;
  }

  componentDidMount() {
    this.props.readSmartContract(this.address);
  }

  render() {
    const { address, information, name, cap,
      startDate, endDate, status, addedBy,
      decision, onModalShowCallback } = this.props;

    const eventName = isNeufundAddress(address) ? 'ICBM' : 'ICO';

    return (
      <Row className="ico-container">
        <Grid>
          <Row className="ico-box" onClick={function redirect() { window.location = `/#/${address}`; }}>
            <Col lg={3} md={12} sm={12} xs={12} className="name no-right-gutter">
              <Row className="ico-box-container">
                <Col lg={12} md={12} sm={12} xs={12} className="no-right-gutter">
                  <div className="clearfix">
                    <div className="ico-logo">
                      <img src={information.logo} alt="" />
                    </div>
                    <div className="ico-information">
                      <h4><a href={`/#/${address}`}>{information.name}</a></h4>
                      <div className="link">
                        <span><i className="fa fa-external-link" aria-hidden="true" /></span>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={information.website}
                          onClick={e => e.stopPropagation()}
                        >{eventName} Page</a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={9} md={12} sm={12} xs={12} className="ico-quick-stats">
              <Row className="main-page-ico-parameters">
                <Col lg={3} sm={6} md={6} xs={12} className="part" data-test-id="ico-app-cap">
                  <p className="title">Declared Cap</p>
                  {cap && typeof cap === 'object' && getValueOrDefault(cap).map(item => (<strong
                    key={item}
                    className="desc"
                  >{item}</strong>))}
                  {cap && typeof cap === 'string' && <strong className="desc">{getValueOrDefault(cap)}</strong>}
                  {!cap && <strong>not provided</strong>}
                </Col>
                <Col lg={3} sm={6} md={6} xs={12} className="part">
                  <p className="title">Declared Duration</p>
                  <strong className="desc">{getValueOrDefault(startDate)}</strong>
                  <strong className="desc">{getValueOrDefault(endDate)}</strong>
                </Col>
                <Col lg={2} sm={6} md={6} xs={12} className="part">
                  <p className="title title-status">Status</p>
                  <strong className={'desc'}>{getValueOrDefault(status)}</strong>
                </Col>
                <Col lg={4} sm={6} md={6} xs={12} className="part transparency">
                  <p className="title added-by-person">Added by <b>{addedBy || 'Person'}</b></p>
                  <button
                    href={name}
                    className={`btn-gray btn-see-score ${getValueOrDefault(decision)}-status-bottom`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onModalShowCallback(this.props);
                    }}
                  >
                    <p><strong>{IcoDataRow.getDecisionValue(decision)}</strong> see more</p>
                  </button>

                  <button
                    href={name}
                    className="btn-blue btn-see-stats"
                  >
                    <p><strong>ICO Statistics</strong> see more</p>
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Row>
    );
  }
}


const mapStateToProps = (state, props) => ({
  ...state.ICO.icos[props.address],
  ...config.ICOs[props.address],
});

const mapDispatchToProps = (dispatch, state) => ({
  onModalShowCallback: (currentICO) => {
    if (isConnected()) {
      dispatch(onModalShow(currentICO));
    } else {
      dispatch(resetRpc());
      dispatch(showErrorMessage(`Trying to connect to rpc node ${config.rpcHost} received an invalid response.`));
    }
  },
  readSmartContract: (address) => {
    dispatch(readSmartContract(address));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IcoDataRow);
