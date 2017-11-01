import React from 'react';

export default ({ startDate, endDate, duration }) => (
  <div>
    <h3 className="title">Time</h3>
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <th>First transaction date</th>
            <td>{startDate && startDate.formatDate(true)}</td>
          </tr>
          <tr>
            <th>Last transaction date</th>
            <td>{endDate && endDate.formatDate(true)}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{duration}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>);
