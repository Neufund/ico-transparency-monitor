import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/GroupButtons.css';
import { connect } from 'react-redux';
import { setCurrency, setCurrencyAction , setStatisticsByCurrency} from '../actions/CurrencyAction';
import { getDistributedDataFromDataset } from '../utils.js';

class CurrencyButton extends Component {
  constructor() {
    super();
    this.state = {
      currencyActiveClass: 'EUR',
      exchangeRateDate: new Date(),
      exchangeRateActiveClass: 'NOW',
    };
  }

  static mapButtonKeysToText(key) {
    const map = {
      NOW: 'Now',
      END: 'Day of ICO end',
    };
    return map[key];
  }

  onCurrencyHandle(currency, dayClass) {
    dayClass = dayClass || this.state.exchangeRateActiveClass || 'NOW';
    let rateDate = null;
    switch (dayClass) {
      case 'END':
        rateDate = this.props.stats.time.endDate;
        break;
      case 'NOW':
        rateDate = new Date();
        break;
    }
    currency = currency || this.props.currency;
    this.props.setCurrency(currency, rateDate);
    this.setState({ exchangeRateActiveClass: dayClass, exchangeRateDate: rateDate, currencyActiveClass: currency });
  }

  render() {
    return (
      <div>
        <Row className="group-buttons">
          <Col md={6}>
            <div>
              <p>Currency:</p>
              <ul className="currency-buttons">
                {['EUR', 'USD', 'ETH'].map(item => (<li key={item}><a
                  className={this.state.currencyActiveClass === item ? 'active' : ''}
                  onClick={() => {
                    this.onCurrencyHandle(item, null);
                  }}
                >{item}</a></li>))}
              </ul>
            </div>
          </Col>
          <Col md={6} className="exchangeRate">
            <p>
              <span>Rate: </span>
              <storng>1 ETH = {this.props.currencyValue} {this.props.currency}</storng>
            </p>
            <br />
            <p>
              <em>https://api.coinbase.com/v2/prices/</em> on [{this.state.exchangeRateDate.formatDate()}]
                        </p>
          </Col>
        </Row>
        <Row className="group-buttons">
          <Col md={12}>
            <p>Exchange rate:</p>
            <ul className="currency-buttons">
              {['NOW', 'END'].map(item =>
                (<li key={item}><a
                  className={this.state.exchangeRateActiveClass === item ? 'active' : ''} onClick={
                                    () => {
                                      this.onCurrencyHandle(null, item);
                                    }
                                }
                >{CurrencyButton.mapButtonKeysToText(item)}</a></li>))
                            }
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.currency.currency,
  currencyValue: state.currency.value,
  currencyTime: state.currency.time,
  stats: state.scan.stats,
});

const mapDispatchToProps = (dispatch , props) => ({
  setCurrency: ((currency, time) =>

    setCurrency(currency, time, (error , currencyResult) => {
    console.log(`Selected currency is ${currencyResult.currency}, ${currencyResult.value}, ${currencyResult.time} `);
    dispatch(setStatisticsByCurrency(currencyResult.currency, currencyResult.value, currencyResult.time ));
  }))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyButton);

