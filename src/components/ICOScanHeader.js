import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { icoTransparencyMap } from '../utils';

export const ICOScanHeader = ({ ...props }) => (
  <Row>
    <Grid className="ico-scan-header">
      <Row>
        <Col lg={6} sm={12} md={12} xs={12} className="name">
          <Row className="ico-box-container">
            <Col lg={12}>
              <div className="clearfix">
                <div className="ico-logo">
                  <img src={props.information.logo} alt={props.address} />
                </div>
                <div className="ico-information">
                  <h4><a href={`/#/${props.address}`}> {props.name || props.information.aliasName}</a></h4>
                  <a className="link" rel="noopener noreferrer" target="_blank" href={props.information.website} >{props.information.website}</a>
                  <a className="link" rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/address/${props.address}`} >View ICO contract on etherscan</a>
                  {props.tokenContract && <a className="link" rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/token/${props.tokenContract}`} >View token contract on etherscan</a>}
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Row>
            <Col lg={5} md={1} sm={1} xs={1} />
            <Col lg={7} md={11} sm={11} xs={11} className="part transparency">
              {props.addedBy && <p className="title added-by-person">Added by <b>{props.addedBy}</b></p>}
              <button
                className={`transparency-button ${props.decision ? props.decision.replace(/\s+/g, '-').toLowerCase() : ''}-status`}
                onClick={() => {
                  props.onModalShow(props);
                }}
              >
                <p>Transparency</p>
                <strong>{props.decision ? icoTransparencyMap[props.decision.toUpperCase()] : ''} </strong>
                <span className="arrow">&#8594;</span>
              </button>
            </Col>
          </Row>

        </Col>
      </Row>
    </Grid>
  </Row>
    );
