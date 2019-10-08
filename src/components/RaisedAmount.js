import React from 'react';
import { formatNumber } from '../utils';

const RaisedAmount = ({
  total, avgTicket, avgPrice, currency,
  medianTicketSize, offeringType, baseCurrency = null,
}) =>
  (<div>
    <div className="stats">
      <table>
        <tbody>
          {baseCurrency && <tr>
            <th>{offeringType} Base currency</th>
            <td>{baseCurrency}</td>
          </tr>}
          <tr>
            <th>Total amount raised in {currency}</th>
            <td>{formatNumber(total)}</td>
          </tr>
          <tr>
            <th>Average ticket in {currency}</th>
            <td>{formatNumber(avgTicket)}</td>
          </tr>
          <tr>
            <th>Median ticket size in {currency}</th>
            <td>{formatNumber(medianTicketSize)}</td>
          </tr>
          <tr>
            <th>Average token price in {currency}</th>
            <td>{avgPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);

export default RaisedAmount;
