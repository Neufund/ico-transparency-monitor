import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ScanBox.css';


const ScanBox = ({onClickScanHandler,  icoName}) => (
    <Grid className="scanbox">
        <Row >
            <Col md={12} className="scan-content">

                <h3 className="scan-ico-for-detaile">Scan ICO for details statistics</h3>
                <Row>
                    <Col md={9}>
                        <select className="select-ico">
                            <option>Golem</option>
                            <option>Meano</option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <button className="scan-button" onClick={onClickScanHandler}>Scan</button>
                    </Col>
                </Row>

            </Col>
        </Row>
    </Grid>
);

export default ScanBox;

