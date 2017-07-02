import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {formatNumber, getValueOrNotAvailable} from '../utils';


export const ICOApp = ({props , state}) => {
    return (
        <Row>
            <Grid>
                <Row className="ico-box">

                    <Col md={3} className="name">
                        <Row>
                            <Col md={3} className="ico-logo">
                                <img src={props.ico.information.logo} alt={props.ico.name}/>
                            </Col>
                            <Col md={8} className="ico-desc">

                                <h4><a href={props.ico.address}> {state.name || props.ico.information.aliasName}</a></h4>
                                <p>{props.ico.information.description}</p>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={9} className="ico-quick-stats">
                        <Row>

                            <Col md={3} className="part">
                                <p className="title">Token Cap</p>
                                <strong className="desc">{getValueOrNotAvailable(state, 'cap')}</strong>
                            </Col>
                            <Col md={3} className="part">
                                <p className="title">Tokens Supply</p>
                                <strong className="desc">{formatNumber(parseFloat(state.totalSupply))}</strong>
                            </Col>
                            <Col md={3} className="part">
                                <p className="title">Duration</p>
                                <strong className="desc">{getValueOrNotAvailable(state,"startDate")}</strong>
                                <br/>
                                <strong className="desc">{getValueOrNotAvailable(state,"endDate")}</strong>
                            </Col>
                            <Col md={3} className="part transparency">
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
                    {/*{state.cap === state.endDate ?*/}
                    {/*<p>No token cap and no end date for this ICO</p> : ''}*/}

                </Row>
            </Grid>
        </Row>
    );
};