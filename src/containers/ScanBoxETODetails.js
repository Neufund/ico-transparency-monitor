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
import { downloadCSV as downloadCSVUtil } from '../utils';
import GiniIndex from '../components/GiniIndex';

// TODO: refactor "Number heresy",
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
// totalSupply, stats, totalSupply, offeringType, name, symbol, baseCurrency, etoConfig, currencyValue, currency, investedMoney
const ScanBoxETODetails = ({ totalSupply, stats, offeringType, name, symbol, baseCurrency, etoConfig, currencyValue, currency, investedMoney, address, downloadCSV, currencyRate }) => (<div className="scanbox-details">
  <ReactTooltip multiline className="container" />
  <Row className="statistics box-container">
    <Col md={12} sm={12} xs={12} className="scan-content">
      <GeneralDates {...stats.time} />
      <TokenIssued
        totalSupply={totalSupply}
        tokenIssued={stats.money.tokenIssued}
        tokensOverflow={totalSupply - stats.money.tokenIssued}
        totalInvestors={Object.keys(stats.investors.senders).length}
        totalTransactions={stats.general.transactionsCount}
        offeringType={offeringType}
      />
    </Col>
  </Row>

  <Row className="statistics box-container">
    <Col md={6} sm={12} xs={12} className="relative">
      <Chart
        projectName={name}
        title={`${symbol} Tokens raised over time`}
        data={stats.charts.tokensCount}
        dataKey="Tokens/Time"
        xLabel={stats.time.scale.capitalizeTxt()}
        yLabel={`${symbol} Tokens`}
        isVisible={parseInt(stats.money.tokenIssued, 10) > 0}
        isNotVisibleMessage={`No Token statistics: This offering
        is not generating tokens or is not handling them in trustless way`}
        tooltip={
          {
            yTitle: 'Token raised',
            xTitle: stats.time.scale.slice(0, -1),
            ySymbol: symbol,
          }
        }
      />
    </Col>
    <Col md={6} sm={12} xs={12} className="relative">
      <Chart
        projectName={name}
        title="Transactions over time"
        data={stats.charts.transactionsCount}
        dataKey={`Transactions/${stats.time.scale}`}

        isVisible={parseInt(stats.general.transactionsCount, 10) > 0}
        isNotVisibleMessage={`No Token distribution table: This ${offeringType}
         is not generating tokens or is not handling them in trustless way`}
        xLabel={stats.time.scale.capitalizeTxt()}
        yLabel="Transactions"
        tooltip={
          { xTitle: stats.time.scale.slice(0, -1), yTitle: 'Transaction' }
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
    {stats.general.giniIndex && <Row>
      <GiniIndex giniIndex={stats.general.giniIndex} />
    </Row>}
    <Row className="box-container">
      <Col md={6} sm={12} xs={12} className="scan-content">
        <TokenDistribution
          tokenHolders={stats.charts.tokenHolders}
          isVisible={stats.money.tokenIssued !== 0}
          isNotVisibleMessage={`No Token distribution table: This ${offeringType}
           is not generating tokens or is not handling them in trustless way`}
        />
      </Col>
      <Col md={6} sm={12} xs={12} >
        <Chart
          title="Token holders distribution"
          hideTitle
          dataKey="TokenHolders"
          data={stats.charts.tokenHolders}
          xLabel={'Share of investors by ownership'}
          yLabel={`Share of ${symbol} owned by investors`}
          isVisible={stats.money.tokenIssued !== 0}
          isNotVisibleMessage={`No Token distribution statistics: This
           ${offeringType} is not generating tokens or is not handling them in trustless way`}
          tooltip={
            {
              xTitle: 'All tokens distributed',
              yTitle: 'Tokens distributed',
              ySymbol: `${symbol}`,
            }
          }
        />
      </Col>
    </Row>

    {stats.money.totalBaseCurrency !== 0 &&
      <div>
        <h3 className="title">Raised amount</h3>

        <RaisedAmount
          baseCurrency={baseCurrency}
          total={stats.money.totalBaseCurrency}
          currency={baseCurrency}
          avgTicket={
            stats.money.totalBaseCurrency / Object.keys(stats.investors.senders).length
          }
          avgPrice={stats.money.totalBaseCurrency / stats.money.tokenIssued}
          medianTicketSize={getMedian(investedMoney)}
          offeringType={offeringType}
        />
        <GroupButtons
          address={address}
          etoConfig={etoConfig}
          smartContractCurrencyRate={currencyRate}
          baseCurrency={baseCurrency}
          currencyValue={currencyValue}
          currency={currency}
        />

        <RaisedAmount
          total={stats.money.totalBaseCurrency * currencyValue}
          avgTicket={(stats.money.totalBaseCurrency * currencyValue)
            / Object.keys(stats.investors.senders).length}
          avgPrice={(stats.money.totalBaseCurrency * currencyValue)
            / stats.money.tokenIssued}
          currency={currency}
          medianTicketSize={getMedian(investedMoney) * currencyValue}
        />
      </div>}

    <div className="section-top">
      <Row className="box-container">
        <Col md={12} sm={12} xs={12} >
          <Chart
            projectName={name}
            title="Raised funds over time"
            data={stats.charts.etherCount}
            dataKey="Date"
            xLabel={stats.time.scale.capitalizeTxt()}
            yLabel={currency}
            isVisible={stats.money.totalETH !== 0}
            isNotVisibleMessage={`No ETH statistics: This ${offeringType} Is not
            handling funds in a trustless way`}
            tooltip={
              {
                xTitle: 'On',
                yTitle: `${currency} raised`,
                ySymbol: currency,
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
         impacted ${offeringType} results.<br/>First chart shows which ticket
         sizes were most popular among investors.<br/>Second chart
         shows which ticket size generated most funds. Were those
         few large 1M EUR tickets? Or rather many smaller 10k
         tickets?`}
        >Funds distribution</span>
      </h3>
      <Row className="box-container">
        <Col md={12} sm={12} xs={12} >
          <Chart
            projectName={name}
            data={stats.charts.investorsDistribution}
            dataKey="Investors"
            title="Number of investors according to the ticket size"
            xLabel={`Ticket Size in [${currency}]`}
            yLabel="Number of Investors"
            isVisible={stats.money.totalETH !== 0}
            isNotVisibleMessage={`No ETH statistics: This ${offeringType} Is not
            handling funds in a trustless way`}
            tooltip={
              {
                xTitle: 'Ticket size',
                xSymbol: currency,
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
          projectName={name}
          data={stats.charts.investmentDistribution}
          dataKey="Investments"
          title="Total amount invested with the given ticket size"
          xLabel={`Ticket Size in [${currency}]`}
          yLabel="Total amount invested"
          isVisible={stats.money.totalETH !== 0}
          isNotVisibleMessage={`No ETH statistics: This ${offeringType} Is not
          handling funds in a trustless way`}
          tooltip={
            {
              xTitle: 'Ticket size',
              xSymbol: currency,
              ySymbol: currency,
            }
          }
        />
      </Col>
    </Row>

  </div>

  <button className="chart-btn" onClick={() => downloadCSV(address, etoConfig)}>
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
    ...state.ETO.properties[props.address],
    name: props.etoConfig.information.name,
    matrix: props.etoConfigmatrix,
    baseCurrency: props.etoConfig.baseCurrency || 'ETH',
  });

const mapDispatchToProps = dispatch => ({
  downloadCSV: (fileName, icoConfig) => {
    dispatch(downloadCSVUtil(fileName, icoConfig));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanBoxETODetails);
