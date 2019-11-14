import React from 'react';
import PropTypes from 'prop-types';

const TokenDistribution = ({ tokenHolders, isVisible, isNotVisibleMessage }) => (
  <div className="relative full-height">
    {isVisible ?
      <div className="token-distribution-table"><table className="table table-responsive">
        <thead>
          <tr>
            <th>Share of investors by ownership</th>
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

export default TokenDistribution;

TokenDistribution.propTypes = {
  tokenHolders: PropTypes.arrayOf(PropTypes.object).isRequired,
  isVisible: PropTypes.bool.isRequired,
  isNotVisibleMessage: PropTypes.string.isRequired,
};

TokenDistribution.defaultProps = {
  isNotVisibleMessage: '',
};

