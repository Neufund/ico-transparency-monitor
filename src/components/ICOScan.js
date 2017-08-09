import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { formatNumber, getValueOrDefault, trimString } from '../utils';
import { ICOScanHeader } from '../components/ICOScanHeader';
import { connect } from 'react-redux';
import { default as config } from '../config.js';

export const ICOScan = (props) => {
  const { isLoading, totalSupply, web3, showLoader, symbol, cap, startDate, endDate, status } = props;

  return (<div>
    <ICOScanHeader {...props} />
    <Row>
      <div id="loadingProgressG" className={isLoading === true ? 'show' : 'hide'}>
        <div id="loadingProgressG_1" className="loadingProgressG" />
      </div>

      {!showLoader && web3 && <Col md={12}>
        <Row className="scanbox-details-parameters">
          <Col lg={3} md={12} sm={12} xs={12} className="part">
            <p className="title">Declared Cap</p>
            {cap && typeof cap === 'object' && getValueOrDefault(cap).map(item => (<strong
              key={item}
              className="desc"
            >{item}</strong>))}
            {cap && typeof cap === 'string' &&
              <strong className="desc">{getValueOrDefault(cap)}</strong>}
          </Col>
          <Col lg={2} md={12} sm={12} xs={12} className="part">
            <p className="title">Tokens Supply</p>
            <strong className="desc">{formatNumber(parseFloat(totalSupply))}</strong>
          </Col>
          <Col lg={2} md={12} sm={12} xs={12} className="part">
            <p className="title">Token symbol</p>
            <strong className="desc">{getValueOrDefault(symbol)}</strong>
          </Col>
          <Col lg={3} md={12} sm={12} xs={12} className="part">
            <p className="title">Declared Duration</p>
            <strong className="desc">{getValueOrDefault(startDate)} <span
              className="font-light"
            >to</span> {getValueOrDefault(endDate)} </strong>
          </Col>
          <Col lg={2} md={12} sm={12} xs={12} className="part part-status">
            <div className="right">
              <p className="title title-status">Status</p>
              <strong
                className={'desc'}
              >{getValueOrDefault(status)}</strong>
            </div>
          </Col>
        </Row>
      </Col>}
    </Row>
  </div>
  );
};

const mapStateToProps = (state, props) => ({
  ...state.ICO.icos[props.address],
  ...config.ICOs[props.address],
  isLoading: state.scan.showLoader,
  web3: state.modal.web3,
});
export default connect(
  mapStateToProps,
  null
)(ICOScan);
