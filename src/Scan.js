import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ICO from './components/ICO';
import TopHeader from './components/TopHeader';
import ScanBox from './components/ScanBox';
import ScanBoxDetails from './components/ScanBoxDetails';
import {default as config} from './config.js';

import {formateDate, getICOLogs, getStatistics} from './utils.js';

class Scan extends Component {

    constructor ({match}){
        super();
        const icoName = match.params.name;
        this.ico = config['ICOS'][icoName]['summary'];
        this.ico.name = icoName;
        console.log(`Start scanning ${icoName}.`);
        this.state = {
            statistics : this.myStates(),
            ico : this.ico
        };

        this.onClickScanHandler = this.onClickScanHandler.bind(this);
    }
    myStates = () => {
        return {
            general: {
                transactionsCount: 20
            },
            time: {
                startDate: null,
                endDate: null
            },
            investors: {
                numberInvestorsMoreThanOne100kEuro: 0,
                numberInvestorsBetween5to100kEruo: 0,
                numberInvestorsLessThan500K: 0,
                numberInvestorsWhoInvestedMoreThanOnce: 0,
                maxInvestmentsMoney: 0,
                maxInvestmentsTokens: 0,
                minInvestments: 999999999999,
                senders: {}
            },
            money: {
                tokenIssued: 0,
                totalETH: 0,
            },
            charts:{
                tokensCount: null ,
                tokensAmount: null ,
                invetorsDistribution:null
            }
        };
    };
    onClickScanHandler = ()=> {
        getICOLogs(this.state.ico.name,(error , events)=>{
            const stats= getStatistics(config['ICOS'][this.state.ico.name], events , this.state.statistics, {'value':300});
            this.setState({statistics : stats});

        });
    };


    render() {
        return (
            <div className="App">
                <TopHeader logo={logo}/>

                <ICO key={Math.random()} logo={this.ico.logo} name={this.ico.name} shortDescription ={this.ico.description} ethers={this.ico.totalEthers}
                     tokens={this.ico.issuedTokens}
                     startDate ={formateDate(this.ico.startDate)} endDate ={formateDate(this.ico.endDate)}
                     transparency={this.ico.transparency}
                />
                <ScanBox onClickScanHandler={this.onClickScanHandler}/>
                {this.state.statistics.charts.tokensCount != null &&
                <ScanBoxDetails statistics={this.state.statistics}/>
                }
            </div>
        );
    }
}

export default Scan;
