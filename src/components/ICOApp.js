import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {formatNumber, getValueOrNotAvailable} from '../utils';


export const ICOApp = ({props , state}) => {
    return (
        <Row>
            <Grid>
                <Row className="ico-box">
                    <Col lg={3} md={4} className="name">
                        <Row>
                            <Col lg={3} xs={2} className="ico-logo">
                                <img src={props.ico.information.logo} alt={props.ico.name}/>
                            </Col>
                            <Col lg={8} xs={9}className="ico-desc">

                                <h4><a href={props.ico.address}> {state.name || props.ico.information.aliasName}</a></h4>
                                <p>PUT LINK TO PROJECT WEB PAGE!!!!</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={9} md={8} className="ico-quick-stats">
                        <Row>

                            <Col lg={3} xs={6} className="part">
                                <p className="title">Declared Cap</p>
                                <strong className="desc">{getValueOrNotAvailable(state, 'cap')}</strong>
                            </Col>
                            <Col lg={3}  xs={6} className="part">
                                <p className="title">Tokens Supply</p>
                                <strong className="desc">{formatNumber(parseFloat(state.totalSupply))}</strong>
                            </Col>
                            <Col lg={3}  xs={6} className="part">
                                <p className="title">Declared Duration</p>
                                <strong className="desc">{getValueOrNotAvailable(state,"startDate")}</strong>
                                <br/>
                                <strong className="desc">{getValueOrNotAvailable(state,"endDate")}</strong>
                            </Col>
                            <Col lg={3}  xs={12} className="part transparency">
                                <p className="title">Added by Person</p>

                                <button href={props.ico.name}
                                        className={"transparency-button " + state.decision.replace(/\s+/g, '-').toLowerCase() + "-status"}
                                        onClick={() => {
                                            props.onModalShow(props.ico)
                                        }}>
                                    <p>Transparency</p>
                                    <strong> {state.decision} <i className="fa fa-arrow-right"/>
                                    </strong>
                                </button>
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Grid>
        </Row>
    );
};