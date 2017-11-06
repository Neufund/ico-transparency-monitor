import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/GroupButtons.css';
import { connect } from 'react-redux';
import { setStatisticsByCurrency, setConversionRate } from '../actions/CurrencyAction';

class CurrencyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyActiveClass: props.currency,
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

  async onCurrencyHandle(currency, dayClass) {
    dayClass = dayClass || this.state.exchangeRateActiveClass || 'NOW';
    let rateDate = null;
    switch (dayClass) {
      case 'END':
        rateDate = this.props.stats.time.endDate;
        break;
      case 'NOW':
        rateDate = new Date();
        break;
      default:
        throw new Error('Unknown input');
    }

    currency = currency || this.props.currency;
    await this.props.setCurrency(currency, this.props.baseCurrency || 'ETH', rateDate);
    this.setState({ exchangeRateActiveClass: dayClass,
      exchangeRateDate: rateDate,
      currencyActiveClass: currency });
  }

  render() {
    return (
      <div>
        <Row className="group-buttons">
          <Col>
            <div>
              <p>Convert to:</p>
              <ul className="currency-buttons">
                {['EUR', 'USD', 'ETH'].map(item => (<li key={item}><a
                  className={this.state.currencyActiveClass === item ? 'active' : ''}
                  onClick={async () => {
                    await this.onCurrencyHandle(item, null);
                  }}
                >{item}</a></li>))}
              </ul>
              <p>Rate from:</p>
              <ul className="currency-buttons">
                {['NOW', 'END'].map(item =>
                  (<li key={item}><a
                    className={this.state.exchangeRateActiveClass === item ? 'active' : ''}
                    onClick={
                      () => {
                        this.onCurrencyHandle(null, item);
                      }
                    }
                  >
                    {CurrencyButton.mapButtonKeysToText(item)}</a></li>)
                )
                }
              </ul>
            </div>
          </Col>
          <Col md={6} className="exchangeRate">
            <p>
              <strong>{this.props.baseCurrency || 'ETH'} 1 = {this.props.currency} {this.props.currencyValue}</strong>
              <br />
              <small>{this.props.provider} on {this.state.exchangeRateDate.formatDate()}

              </small>
            </p>
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
  provider: state.currency.provider,
});

const mapDispatchToProps = (dispatch, props) => ({
  setCurrency: async (currency, baseCurrency, time) => {
    const conversionRate = await dispatch(setConversionRate(props.address, currency, time));
    dispatch(setStatisticsByCurrency(currency, conversionRate, time));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyButton);

