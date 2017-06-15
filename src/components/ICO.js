import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

import {Modal,Button} from 'react-bootstrap';
import TransparancyTable from './TransparancyTable';

const ICO = ({logo , name , shortDescription , ethers, tokens, startDate, endDate , transparency}) => (
    <Row>
        <Grid>
            <Row className="ico-box">

                <Col md={3} className="name">
                    <Row>
                        <Col md={4} className="ico-logo">
                            <img src={logo} alt={name}/>
                        </Col>
                        <Col md={8} className="ico-desc">

                            <h4>{name}</h4>
                            <p>
                                {shortDescription}
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
                            <strong className="desc">{tokens}</strong>
                        </Col>
                        <Col md={2} className="part">
                            <p className="title">Duration</p>
                            <strong className="desc">{startDate}</strong>
                            <br/>
                            <strong className="desc">{endDate}</strong>
                        </Col>
                        <Col md={4} className="part transparency">
                            <p className="title">Added by Person</p>
                            <button href={name} className={"transparency-button "+ transparency+"-status"}>
                                <p>Transparency</p>
                                <strong> Not Transparent <span className="fa fa-arrow-right"></span> </strong>
                            </button>
                        </Col>

                    </Row>

                </Col>
            </Row>
        </Grid>

        <Modal show={this.state.showModal} onHide={()=>{}}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}><h1>{name} transparency score</h1></Col>
                    <Col md={6}>

                        <button href={name} className={"transparency-button "+ transparency+"-status"}>
                            <p>Transparency</p>
                            <strong> Not Transparent <span className="fa fa-arrow-right"></span> </strong>
                        </button>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <TransparancyTable/>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
        </Modal>


    </Row>
);
export default ICO