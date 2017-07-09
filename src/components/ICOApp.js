import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {formatNumber, getValueOrNotAvailable} from '../utils';
import {connect} from 'react-redux';
import {default as config} from '../config.js';

const ICOApp = ({...props}) => {
    return (
        <Row>
            <Grid>
                <Row className="ico-box">
                    <Col lg={3} md={4} className="name">
                        <Row>
                            <Col lg={3} xs={2} className="ico-logo">
                                <img src={props.information.logo} alt={props.address}/>
                            </Col>
                            <Col lg={8} xs={9}className="ico-desc">
                                <h4><a href={props.address}> {props.name || props.information.aliasName}</a></h4>
                                <p>{props.information.description}</p>
                                <p>PUT LINK TO PROJECT WEB PAGE!!!!</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={9} md={8} className="ico-quick-stats">
                        <Row>

                            <Col lg={3} xs={6} className="part">
                                <p className="title">Declared Cap</p>
                                <strong className="desc">{getValueOrNotAvailable(props, 'cap')}</strong>
                            </Col>
                            <Col lg={3}  xs={6} className="part">
                                <p className="title">Tokens Supply</p>
                                <strong className="desc">{formatNumber(parseFloat(props.totalSupply))}</strong>
                            </Col>
                            <Col lg={3}  xs={6} className="part">
                                <p className="title">Declared Duration</p>
                                <strong className="desc">{getValueOrNotAvailable(props,"startDate")}</strong>
                                <br/>
                                <strong className="desc">{getValueOrNotAvailable(props,"endDate")}</strong>
                            </Col>
                            <Col lg={3}  xs={12} className="part transparency">
                                <p className="title">Added by Person</p>

                                <button href={props.name}
                                        className={"transparency-button " + getValueOrNotAvailable(props,'decision').replace(/\s+/g, '-').toLowerCase() + "-status"}
                                        onClick={() => {
                                            props.onModalShow(props)
                                        }}>
                                    <p>Transparency</p>
                                    <strong> {getValueOrNotAvailable(props,'decision')} <i className="fa fa-arrow-right"/>
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

const mapStateToProps = (state , props) => {
    return {
        ...state.ICO.icos[props.address],
        ...config.ICOs[props.address]
    }
};
export default connect(
    mapStateToProps,
    null
)(ICOApp);
