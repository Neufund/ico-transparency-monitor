import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { getNextICO } from '../utils';

export default ({ address }) =>
  (<Grid>
    <Row className="nav-buttons">
      <Col md={6} sm={6} xs={6}>
        <div className="back-list">
          <button
            onClick={() => { window.location = '/'; }}
            className="arrow-btn arrow-btn-left"
          >
            <span className="arrow arrow-left">&#8592;</span>
          </button>
          <a className="hide-xs" href="/">Go back to the list </a>
        </div>
      </Col>
      <Col md={6} sm={6} xs={6}>
        <div className="next-list">
          <a
            className="pointer-cursor hide-xs"
            onClick={() => {
              getNextICO(address);
            }}
          > Go to the next</a>

          <button
            onClick={() => {
              getNextICO(address);
            }}
            className="arrow-btn arrow-btn-right"
          ><span className="arrow">&#8594;</span></button>
        </div>
      </Col>
    </Row>
  </Grid>);
