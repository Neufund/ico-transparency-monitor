import React from 'react';
import { analyzeIssuedTokens, formatNumber } from '../utils';

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

export const RaisedAmount = ({ totalETH }) => (
  <div>
    <h3 className="title">Raised amount</h3>
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>Total amount raised in ETH</th>
            <td>{formatNumber(totalETH)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const TokenIssued = ({ totalSupply, tokenIssued }) => (
  <div>
    <h3 className="title">Tokens issuance</h3>
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>Number of tokens created during the ICO</th>
            <td>{formatNumber(tokenIssued)}</td>
          </tr>

          {analyzeIssuedTokens(totalSupply, tokenIssued) != 0 &&
          <tr>
            <th>Number of tokens created outside of ICO <br/><i>*those tokens are not part of results below*</i></th>
            <td>{`${analyzeIssuedTokens(totalSupply, tokenIssued)} tokens`}</td>
          </tr>
                }
        </tbody>
      </table>
    </div>
  </div>
);

export const Investors = ({ tokenHolders }) => (
  <div>
    <h3 className="title">Token distribution</h3>
    <table className="table table-responsive">
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
    </table>

  </div>);
