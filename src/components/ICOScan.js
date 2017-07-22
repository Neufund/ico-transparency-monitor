import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { formatNumber, getValueOrNotAvailable } from '../utils';
import { ICOScanHeader } from '../components/ICOScanHeader';
import { connect } from 'react-redux';
import { default as config } from '../config.js';

const ICOScan = ({ ...props }) => (<div>
  <ICOScanHeader {...props} />
  <Row>
    <div id="loadingProgressG" className={props.isLoading === true ? 'show' : 'hide'}>
      <div id="loadingProgressG_1" className="loadingProgressG" />
    </div>
    {!props.showLoader && props.web3 && <Col md={12}>
      <Row className="scanbox-details-parameters">
        <Col md={2} className="part">
          <p className="title">Declared Cap</p>
          {props.cap && typeof props.cap === 'object' && getValueOrNotAvailable(props, 'cap').map(item => <strong key={item} className="desc">{item}</strong>)}
          {props.cap && typeof props.cap === 'string' && <strong className="desc">{getValueOrNotAvailable(props, 'cap')}</strong>}
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
          <strong className="desc">{getValueOrNotAvailable(props, 'startDate')} <span className="font-light">to</span> {getValueOrNotAvailable(props, 'endDate')} </strong>
        </Col>
        <Col md={2} className="part part-status">
          <div className="right">
            <p className="title title-status">Status</p>
            <strong className={`desc ${props.decision ? props.decision.replace(/\s+/g, '-').toLowerCase() : ''}-alert`}>{getValueOrNotAvailable(props, 'status')}</strong>
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
  isLoading: state.scan.showLoader,
  web3: state.modal.web3,
});
export default connect(
    mapStateToProps,
    null
)(ICOScan);
