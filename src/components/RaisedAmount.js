import React from 'react';
import { formatNumber } from '../utils';

export default ({ total, avgTicket, avgPrice, currency }) => (
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
