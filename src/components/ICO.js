import React,{Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {decisionMatrix} from '../utils'
import {constantValueOf,getSmartContractConstants} from '../utils/web3';
import { connect } from 'react-redux';
import {mapStateToProps, onModalDispatchToProp} from '../reducers/redux-utils';
import {default as config} from '../config.js';

class ICO extends Component{
    constructor(props){
        super(props);
        this.state = {cap:null,
            endDate:null,
            name:null,
            startDate:null,
            symbol:null,
            totalSupply:null
        }
    }

    componentWillMount(){
        if (typeof this.props.ico.name === "undefined") return;
        let constansPromises = null;
        try{
            constansPromises = getSmartContractConstants(this.props.ico.name);
        }catch (error){
            this.props.onErrorMessage(`Cant read smart Contract for ${this.props.ico.name} from RPC Host url ${config.rpcHost}.`);
            return;
        }

        Object.keys(constansPromises).map((constant)=>{
            const tempResult = {};
            constansPromises[constant].value.then(async (singlePromise)=> {
                tempResult[constant]= await constantValueOf(singlePromise, constansPromises[constant].type);
                this.setState(tempResult);
            }).catch((error)=>
                this.props.onErrorMessage(`Cant read smart Contract for ${this.props.ico.name} from RPC Host url ${config.rpcHost}.`))
        });
    }

    render(){
        return (
            <Row>
                <Grid>
                    <Row className="ico-box">

                        <Col md={3} className="name">
                            <Row>
                                <Col md={3} className="ico-logo">
                                    <img src={this.props.ico.logo} alt={this.props.ico.name}/>
                                </Col>
                                <Col md={8} className="ico-desc">

                                    <h4><a href={this.props.ico.name}> {this.state.name || this.props.ico.name}</a></h4>
                                    <p>
                                        {this.props.ico.shortDescription}
                                    </p>
                                </Col>
                            </Row>
                        </Col>


                        <Col md={9} className="ico-quick-stats">
                            <Row>

                                <Col md={2} className="part">
                                    <p className="title">Token Cap</p>
                                    <strong className="desc">{this.state.cap}</strong>
                                </Col>
                                <Col md={2} className="part">
                                    <p className="title">Tokens Supply</p>
                                    <strong className="desc">{this.state.totalSupply}</strong>
                                </Col>
                                <Col md={2} className="part">
                                    <p className="title">Token symbol</p>
                                    <strong className="desc">{this.state.symbol}</strong>
                                </Col>
                                <Col md={2} className="part">
                                    <p className="title">Duration</p>
                                    <strong className="desc">{this.state.startDate}</strong>
                                    <br/>
                                    <strong className="desc">{this.state.endDate}</strong>
                                </Col>
                                <Col md={4} className="part transparency">
                                    <p className="title">Added by Person</p>

                                    <button href={this.props.ico.name} className={"transparency-button "+ decisionMatrix(this.props.ico.matrix)[0].replace(/\s+/g, '-').toLowerCase() +"-status"}
                                            onClick={()=>{this.props.onModalShow(this.props.ico)}}>
                                        <p>Transparency</p>
                                        <strong> {decisionMatrix(this.props.ico.matrix)[0]} <span className="fa fa-arrow-right"></span> </strong>
                                    </button>
                                </Col>

                            </Row>

                        </Col>
                    </Row>

                    <Row>{this.state.cap == this.state.endDate?<p>No token cap and no end date for this ICO</p>:''}</Row>
                </Grid>

            </Row>
        );
    }
}

export default connect(
    mapStateToProps,
    onModalDispatchToProp
)(ICO);
