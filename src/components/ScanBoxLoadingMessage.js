import React from 'react';
import {Row, Col } from 'react-flexbox-grid';
import '../assets/css/ScanBox.css';

const ScanBoxLoadingMessage = ({show}) => (
    <Row className={show === true?"show":"hide"}>
        <Col md={12} className="scan-message-loading">
            <div className="alarm">
                <p>ICO Scanning inprocess, please wait ...</p>
            </div>
        </Col>
    </Row>
);

export default ScanBoxLoadingMessage;