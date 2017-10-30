import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getValueOrDefault, icoTransparencyMap } from '../utils';
import { connect } from 'react-redux';
import { default as config } from '../config.js';

const extractHostnameFromUrl = url => url.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '').replace('/', '');

export const ICOApp = (props) => {
  const { address, information, name, cap, startDate, endDate, status, addedBy, decision, onModalShow } = props;
  return (
    <Row className="ico-container">
      <Grid>
        <Row className="ico-box" onClick={() => window.location = `/#/${address}`}>
          <Col lg={3} md={12} sm={12} xs={12} className="name">
            <Row className="ico-box-container">
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="clearfix">
                  <div className="ico-logo">
                    <img src={information.logo} alt="" />
                  </div>
                  <div className="ico-information">
                    <h4><a href={`/#/${address}`}>{ name || information.aliasName }</a></h4>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={information.website}
                    >{extractHostnameFromUrl(information.website)}</a>
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
                  className={`transparency-button ${getValueOrDefault(decision)}-status-bottom`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(name);
                    onModalShow(props);
                  }}
                >
                  <p>See more on the score</p>
                  <strong> {icoTransparencyMap[getValueOrDefault(decision).toUpperCase()]}
                  </strong>
                  <span className="arrow">&#8594;</span>
                </button>
              </Col>


            </Row>
          </Col>
        </Row>
      </Grid>
    </Row>
  );
};

const mapStateToProps = (state, props) => ({
  ...state.ICO.icos[props.address],
  ...config.ICOs[props.address],
});

export default connect(
  mapStateToProps,
  null
)(ICOApp);
