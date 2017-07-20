import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import GroupButtons from './GroupButtons';
import '../assets/css/ScanBox.css';
import { connect } from 'react-redux';
import { TimeDetails, RaisedAmount, TokenIssued, TokenDistribution } from './details';
import { SingleBarChart } from './charts';
import { downloadCSV } from '../utils';
import { default as config } from '../config.js';

const ScanBoxDetails = ({ ...props }) => (<div className="scanbox-details">
  <Row className="statistics">
    {console.log('ScanBoxDetails component did mount')}
    <Col md={12} className="scan-content">
      <TimeDetails {...props.stats.time} />
      <TokenIssued
        totalSupply={props.totalSupply} tokenIssued={props.stats.money.tokenIssued}
        tokensOverflow={props.totalSupply - props.stats.money.tokenIssued}
        totalInvestors={Object.keys(props.stats.investors.senders).length}
      />
    </Col>
  </Row>

  <Row className="statistics">
    <Col md={6} className="relative">
      {props.stats.money.tokenIssued > 0 && <SingleBarChart
        title="Tokens over time"
        data={props.stats.charts.tokensCount}
        dataKey="Tokens/Time"
        xLabel={props.stats.time.scale.capitalizeTxt()}
        yLabel="Tokens"
      />}
      {props.stats.money.tokenIssued === 0 &&   <div className="alarm alarm-middle">
        <p>No Token statistics: This ICO is not generating tokens or is not handling them in trustless way</p>
      </div>}
    </Col>
    <Col md={6}>
      <SingleBarChart
        title="Transactions over time"
        data={props.stats.charts.transactionsCount}
        dataKey={`Transactions/${props.stats.time.scale}`}
        xLabel={props.stats.time.scale.capitalizeTxt()}
        yLabel="Transactions"
      />
    </Col>
  </Row>

  <div className="scan-content">
    {props.stats.money.tokenIssued > 0 &&
    <Row>
      <Col md={6} className="scan-content">
        <TokenDistribution
          total={props.stats.money.tokenIssued}
          investors={props.stats.investors}
          currency={props.currency}
          isProvidingEtherValue={props.isProvidingEtherValue}
          tokenHolders={props.stats.charts.tokenHolders}
        />
      </Col>
      <Col md={6} >
        <SingleBarChart
          title="Token holders distribution"
          dataKey="TokenHolders"
          data={props.stats.charts.tokenHolders}
          xLabel={'Top Wealthiest Investors'}
          yLabel="Share of Tokens Owned"
        />
      </Col>
    </Row>
    }
    {props.stats.money.tokenIssued === 0 &&   <div className="alarm">
      <p>No Token statistics: This ICO is not generating tokens or is not handling them in trustless way</p>
    </div>}
    {props.stats.money.totalETH !== 0 &&
    <div>
      <h3 className="title">Raised amount</h3>
      <RaisedAmount
        total={props.stats.money.totalETH} currency="ETH"
        avgTicket={props.stats.money.totalETH / Object.keys(props.stats.investors.senders).length}
        avgPrice={props.stats.money.totalETH / props.stats.money.tokenIssued}
      />
      <GroupButtons currencyValue={props.currencyValue} currency={props.currency} />
      <RaisedAmount
        total={props.stats.money.totalETH * props.currencyValue} currency={props.currency}
        avgTicket={props.stats.money.totalETH * props.currencyValue / Object.keys(props.stats.investors.senders).length}
        avgPrice={props.stats.money.totalETH * props.currencyValue / props.stats.money.tokenIssued}
      />

      <h3 className="title">Funds distribution</h3>
      <Row>
        <Col md={12}>

          <SingleBarChart
            data={props.stats.charts.investorsDistribution}
            dataKey="Investors"
            title="Number of Investors with Ticket of Size"
            xLabel={`Ticket Size in [${props.currency}]`}
            yLabel="Number of Investors"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} >
          <SingleBarChart
            data={props.stats.charts.investmentDistribution}
            dataKey="Investments"
            title="Total Amount Invested with Ticket of Size"
            xLabel={`Ticket Size in [${props.currency}]`}
            yLabel="Total Amount Invested"
          />
        </Col>
      </Row>
    </div>}
  </div>

  {!props.stats.money.totalETH &&
  <div className="alarm">
    <p>No ETH statistics: This ICO Is not handling funds in a trustless way</p>
  </div>}
  <button className="chart-btn" onClick={() => props.downloadCSV(props.address)}>[Download Raw Data as CSV]</button>
</div>);

const mapStateToProps = (state, props) =>
  ({
    currency: state.currency.currency,
    currencyValue: state.currency.value,
    stats: state.scan.stats,
    ...state.ICO.icos[props.address],
    matrix: config.ICOs[props.address].matrix,
  });

const mapDispatchToProps = (dispatch, state) => ({
  downloadCSV: (fileName) => {
    dispatch(downloadCSV(fileName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanBoxDetails);
