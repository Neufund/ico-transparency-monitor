import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/GroupButtons.css';
import { setStatisticsByCurrency, setConversionRate } from '../actions/CurrencyAction';

class CurrencyButton extends Component {
  static mapButtonKeysToText(key) {
    const map = {
      NOW: 'Now',
      END: 'Offering end date',
    };
    return map[key];
  }

  constructor(props) {
    super(props);
    this.state = {
      currencyActiveClass: props.currency,
      exchangeRateDate: new Date(),
      exchangeRateActiveClass: 'NOW',
    };
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
    await this.props.setCurrency(currency, this.props.baseCurrency || 'ETH', rateDate, this.props.etoConfig);
    this.setState({ exchangeRateActiveClass: dayClass,
      exchangeRateDate: rateDate,
      currencyActiveClass: currency });
  }

  render() {
    return (
      <div>
        <Row className="group-buttons">
          <Col md={12} className="buttons-container">
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
            </div>
            <div>
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
            <div className="exchangeRate">
              <strong>{this.props.baseCurrency || 'ETH'} 1 = {this.props.currency} {this.props.currencyValue}</strong>
              <br />
              <small>{this.props.provider} on {this.state.exchangeRateDate.formatDate()}
              </small>
            </div>
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
  setCurrency: async (currency, baseCurrency, time, etoConfig) => {
    const conversionRate = await dispatch(setConversionRate(props.address, currency, time, etoConfig));
    dispatch(setStatisticsByCurrency(currency, conversionRate, time));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyButton);

