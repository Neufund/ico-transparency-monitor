import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import '../assets/css/ScanBox.css';
import {decisionMatrix, formatNumber, getValueOrNotAvailable} from '../utils';


const ScanBox = ({onClickScanHandler,  icoName}) => (

        <Row >
            <Col md={12} className="scan-content">

                <h3 className="scan-ico-for-detaile">Scan ICO for details statistics</h3>
                <button onClick={onClickScanHandler}>Scan</button>
            </Col>
        </Row>

);

export default ScanBox;

