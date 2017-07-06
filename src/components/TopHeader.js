import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import logo from '../assets/NeuFund_icon_white_300dpi.png';

const TopHeader = () => (

<div>
    <a href="/"  className="App-logo" > <img src={logo} alt="logo" /></a>
    <Grid>
        <Row className="App-header">
            <Col md={12} >
                <h4 className="App-name">ICO Transparency Monitor</h4>
                <span className="powerd-by-neufund ">Powered by Neufund</span>
            </Col>
        </Row>
    </Grid>
</div>
);

export default TopHeader;