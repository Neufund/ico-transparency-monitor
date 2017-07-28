import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '../utils';

export const TimeDetails = ({ startDate, endDate, duration }) => (
  <div>
    <h3 className="title">Time</h3>
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>First transaction date</th>
            <td>{startDate.formatDate(true)}</td>
          </tr>
          <tr>
            <th>Last transaction date</th>
            <td>{endDate.formatDate(true)}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{duration}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);

export const RaisedAmount = ({ total, avgTicket, avgPrice, currency }) => (
  <div>
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>Total amount raised in {currency}</th>
            <td>{formatNumber(total)}</td>
          </tr>
          <tr>
            <th>Average ticket in {currency}</th>
            <td>{formatNumber(avgTicket)}</td>
          </tr>
          <tr>
            <th>Average token price in {currency}</th>
            <td>{avgPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const TokenIssued = ({ tokenIssued, tokensOverflow, totalInvestors, totalTransactions }) => (
  <div >
    <h3 className="title">
      <span className="tooltip" data-tip="This section shows ICO activity over time.<br/> Were most transactions done first day? Were there any spikes? Activity at the end?">Tokens issuance</span>
    </h3>
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>Number of Investors</th>
            <td>{formatNumber(totalInvestors, 0)}</td>
          </tr>
          <tr>
            <th>Number of Transactions</th>
            <td>{formatNumber(totalTransactions, 0)}</td>
          </tr>
          <tr>
            <th>Number of tokens created during the ICO</th>
            <td>{formatNumber(tokenIssued)}</td>
          </tr>
          {
            tokensOverflow !== 0 &&
            <tr>
              <th>
                Number of tokens created outside of ICO<br />
                <i>*those tokens are not part of results below*</i>
              </th>
              <td>{formatNumber(tokensOverflow)}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
);

export const TokenDistribution = ({ tokenHolders, isVisible, isNotVisibleMessage, giniIndex }) => (
  <div className="relative full-height">
    <h3 className="title">
      <span
        className="tooltip"
        data-tip="This section shows level of inequality among token holders.<br/>How much tokens
         1% of wealthiest investors have?<br/> How much tokens are owned by small investors?"
      >
        Token distribution
      </span>
    </h3>
    {giniIndex &&
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>Gini index</th>
            <td>{giniIndex.toFixed(4)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    }
    {isVisible ?
      <div className="token-distribution-table"><table className="table table-responsive">
        <thead>
          <tr>
            <th>Top Wealthiest Investors</th>
            <th>Share of Tokens Owned</th>
          </tr>
        </thead>
        <tbody>
          {
            tokenHolders.map((item) => {
              const key = item.name;
              return (<tr key={key}>
                <td key={`${key}_${key}`}>{key}</td>
                <td>{item.amount.toFixed(2)}%</td>
              </tr>);
            })
          }
        </tbody>
      </table></div>
      :
      <div className="alarm alarm-middle"><p>{isNotVisibleMessage}</p></div>
    }
  </div>);

TokenDistribution.propTypes = {
  tokenHolders: PropTypes.arrayOf(PropTypes.object).isRequired,
  isVisible: PropTypes.bool.isRequired,
  isNotVisibleMessage: PropTypes.string.isRequired,
  giniIndex: PropTypes.number.isRequired,
};

TokenDistribution.defaultProps = {
  isNotVisibleMessage: '',
};

