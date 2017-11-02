import React from 'react';
import PropTypes from 'prop-types';

const TokenDistribution = ({ tokenHolders, isVisible, isNotVisibleMessage, giniIndex }) => (
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
  // eslint-disable-next-line react/require-default-props
  giniIndex: PropTypes.number,
};

TokenDistribution.defaultProps = {
  isNotVisibleMessage: '',
};

