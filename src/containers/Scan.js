import React from 'react';
import '../assets/css/App.css';
import ICO from '../components/ICO';
import ScanBox from '../components/ScanBox';
import ScanBoxDetails from '../components/ScanBoxDetails';
import {default as config} from '../config.js';
import {getEtherPerCurrency, getICOLogs, getStatistics ,initStatistics} from '../utils.js';
import {drawStatistics,hideLoader,showLoader,setCurrency} from '../actions/ScanAction';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Scan = ({match , ...props})=>{
    const icoName = match.params.name;
    const ico = config['ICOS'][icoName];
    let icoSummary = config['ICOS'][icoName]['summary'];
    icoSummary['name'] = icoName;
    icoSummary['matrix'] = ico['matrix'];
    icoSummary['shortDescription'] = ico['description'];

    return (
        <div className="App">
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <div className="nav-buttons">
                            <div className="back-list">
                                <i className="fa fa-arrow-left" />
                                <a href="/" >Go back to the list</a></div>
                            <div className="next-list">

                                <a href="/" >Go back to the list</a>
                                <i className="fa fa-arrow-right"/>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Grid>
            <ICO key={icoName} ico={icoSummary} inner={false}/>
            <Grid className="scanbox ico-box-scan" >
                <ICO key={icoName} ico={icoSummary} inner={true}/>

                <ScanBox ico={icoSummary} onClickScanHandler={ ()=>{
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
                <ScanBoxDetails hasTokenPrice={icoSummary['matrix'][5].answer}/>
            </Grid>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        stats: state.scan.stats
    }
};

const mapDispatchToProps= (dispatch) => {
    return {
        drawStatistics: (statistics) => {
            dispatch(drawStatistics(statistics));
        },
        setCurrency : (currency, value) => {
            dispatch(setCurrency(currency,value));
        },
            showLoader : () => {
            dispatch(showLoader())
        },
            hideLoader : () => {
            dispatch(hideLoader())
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scan)
