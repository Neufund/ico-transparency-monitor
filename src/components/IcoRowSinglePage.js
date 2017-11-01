import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { formatNumber, getValueOrDefault } from '../utils';

export default (props) => {
  const { isLoading, totalSupply, symbol, cap, startDate, endDate, status } = props;

  return (<div>
    <Row>
      <div id="loadingProgressG" className={isLoading === true ? 'show' : 'hide'}>
        <div id="loadingProgressG_1" className="loadingProgressG" />
      </div>

      {!isLoading && <Col md={12}>
        <Row className="scanbox-details-parameters">
          <Col lg={3} md={12} sm={12} xs={12} className="part">
            <p className="title">Declared Cap</p>
            {cap && typeof cap === 'object' && getValueOrDefault(cap).map(item => (<strong
              key={item}
              className="desc"
            >{item}</strong>))}
            {cap && typeof cap === 'string' &&
              <strong className="desc">{getValueOrDefault(cap)}</strong>}
            {!cap && <strong>not provided</strong>}
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
