import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GroupButtons from './GroupButtons';
import '../assets/css/ScanBox.css';
import { connect } from 'react-redux';
import {TimeDetails , RaisedAmount, TokenIssued, Investors} from './details'
import {TokensBarChart , DoubleBarChart} from './charts'


const getChartFormat = (durationDays)=>{
    if (durationDays === 0)
        return 'Block Numbers'
    else if (durationDays === 1)
        return 'Hours'
    else if (durationDays > 1)
        return 'Days';
};

const ScanBoxDetails = ({ hasTokenPrice, ...props }) =>

    (props.currency && <div className="scanbox-details">
        <Row className="statistics">
            <Col md={12} className="scan-content">
                <Row>
                    <Col md={6} >
                        <TimeDetails {...props.stats.time}/>
                        <RaisedAmount totalETH={props.stats.money.totalETH}/>
                        <TokenIssued tokenIssued={props.stats.money.tokenIssued} />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row className="statistics">
            <Col md={6}>
                <TokensBarChart data={props.stats.charts.tokensAmount}  dataKey="Tokens/Time"/>
            </Col>
            <Col md={6}>
                <TokensBarChart data={props.stats.charts.tokensCount} dataKey="Transactions/Time"/>
            </Col>
        </Row>

        <Row>
            <Col md={12}>
                <div className="alarm">
                    <p>Since the duration for this ICO is {props.stats.time.duration} so the results below will be classified by {getChartFormat(props.stats.time.durationDays)}</p>
                </div>
            </Col>
        </Row>

        {hasTokenPrice &&
        <div className="scan-content">
            <h3 className="title">Funds distribution</h3>

            <GroupButtons currencyValue={props.currencyValue}  currency={props.currency}/>

            <Row>
                <Col md={6} className="scan-content">
                    <Investors total={props.stats} investors={props.stats.investors} currency={props.currency}
                               isProvidingEtherValue={props.isProvidingEtherValue}/>
                </Col>

            </Row>

            <Row>
                <Col md={6}>
                    <p>Number investors distributed by different scale</p>
                    <DoubleBarChart data={props.stats.charts.invetorsDistribution}  ChartKey="Investors"/>
                </Col>
                <Col md={6}>
                    <p>Amount of investment distributed by different scale</p>
                    <DoubleBarChart data={props.stats.charts.investmentDistribution} ChartKey="Investments"/>
                </Col>
            </Row>
        </div>}
        {!hasTokenPrice &&
        <div className="alarm">
            <p>No statistics: This ICO Is not providing information on token price in ETH</p>
        </div>}

        </div>
);

export default connect(
    state => ({
        currency : state.scan.currency,
        currencyValue : state.scan.currencyValue,
        stats: state.scan.stats
    }),
    null
)(ScanBoxDetails)

