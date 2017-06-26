import React from 'react';
import './App.css';
import ICO from './ICO';
import ScanBox from './ScanBox';
import ScanBoxDetails from './ScanBoxDetails';
import {default as config} from '../config.js';
import {getEtherPerCurrency, getICOLogs, getStatistics ,initStatistics} from '../utils.js';
import {mapScanStatisticsToProps} from '../reducers/redux-utils';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Scan = ({match , ...props})=>{
    const icoName = match.params.name;
    const ico = config['ICOS'][icoName];
    let icoSummary = config['ICOS'][icoName]['summary'];
    icoSummary['name'] = icoName;
    icoSummary['matrix'] = ico['matrix'];
    icoSummary['shortDescription'] = ico['shortDescription'];

    return (
        <div className="App">
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <div className="nav-buttons">
                            <div className="back-list">
                                <i className="fa fa-arrow-left"></i>
                                <a href="/" >Go back to the list</a></div>
                            <div className="next-list">

                                <a href="/" >Go back to the list</a>
                                <i className="fa fa-arrow-right"></i>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Grid>
            <ICO key={icoName} ico={icoSummary}/>

            <ScanBox onClickScanHandler={ ()=>{
                props.showLoader();
                getICOLogs(icoName , (err, res)=>{
                    getEtherPerCurrency( (currency, error)=>{

                        props.hideLoader();
                        if (res.length === 0 || err !== null){
                            return false;
                        }
                        props.setCurrency('EUR' , currency);
                        const s = getStatistics(ico , res, initStatistics() , currency);
                        props.drawStatistics(s);
                    });
                });
            }}/>

            <ScanBoxDetails />

        </div>
    );
};

export default connect(
    state => ({
        stats: state.scan.stats
    }),
    mapScanStatisticsToProps
)(Scan)
