import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import logo from '../assets/NeuFund_icon_white_300dpi.png';

const TopHeader = () => (

  <div className="top-header">
    <Grid>
      <Row className="App-header">
        <a href="/" className="App-logo" > <img src={logo} alt="logo" /></a>
        <Col md={12} >
          <h4 className="App-name">ICO Transparency Monitor</h4>
          <span className="powerd-by-neufund ">Powered by <a href="https://neufund.org" target="_blank" rel="noopener noreferrer">Neufund</a> </span>
          <div className="pull-right">
            <a
              href="https://github.com/Neufund/ico-transparency-monitor#adding-custom-icos-to-the-transparency-monitor"
              target="_blank"
              className="btn-blue"
              rel="noopener noreferrer"
            >
              Submit an ICO
            </a>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default TopHeader;
