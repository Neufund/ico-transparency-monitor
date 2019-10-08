import React from 'react';
import { formatNumber } from '../utils';

export default ({ tokenIssued, tokensOverflow, totalInvestors, totalTransactions, offeringType }) => (
  <div className="section">
    <h3 className="title">
      <span
        className="tooltip"
        data-tip={`This section showsThis section shows ${offeringType}  activity over time.<br/> Were most transactions done
         first day? Were there any spikes? Activity at the end?`}
      >
        Tokens issuance
      </span>
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
            <th>Number of tokens created during the {offeringType}</th>
            <td>{formatNumber(tokenIssued)}</td>
          </tr>
          {
            parseFloat(tokensOverflow.toFixed(2)) !== 0 &&
            <tr>
              <th>
                Number of tokens created outside of {offeringType}<br />
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
