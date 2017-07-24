import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { icoTransparencyLevel } from '../utils';
export const ICOScanHeader = ({ ...props }) => (
  <Row>
    <Grid className="ico-scan-header">
      <Row>
        <Col lg={6} sm={6} md={6} xs={6} className="name">
          <Row className="ico-box-container">
            <Col lg={12}>
              <div className="clearfix">
                <div className="ico-logo">
                  <img src={props.information.logo} alt={props.address} />
                </div>
                <div className="ico-information">
                  <h4><a href={`/#/${props.address}`}> {props.name || props.information.aliasName}</a></h4>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={props.information.website}
                  >{props.information.website}</a>
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col md={6} sm={6} xs={6}>
          <Row>
            <Col lg={5} md={1} sm={1} xs={1} />
            <Col lg={7} md={11} sm={11} xs={11} className="part transparency">
              <p className="title added-by-person">Added by Person</p>

              <button
                className={`transparency-button ${props.decision ? props.decision.replace(/\s+/g, '-').toLowerCase() : ''}-status`}
                onClick={() => {
                  props.onModalShow(props);
                }}
              >
                <p>Transparency</p>
                <strong>{props.decision ? icoTransparencyLevel[props.decision.toUpperCase()] : ''} </strong>
                <span className="arrow">&#8594;</span>
              </button>
            </Col>
          </Row>

        </Col>
      </Row>
    </Grid>
  </Row>
    );
