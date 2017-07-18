import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { formatNumber, getValueOrNotAvailable } from '../utils';
import { ICOScanHeader } from '../components/ICOScanHeader';
import { connect } from 'react-redux';
import { default as config } from '../config.js';

const ICOScan = ({ ...props }) => (<div>
  <ICOScanHeader {...props} />
  <Row>
    <div id="loadingProgressG" className={props.showLoader === true ? 'show' : 'hide'}>
      <div id="loadingProgressG_1" className="loadingProgressG" />
    </div>
    {!props.showLoader && <Col md={12}>
      <Row>
        <Col md={2} className="part">
          <p className="title">Declared Cap</p>
          <strong className="desc">{getValueOrNotAvailable(props, 'cap')}</strong>
        </Col>
        <Col md={3} className="part">
          <p className="title">Tokens Supply</p>
          <strong className="desc">{formatNumber(parseFloat(props.totalSupply))}</strong>
        </Col>
        <Col md={2} className="part">
          <p className="title">Token symbol</p>
          <strong className="desc">{getValueOrNotAvailable(props, 'symbol')}</strong>
        </Col>
        <Col md={3} className="part">
          <p className="title">Declared Duration</p>
          <strong className="desc">{getValueOrNotAvailable(props, 'startDate')}</strong>
          <span className="separator">to</span>
          <strong className="desc">{getValueOrNotAvailable(props, 'endDate')}</strong>
        </Col>
        <Col md={2} className="part">
          <div className="right">
            <p className="title">Status</p>
            <strong className="desc">{getValueOrNotAvailable(props, 'status')}</strong>
          </div>
        </Col>
      </Row>
    </Col>}
  </Row>
</div>
    );


const mapStateToProps = (state, props) => ({
  ...state.ICO.icos[props.address],
  ...config.ICOs[props.address],
  showLoader: state.scan.showLoader,
});
export default connect(
    mapStateToProps,
    null
)(ICOScan);
