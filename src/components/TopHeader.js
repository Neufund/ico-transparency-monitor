import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import logo from '../logo.svg';

const TopHeader = () => (
<Grid fluid className="App-header">
    <Row >
        <Col md={12} >
            <a href="/"> <img src={logo} className="App-logo" alt="logo" /></a>
            <h4 className="App-name">ICO Transparency Monitor</h4>
            <span className="powerd-by-neufund ">Powered by Neufund</span>
        </Col>
    </Row>
</Grid>
);

export default TopHeader;