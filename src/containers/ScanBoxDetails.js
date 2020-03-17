import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import '../assets/css/ScanBox.css';
import GroupButtons from '../components/GroupButtons';
import GeneralDates from '../components/GeneralDates';
import RaisedAmount from '../components/RaisedAmount';
import TokenIssued from '../components/TokenIssued';
import TokenDistribution from '../components/TokenDistribution';
import Chart from '../components/Chart';
import { downloadCSV } from '../utils';
import config from '../config';
import GiniIndex from '../components/GiniIndex';

export const getMedian = (numbers) => {
  let median = 0;
  const numsLen = numbers.length;
  numbers.sort((a, b) => b - a);

  if (numsLen % 2 === 0) { // is even
    // average of two middle numbers
    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else { // is odd
    // middle number only
    median = numbers[(numsLen - 1) / 2];
  }
  return median;
};

const manageTooltipPosition = ({ left, top }) => {
  return { left: left < 10 ? 20 : left, top };
};

const ScanBoxDetails = ({ ...props }) => (<div className="scanbox-details">
  <ReactTooltip
    multiline
    className="container"
    overridePosition={manageTooltipPosition}
  />
  <Row className="statistics box-container">
    <Col md={12} sm={12} xs={12} className="scan-content">
      <GeneralDates {...props.stats.time} />
      <TokenIssued
        totalSupply={props.totalSupply}
        tokenIssued={props.stats.money.tokenIssued}
        tokensOverflow={props.totalSupply - props.stats.money.tokenIssued}
        totalInvestors={Object.keys(props.stats.investors.senders).length}
        totalTransactions={props.stats.general.transactionsCount}
        offeringType={props.offeringType}
      />
    </Col>
  </Row>

  <Row className="statistics box-container">
    <Col md={6} sm={12} xs={12} className="relative">
      <Chart
        projectName={props.name}
        title={`${props.symbol} Tokens raised over time`}
        data={props.stats.charts.tokensCount}
        dataKey="Tokens/Time"
        xLabel={props.stats.time.scale.capitalizeTxt()}
        yLabel={`${props.symbol} Tokens`}
        isVisible={parseInt(props.stats.money.tokenIssued, 10) > 0}
        isNotVisibleMessage={`No Token statistics: This offering
        is not generating tokens or is not handling them in trustless way`}
        tooltip={
          {
            yTitle: 'Token raised',
            xTitle: props.stats.time.scale.slice(0, -1),
            ySymbol: props.symbol,
          }
        }
      />
    </Col>
    <Col md={6} sm={12} xs={12} className="relative">
      <Chart
        projectName={props.name}
        title="Transactions over time"
        data={props.stats.charts.transactionsCount}
        dataKey={`Transactions/${props.stats.time.scale}`}

        isVisible={parseInt(props.stats.general.transactionsCount, 10) > 0}
        isNotVisibleMessage={`No Token distribution table: This ${props.offeringType}
         is not generating tokens or is not handling them in trustless way`}
        xLabel={props.stats.time.scale.capitalizeTxt()}
        yLabel="Transactions"
        tooltip={
          { xTitle: props.stats.time.scale.slice(0, -1), yTitle: 'Transaction' }
        }
      />
    </Col>
  </Row>

  <div className="scan-content">
    <Row>
      <Col xs={12}>
        <h3 className="title">
          <span
            className="tooltip"
            data-tip="This section shows level of inequality among token holders.<br/>How much tokens
         1% of wealthiest investors have?<br/> How much tokens are owned by small investors?"
          >
            Token distribution
          </span>
        </h3>
      </Col>
    </Row>
    {props.stats.general.giniIndex && <Row>
      <GiniIndex giniIndex={props.stats.general.giniIndex} />
    </Row>}
    <Row className="box-container">
      <Col md={6} sm={12} xs={12} className="scan-content">
        <TokenDistribution
          tokenHolders={props.stats.charts.tokenHolders}
          isVisible={props.stats.money.tokenIssued !== 0}
          isNotVisibleMessage={`No Token distribution table: This ${props.offeringType}
           is not generating tokens or is not handling them in trustless way`}
        />
      </Col>
      <Col md={6} sm={12} xs={12} >
        <Chart
          title="Token holders distribution"
          hideTitle
          dataKey="TokenHolders"
          data={props.stats.charts.tokenHolders}
          xLabel={'Share of investors by ownership'}
          yLabel={`Share of ${props.symbol} owned by investors`}
          isVisible={props.stats.money.tokenIssued !== 0}
          isNotVisibleMessage={`No Token distribution statistics: This
           ${props.offeringType} is not generating tokens or is not handling them in trustless way`}
          tooltip={
            {
              xTitle: 'All tokens distributed',
              yTitle: 'Tokens distributed',
              ySymbol: `${props.symbol}`,
            }
          }
        />
      </Col>
    </Row>

    {props.stats.money.totalBaseCurrency !== 0 &&
      <div>
        <h3 className="title">Raised amount</h3>

        <RaisedAmount
          baseCurrency={props.baseCurrency}
          total={props.stats.money.totalBaseCurrency}
          currency={props.baseCurrency}
          avgTicket={
            props.stats.money.totalBaseCurrency / Object.keys(props.stats.investors.senders).length
          }
          avgPrice={props.stats.money.totalBaseCurrency / props.stats.money.tokenIssued}
          medianTicketSize={getMedian(props.investedMoney)}
          offeringType={props.offeringType}
        />
        <GroupButtons
          address={props.address}
          smartContractCurrencyRate={props.currencyRate}
          baseCurrency={props.baseCurrency}
          currencyValue={props.currencyValue}
          currency={props.currency}
        />

        <RaisedAmount
          total={props.stats.money.totalBaseCurrency * props.currencyValue}
          avgTicket={(props.stats.money.totalBaseCurrency * props.currencyValue)
            / Object.keys(props.stats.investors.senders).length}
          avgPrice={(props.stats.money.totalBaseCurrency * props.currencyValue)
            / props.stats.money.tokenIssued}
          currency={props.currency}
          medianTicketSize={getMedian(props.investedMoney) * props.currencyValue}
        />
      </div>}

    <div className="section-top">
      <Row className="box-container">
        <Col md={12} sm={12} xs={12} >
          <Chart
            projectName={props.name}
            title="Raised funds over time"
            data={props.stats.charts.etherCount}
            dataKey="Date"
            xLabel={props.stats.time.scale.capitalizeTxt()}
            yLabel={props.currency}
            isVisible={props.stats.money.totalETH !== 0}
            isNotVisibleMessage={`No ETH statistics: This ${props.offeringType} Is not
            handling funds in a trustless way`}
            tooltip={
              {
                xTitle: 'On',
                yTitle: `${props.currency} raised`,
                ySymbol: props.currency,
              }
            }
          />
        </Col>
      </Row>
    </div>


    <div className="section-top">
      <h3 className="title">
        <span
          className="tooltip"
          data-tip={`This section shows how
         different types of investors (with different ticket size)
         impacted ${props.offeringType} results.<br/>First chart shows which ticket
         sizes were most popular among investors.<br/>Second chart
         shows which ticket size generated most funds. Were those
         few large 1M EUR tickets? Or rather many smaller 10k
         tickets?`}
        >Funds distribution</span>
      </h3>
      <Row className="box-container">
        <Col md={12} sm={12} xs={12} >
          <Chart
            projectName={props.name}
            data={props.stats.charts.investorsDistribution}
            dataKey="Investors"
            title="Number of investors according to the ticket size"
            xLabel={`Ticket Size in [${props.currency}]`}
            yLabel="Number of Investors"
            isVisible={props.stats.money.totalETH !== 0}
            isNotVisibleMessage={`No ETH statistics: This ${props.offeringType} Is not
            handling funds in a trustless way`}
            tooltip={
              {
                xTitle: 'Ticket size',
                xSymbol: props.currency,
                yTitle: 'Total ticket amount',
                ySymbol: 'tickets',
              }
            }
          />
        </Col>
      </Row>
    </div>
    <Row className="box-container">
      <Col md={12} sm={12} xs={12} >
        <Chart
          projectName={props.name}
          data={props.stats.charts.investmentDistribution}
          dataKey="Investments"
          title="Total amount invested with the given ticket size"
          xLabel={`Ticket Size in [${props.currency}]`}
          yLabel="Total amount invested"
          isVisible={props.stats.money.totalETH !== 0}
          isNotVisibleMessage={`No ETH statistics: This ${props.offeringType} Is not
          handling funds in a trustless way`}
          tooltip={
            {
              xTitle: 'Ticket size',
              xSymbol: props.currency,
              ySymbol: props.currency,
            }
          }
        />
      </Col>
    </Row>

  </div>

  <button className="chart-btn" onClick={() => props.downloadCSV(props.address, props.icoConfig)}>
    <i className="fa fa-download" />
    Download Raw Data as CSV
  </button>
</div>);

const mapStateToProps = (state, props) =>
  ({
    currency: state.currency.currency,
    currencyValue: state.currency.value,
    investedMoney: state.scan.stats.investors.sortedByETH.map(investor => investor.value),
    stats: state.scan.stats,
    ...state.ICO.icos[props.address],
    name: config.ICOs[props.address].information.name,
    matrix: config.ICOs[props.address].matrix,
    baseCurrency: config.ICOs[props.address].baseCurrency || 'ETH',
  });

const mapDispatchToProps = dispatch => ({
  downloadCSV: (fileName, icoConfig) => {
    dispatch(downloadCSV(fileName, icoConfig));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanBoxDetails);
