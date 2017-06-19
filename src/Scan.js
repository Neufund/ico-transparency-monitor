import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ICO from './components/ICO';
import ScanBox from './components/ScanBox';
import ScanBoxDetails from './components/ScanBoxDetails';
import {default as config} from './config.js';
import {getEtherPerCurrency, getICOLogs, getStatistics} from './utils.js';
import {mapScanStatisticsToProps , mapStateToProps} from './reducers/redux-utils';
import { connect } from 'react-redux';


const Scan = ({match , ...props})=>{
    const icoName = match.params.name;
    const ico = config['ICOS'][icoName];
    let icoSummary = config['ICOS'][icoName]['summary'];
    icoSummary['name'] = icoName;
    icoSummary['matrix'] = ico['matrix'];

    return (
        <div className="App">
            <ICO key={icoName} ico={icoSummary}/>

            <ScanBox onClickScanHandler={ ()=>{
                props.showLoader();
                getICOLogs(icoName , (err, res)=>{

                    getEtherPerCurrency( (currencies)=>{
                        props.setCurrency('EUR' , currencies['rates']['EUR']);
                        const s = getStatistics(ico , res, props.stats , currencies['rates']['EUR']);
                        props.drawStatistics(s);
                        props.hideLoader();
                    })
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
