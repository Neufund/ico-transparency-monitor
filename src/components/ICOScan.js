import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {formatNumber, getValueOrNotAvailable} from '../utils';
import {ICOScanHeader} from '../components/ICOScanHeader';

export const ICOScan = ({state, props , status}) => {
    return (<div>
            <ICOScanHeader {...props} {...state} />
            <Row>
                <div id="loadingProgressG" className={props.showLoader == true ? "show" : "hide"}>
                    <div id="loadingProgressG_1" className="loadingProgressG"></div>
                </div>

                <Col md={12}>
                    <Row>
                        <Col md={2} className="part">
                            <p className="title">Token Cap</p>
                            <strong className="desc">{getValueOrNotAvailable(state, 'cap')}</strong>
                        </Col>
                        <Col md={3} className="part">
                            <p className="title">Tokens Supply</p>
                            <strong className="desc">{formatNumber(parseFloat(state.totalSupply))}</strong>
                        </Col>
                        <Col md={2} className="part">
                            <p className="title">Token symbol</p>
                            <strong className="desc">{getValueOrNotAvailable(state, "symbol")}</strong>
                        </Col>
                        <Col md={3} className="part">
                            <p className="title">Duration</p>
                            <strong className="desc">{getValueOrNotAvailable(state, "startDate")}</strong>
                            <span className="separator">to</span>
                            <strong className="desc">{getValueOrNotAvailable(state, "endDate")}</strong>
                        </Col>
                        <Col md={2} className="part">
                            <div className="right">
                                <p className="title">Status</p>
                                <strong className="desc">{status}</strong>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};