import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import GroupButtons from './GroupButtons';
import '../assets/css/ScanBox.css';
import {connect} from 'react-redux';
import {TimeDetails, RaisedAmount, TokenIssued, Investors} from './details'
import {SingleBarChart} from './charts'
import {default as config} from '../config.js';

const ScanBoxDetails = ({...props}) => {
    return (props.currencyValue && <div className="scanbox-details">
        <Row className="statistics">
            <Col md={12} className="scan-content">
                <p> Actual values from ICO transactions analysis: </p>
                <TimeDetails {...props.stats.time}/>
                {props.totalSupply &&
                <TokenIssued totalSupply={props.totalSupply} tokenIssued={props.stats.money.tokenIssued}/> }
            </Col>
        </Row>

        <Row className="statistics">
            <Col md={6}>
                <p>
                    Chart Title: Tokens Created over Time
                    X Axis: depends on time scale (Blocks, Hours, Days)
                    Y Axis: Tokens Created
                </p>
                <SingleBarChart data={props.stats.charts.transactionsCount} dataKey={'Tokens/' + props.stats.time.scale}
                                xLabel={props.stats.time.scale.capitalizeTxt()} yLabel="Transactions"/>
            </Col>
            <Col md={6}>
                <p>
                    Chart Title: Transactions over Time
                    X Axis: depends on time scale (Blocks, Hours, Days)
                    Y Axis: Transaction
                </p>
                <SingleBarChart data={props.stats.charts.tokensCount} dataKey="Transactions/Time"
                                xLabel={props.stats.time.scale.capitalizeTxt()} yLabel="Tokens"/>
            </Col>
        </Row>

        {props.matrix.q5.answer &&
        <div className="scan-content">

            <Row>
                <Col md={6} className="scan-content">
                    <Investors total={props.stats.money.tokenIssued}
                               investors={props.stats.investors}
                               currency={props.currency}
                               isProvidingEtherValue={props.isProvidingEtherValue}
                               tokenHolders={props.stats.charts.tokenHolders}/>
                </Col>
                <Col md={6}>
                    <p></p>

                    <SingleBarChart dataKey="TokenHolders" data={props.stats.charts.tokenHolders}
                                    xLabel={"Top Wealthiest Investors"} yLabel="Share of Tokens Owned"/>
                </Col>
            </Row>

            <RaisedAmount totalETH={props.stats.money.totalETH}/>

            <h3 className="title">Funds distribution</h3>

            <GroupButtons currencyValue={props.currencyValue} currency={props.currency}/>
            <Row>
                <Col md={12}>
                    <p>Title: Number of Investors with Ticket of Size
                        X Axis: Ticket Size in [currency]
                        Y Axis: Number of Investors</p>
                    <SingleBarChart data={props.stats.charts.investorsDistribution} dataKey="Investors"/>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <p>Title: Total Amount Invested with Ticket of Size
                        X Axis: Ticket Size in [currency]
                        Y Axis: Total Amount Invested</p>
                    <SingleBarChart data={props.stats.charts.investmentDistribution} dataKey="Investments"/>
                </Col>
            </Row>
        </div>}

        {!props.matrix.q5.answer &&
        <div className="alarm">
            <p>No statistics: This ICO Is not providing information on token price in ETH</p>
        </div>}
        [Download Raw Data as CSV]
    </div>)
};

const mapStateToProps = (state, props) => {
    // console.log(state.scan.stats);
    return {
        currency: state.currency.currency,
        currencyValue: state.currency.value,
        stats: state.scan.stats,
        ...state.ICO.icos[props.address],
        matrix: config.ICOs[props.address].matrix

    }
};


export default connect(
    mapStateToProps,
    null
)(ScanBoxDetails)

