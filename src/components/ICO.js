import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {decisionMatrix} from '../utils'
import { connect } from 'react-redux';
import {mapStateToProps, onModalDispatchToProp} from '../reducers/redux-utils';



const ICO = ({...props}) => {
        // const { value, onModalShow } = props;
        return (
        <Row>
            <Grid>
                <Row className="ico-box">

                    <Col md={3} className="name">
                        <Row>
                            <Col md={4} className="ico-logo">
                                <img src={props.ico.logo} alt={props.ico.name}/>
                            </Col>
                            <Col md={8} className="ico-desc">

                                <h4><a href={props.ico.name}> {props.ico.name}</a></h4>
                                <p>
                                    {props.ico.shortDescription}
                                </p>
                            </Col>
                        </Row>
                    </Col>


                    <Col md={9} className="ico-quick-stats">
                        <Row>

                            <Col md={3} className="part">
                                <p className="title">ICO result</p>
                                <strong className="desc">123 000,000 ETH</strong>
                            </Col>
                            <Col md={3} className="part">
                                <p className="title">Tokens issued</p>
                                <strong className="desc">{props.ico.tokens}</strong>
                            </Col>
                            <Col md={2} className="part">
                                <p className="title">Duration</p>
                                <strong className="desc">S</strong>
                                <br/>
                                <strong className="desc">E</strong>
                            </Col>
                            <Col md={4} className="part transparency">
                                <p className="title">Added by Person</p>

                                <button href={props.ico.name} className={"transparency-button "+ decisionMatrix(props.ico.matrix)[0].replace(/\s+/g, '-').toLowerCase() +"-status"}
                                        onClick={()=>{props.onModalShow(props.ico)}}>
                                    <p>Transparency</p>
                                    <strong> {decisionMatrix(props.ico.matrix)[0]} <span className="fa fa-arrow-right">-></span> </strong>
                                </button>
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Grid>

        </Row>
        )

}

export default connect(
    mapStateToProps,
    onModalDispatchToProp
)(ICO);
