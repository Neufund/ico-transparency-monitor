import React from 'react';
import PropTypes from 'prop-types';

const GiniIndex = ({ giniIndex }) => (<div className="stats-no-box">
  <table>
    <tbody>
      <tr>
        <th>Gini index = </th>
        <td>{giniIndex.toFixed(4)}</td>
      </tr>
    </tbody>
  </table>
</div>);

GiniIndex.propTypes = {
  giniIndex: PropTypes.number.isRequired,
};

export default GiniIndex;
