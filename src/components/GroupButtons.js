import React ,{Component} from 'react';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/GroupButtons.css';
import { connect } from 'react-redux';
import {mapScanStatisticsToProps} from '../reducers/redux-utils';
import {getEtherPerCurrency, prepareStatsInvestment, getDistributedDataFromDataset} from '../utils';

class CurrencyButton extends Component{
    constructor({ currencyValue, currency}){
        super();
        this.state = {
            currencyActiveClass : 'EUR',
            exchangeRateActiveClass :'NOW'
        };
    }

    //TODO : Have better design for this function
    onCurrencyClick(currency= null){
        let currencyFormat = `ETH-`; // ether exchange rate.
        let isBitcoin = false;
        if(currency)
            this.setState({'currencyActiveClass':currency});
        else
            currency = this.props.currency;

        if(currency === "BTC") {
            isBitcoin = true;
            currencyFormat = `BTC-${this.props.currency}`;
        }else if (currency === "ETH"){
            this.props.setCurrency(currency, 1);
            let currentStatistics = this.props.stats;
            currentStatistics.investors = prepareStatsInvestment(this.props.stats.investors.senders, 1);
            this.props.drawStatistics(currentStatistics);
            return;
        }else
            currencyFormat = `ETH-${currency}`; // ether exchange rate.

        getEtherPerCurrency((currencyValue , error)=>{
            if(error === null) {
                currencyValue = isBitcoin?this.props.currencyValue/currencyValue:currencyValue;
                this.props.setCurrency(currency, currencyValue);
                let currentStatistics = this.props.stats;
                currentStatistics.investors = prepareStatsInvestment(this.props.stats.investors.senders, currencyValue);
                currentStatistics.charts.invetorsDistribution = getDistributedDataFromDataset(currentStatistics.etherDataset,currencyValue)[0];
                currentStatistics.charts.investmentDistribution = getDistributedDataFromDataset(currentStatistics.etherDataset,currencyValue)[1];
                this.props.drawStatistics(currentStatistics);
            }
        }, currencyFormat , this.state.exchangeRateActiveClass === "NOW"?new Date().yyyymmdd():this.props.stats.time.endDate);
    }

    // TODO:Handle Bitcoin
    onDayofICOClick(exchangeRateDate = "NOW"){

        this.setState({exchangeRateActiveClass : exchangeRateDate});

        const currency = this.props.currency;
        const currencyFormat = `ETH-${currency}`; // ether exchange rate.
        const key = Math.random();

        const date = exchangeRateDate === "NOW"?new Date().yyyymmdd():this.props.stats.time.endDate;

        getEtherPerCurrency((currencyValue , error)=>{
            if(error === null) {

                // currencyValue = isBitcoin?this.props.currencyValue/currencyValue:currencyValue;
                this.props.setCurrency(currency, currencyValue);
                let currentStatistics = this.props.stats;
                currentStatistics.investors = prepareStatsInvestment(this.props.stats.investors.senders, currencyValue);
                this.props.drawStatistics(currentStatistics);
                console.log(key , currency, date);

            }
        }, currencyFormat , date);

    }

    render() {
        return (
            <Row className="group-buttons">
                <Col md={4}>
                    <div>
                        <p>Converted to:</p>
                        <ul className="currency-buttons">
                            <li><a className={this.state.currencyActiveClass === "EUR"?"active" : ""} onClick={()=>{this.onCurrencyClick('EUR')}}>EUR</a></li>
                            <li><a className={this.state.currencyActiveClass === "USD"?"active" : ""} onClick={()=>{this.onCurrencyClick('USD')}}>USD</a></li>
                            <li><a className={this.state.currencyActiveClass === "BTC"?"active" : ""} onClick={()=>{this.onCurrencyClick('BTC')}}>BTC</a></li>
                            <li><a className={this.state.currencyActiveClass === "ETH"?"active" : ""} onClick={()=>{this.onCurrencyClick('ETH')}}>ETH</a></li>
                        </ul>
                    </div>
                </Col>

                <Col md={4}>
                    <p>Exchange rate:</p>
                    <ul className="currency-buttons">
                        <li><a className={this.state.exchangeRateActiveClass === "ENDDAY"?"active":""} onClick={()=>{this.onDayofICOClick( "ENDDAY")}} >Day of ICO end</a></li>
                        <li><a className={this.state.exchangeRateActiveClass === "NOW"?"active":""} onClick={()=>{this.onDayofICOClick("NOW")}}>Current</a></li>
                    </ul>
                </Col>
                <Col md={4}>
                    <p>
                    <span>On: </span> <storng>ETH 1 / {this.props.currency} {this.props.currencyValue} </storng>
                    </p>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state => ({
        currency : state.scan.currency,
        currencyValue : state.scan.currencyValue ,
        stats: state.scan.stats
    }),
    mapScanStatisticsToProps
)(CurrencyButton)


