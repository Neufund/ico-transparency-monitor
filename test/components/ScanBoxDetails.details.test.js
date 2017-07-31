import { TimeDetails, RaisedAmount, TokenIssued, TokenDistribution } from '../../src/components/details';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<TimeDetails/>', () => {
  it('should render', () => {
    const component = shallow(<TimeDetails
      startDate={new Date(2017, 3, 3, 4, 3, 3)}
      endDate={new Date(2017, 3, 3, 4, 3, 3)}
      duration={0}
    />);

    expect(component.find('.stats')).to.contain(
      (
        <tr>
          <th>First transaction date</th>
          <td>2017-04-03 04:03:03</td>
        </tr>
      )
    );
    expect(component.find('.stats')).to.contain(
      (
        <tr>
          <th>Last transaction date</th>
          <td>2017-04-03 04:03:03</td>
        </tr>
      )
    );
  });
});

describe('<RaisedAmount/>', () => {
  it('should render', () => {
    const component = shallow(<RaisedAmount total="10000" avgTicket="10000" avgPrice="10000" currenc="10000" />);
    expect(component.find('.stats > table > tbody')).to.contain(
      (<td>
          10000
      </td>)
    );
  });
});

describe('<TokenIssued/>', () => {
  it('should render', () => {
    const component = shallow(<TokenIssued totalSupply={10000} tokenIssued={0} tokensOverflow={10000} totalInvestors={10000} totalTransactions={10000} />);
    expect(component.find('.stats > table > tbody')).to.contain(
      (<tr>
        <th>
          Number of Transactions
        </th>
        <td>
          10 000
        </td>
      </tr>)
    );
  });

  it('should render show part of token from out the ICO', () => {
    const component = shallow(<TokenIssued totalSupply={10000} tokenIssued={10000} tokensOverflow={10000} totalInvestors={10000} totalTransactions={10000} />);
    expect(component.find('.stats > table > tbody')).to.contain((<i>*those tokens are not part of results below*</i>));
  });

  it('should not render show part of token from out the ICO', () => {
    const component = shallow(<TokenIssued totalSupply={10000} tokenIssued={0} tokensOverflow={10000} totalInvestors={10000} totalTransactions={10000} />);
    expect(component.find('.stats > table > tbody')).to.to.contain((<i>*those tokens are not part of results below*</i>));
  });
});


describe('<TokenDistribution/>', () => {
  it('should render', () => {
    const component = shallow(<TokenDistribution tokenHolders={[{ name: '1%', amount: 60 }, { name: '3%', amount: 90 }]} isVisible isNotVisibleMessage="this message should be apear if is visible true" />);
    expect(component.find('.token-distribution-table').exists()).to.equal(true);
    expect(component.find('.alarm.alarm-middle').exists()).to.equal(false);
  });

  it('should not render', () => {
    const component = shallow(<TokenDistribution tokenHolders={[{ name: '1%', amount: 60 }, { name: '3%', amount: 90 }]} isVisible={false} isNotVisibleMessage="this message should be apear if is visible true" />);
    expect(component.find('.token-distribution-table').exists()).to.equal(false);
    expect(component.find('.alarm.alarm-middle').exists()).to.equal(true);
  });
});
