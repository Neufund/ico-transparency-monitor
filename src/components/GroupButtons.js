import React ,{Component} from 'react';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/GroupButtons.css';
import { connect } from 'react-redux';
import {setCurrency} from '../actions/CurrencyAction'
import {prepareStatsInvestment,getDistributedDataFromDataset} from '../utils.js';

class CurrencyButton extends Component{
    constructor(){
        super();
        this.state = {
            currencyActiveClass : 'EUR',
            exchangeRateActiveClass :'NOW'
        };
    }

    onCurrencyHandle(currency , time) {
        console.log(currency , time);

        if (currency === "default")
            currency = this.props.currency;
        else
            this.setState({currencyActiveClass:currency});

        if(time)
            this.setState({exchangeRateActiveClass:time});
        else
            time = this.state.exchangeRateActiveClass;

        this.props.setCurrency(currency , time , ()=>{
            let currentStatistics = this.props.stats;
            currentStatistics.investors = prepareStatsInvestment(this.props.stats.investors.senders, this.props.currencyValue);

            const distribution = getDistributedDataFromDataset(currentStatistics.etherDataset , this.props.currencyValue);
            currentStatistics.charts.invetorsDistribution = distribution[0];
            currentStatistics.charts.investmentDistribution = distribution[1];

            this.props.drawStatistics(currentStatistics);
        });
    }
    render() {
        return (
            <div>
                <Row className="group-buttons">
                    <Col md={8}>
                        <div>
                            <p>Converted to:</p>
                            <ul className="currency-buttons">
                                {['EUR', 'USD','BTC','ETH'].map((item)=><li key={item}><a className={this.state.currencyActiveClass === item?"active" : ""} onClick={()=>{this.onCurrencyHandle(item)}}>{item}</a></li>)}
                            </ul>
                        </div>
                    </Col>
                    <Col md={4}>
                        <p>
                        <span>On: </span> <storng>ETH 1 / {this.props.currency} {this.props.currencyValue} </storng>
                        </p>
                    </Col>
                </Row>
                <Row className="group-buttons">
                    <Col md={12}>
                        <p>Exchange rate:</p>
                        <ul className="currency-buttons">
                            {['NOW', this.props.stats.time.endDate].map((item)=>
                                <li key={item}><a className={this.state.exchangeRateActiveClass === item?"active" : ""} onClick={()=>{this.onCurrencyHandle("default",item)}}>{item}</a></li>)
                            }
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        currency : state.currency.currency,
        currencyValue : state.currency.value,
        currencyTime : state.currency.time,
        stats: state.scan.stats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrency : ( (currency , time , callback)=> setCurrency(currency , time, callback)(dispatch) ),
        drawStatistics: (statistics) => {
            dispatch({ type: 'DRAW_STATS', stats : statistics })
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyButton)


