import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GroupButtons from './GroupButtons';
import '../assets/css/ScanBox.css';
import { connect } from 'react-redux';
import {TimeDetails , RaisedAmount, TokenIssued, Investors} from './details'
import {TokensBarChart , DoubleBarChart,TokenHoldersPieChart} from './charts'
import {getTokenHoldersChartData} from '../utils/charts';


const getChartFormat = (durationDays)=>{
    if (durationDays === 0)
        return 'Block Numbers';
    else if (durationDays === 1)
        return 'Hours';
    else if (durationDays > 1)
        return 'Days';
};

const ScanBoxDetails = ({ hasTokenPrice, ...props }) => {
    let percentages = [];
    let i = 1;
    while(i < 100){
        percentages.push(i*0.01);
        i+= i<5?4:(i<9?5:10);
    }

    return (props.currencyValue && <div className="scanbox-details">
        <Row className="statistics">
            <Col md={12} className="scan-content">
                <Row>
                    <Col md={6}>
                        <TimeDetails {...props.stats.time}/>
                        <RaisedAmount totalETH={props.stats.money.totalETH}/>
                        <TokenIssued tokenIssued={props.stats.money.tokenIssued}/>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row className="statistics">
            <Col md={6}>
                <TokensBarChart data={props.stats.charts.tokensAmount} dataKey="Tokens/Time"/>
            </Col>
            <Col md={6}>
                <TokensBarChart data={props.stats.charts.tokensCount} dataKey="Transactions/Time"/>
            </Col>
        </Row>

        <Row>
            <Col md={12}>
                <div className="alarm">
                    <p>Since the duration for this ICO is <strong>{props.stats.time.duration}</strong> so the results in the top will be
                        classified by <strong>{getChartFormat(props.stats.time.durationDays)}</strong></p>
                </div>
            </Col>
        </Row>

        {hasTokenPrice &&
        <div className="scan-content">

            <Row>
                <Col md={6} className="scan-content">
                    <Investors total={props.stats.money.tokenIssued} investors={props.stats.investors}
                               currency={props.currency}
                               isProvidingEtherValue={props.isProvidingEtherValue}
                               percentages={percentages}/>
                </Col>

                <Col md={6} >

                    {/*<TokenHoldersPieChart data={*/}
                        {/*getTokenHoldersChartData(props.stats.money.tokenIssued , props.stats.investors.senders, percentages)*/}
                    {/*}/>*/}
                </Col>
            </Row>

            <h3 className="title">Funds distribution</h3>
            <GroupButtons currencyValue={props.currencyValue} currency={props.currency}/>

            <Row>
                <Col md={6}>
                    <p>Number investors distributed by different scale</p>
                    <DoubleBarChart data={props.stats.charts.invetorsDistribution} ChartKey="Investors"/>
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

    </div>)
};

export default connect(
    state => ({
        currency : state.currency.currency,
        currencyValue : state.currency.value,
        stats: state.scan.stats
    }),
    null
)(ScanBoxDetails)

