import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import '../assets/css/GroupButtons.css';
import {connect} from 'react-redux';
import {setCurrency} from '../actions/CurrencyAction'
import {prepareStatsInvestment, getDistributedDataFromDataset} from '../utils.js';

class CurrencyButton extends Component {
    constructor() {
        super();
        this.state = {
            currencyActiveClass: 'EUR',
            exchangeRateValue: new Date().yyyymmdd(),
            exchangeRateActiveClass: 'NOW'
        };
    }

    static mapButtonKeysToText(key) {
        const map = {
            'NOW': 'Now',
            'END': 'Day of ICO end'
        };
        return map[key];
    }

    onCurrencyHandle(currency, time) {
        console.log(currency, time);

        if (currency === "default")
            currency = this.props.currency;
        else
            this.setState({currencyActiveClass: currency});

        if (time && time === "END") {
            this.setState({exchangeRateValue: new Date(this.props.stats.time.endDate).yyyymmdd()});
            this.setState({exchangeRateActiveClass: time});
            time = this.props.stats.time.endDate;
        } else if (time && time === "NOW") {
            this.setState({exchangeRateActiveClass: time});
            this.setState({exchangeRateValue: new Date().yyyymmdd()});
        } else
            time = this.state.exchangeRateValue;

        this.props.setCurrency(currency, time, () => {
            let currentStatistics = this.props.stats;
            const distribution = getDistributedDataFromDataset(currentStatistics.etherDataset, this.props.currencyValue);
            currentStatistics.charts.investorsDistribution = distribution[0];
            currentStatistics.charts.investmentDistribution = distribution[1];

            this.props.drawStatistics(currentStatistics);
        });
    }

    render() {
        return (
            <div>
                <Row className="group-buttons">
                    <Col md={6}>
                        <div>
                            <p>Currency:</p>
                            <ul className="currency-buttons">
                                {['EUR', 'USD', 'BTC', 'ETH'].map((item) => <li key={item}><a
                                    className={this.state.currencyActiveClass === item ? "active" : ""} onClick={() => {
                                    this.onCurrencyHandle(item)
                                }}>{item}</a></li>)}
                            </ul>
                        </div>
                    </Col>
                    <Col md={6} className="exchangeRate">
                        <p>
                            <span>Rate: </span>
                            <storng>1 ETH = {this.props.currencyValue} {this.props.currency}</storng>
                        </p>
                        <br/>
                        <p>
                            <em>https://api.coinbase.com/v2/prices/</em> on [{this.state.exchangeRateValue}]
                        </p>
                    </Col>
                </Row>
                <Row className="group-buttons">
                    <Col md={12}>
                        <p>Exchange rate:</p>
                        <ul className="currency-buttons">
                            {['NOW', 'END'].map((item) =>
                                <li key={item}><a
                                    className={this.state.exchangeRateActiveClass === item ? "active" : ""} onClick={
                                    () => {
                                        this.onCurrencyHandle("default", item)
                                    }
                                }>{CurrencyButton.mapButtonKeysToText(item)}</a></li>)
                            }
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency.currency,
        currencyValue: state.currency.value,
        currencyTime: state.currency.time,
        stats: state.scan.stats
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrency: ( (currency, time, callback) => setCurrency(currency, time, callback)(dispatch) ),
        drawStatistics: (statistics) => {
            dispatch({type: 'DRAW_STATS', stats: statistics})
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyButton)


