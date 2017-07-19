import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import GroupButtons from './GroupButtons';
import '../assets/css/ScanBox.css';
import { connect } from 'react-redux';
import { TimeDetails, RaisedAmount, TokenIssued, Investors } from './details';
import { SingleBarChart } from './charts';
import { downloadCSV } from '../utils';
import { default as config } from '../config.js';

const ScanBoxDetails = ({ ...props }) => (<div className="scanbox-details">
  <Row className="statistics">
    {console.log('ScanBoxDetails component did mount')}
    <Col md={12} className="scan-content">
      <p> Actual values from ICO transactions analysis: </p>
      <TimeDetails {...props.stats.time} />
      {props.totalSupply &&
      <TokenIssued totalSupply={props.totalSupply} tokenIssued={props.stats.money.tokenIssued} /> }
    </Col>
  </Row>

  <Row className="statistics">
    <Col md={6}>
      <SingleBarChart
        title="Tokens over time"
        data={props.stats.charts.transactionsCount}
        dataKey={`Tokens/${props.stats.time.scale}`}
        xLabel={props.stats.time.scale.capitalizeTxt()}
        yLabel="Tokens"
      />
    </Col>
    <Col md={6}>
      <SingleBarChart
        title="Transactions over time"
        data={props.stats.charts.tokensCount}
        dataKey="Transactions/Time"
        xLabel={props.stats.time.scale.capitalizeTxt()}
        yLabel="Transactions"
      />
    </Col>
  </Row>

  {props.matrix.q5.answer &&
  <div className="scan-content">

    <Row>
      <Col md={6} className="scan-content">
        <Investors
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

    <RaisedAmount totalETH={props.stats.money.totalETH} />

    <h3 className="title">Funds distribution</h3>

    <GroupButtons currencyValue={props.currencyValue} currency={props.currency} />
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

  {!props.matrix.q5.answer &&
  <div className="alarm">
    <p>No statistics: This ICO Is not providing information on token price in ETH</p>
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

