import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export const ICOScanHeader = ({ ...props }) => (
  <Row>
    <Grid className="ico-scan-header">
      <Row>
        <Col md={6} className="name">
          <Row>
            <Col md={2} className="ico-logo">
              <img src={props.information.logo} alt={props.address} />
            </Col>
            <Col md={8} className="ico-desc">
              <h4><a href="#"> {props.name || props.information.aliasName }</a></h4>
              <a target="_blank" href={props.information.website}>{props.information.website}</a>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <Col md={7} />
            <Col md={5} className="part transparency">
              <p className="title">Added by Person</p>

              <button
                className={`transparency-button ${props.decision ? props.decision.replace(/\s+/g, '-').toLowerCase() : ''}-status`}
                onClick={() => {
                  props.onModalShow(props);
                }}
              >
                <p>Transparency</p>
                <strong> {props.decision} <i className="fa fa-arrow-right" /></strong>
              </button>
            </Col>
          </Row>

        </Col>
      </Row>
    </Grid>
  </Row>
    );
