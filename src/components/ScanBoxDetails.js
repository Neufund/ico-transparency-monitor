import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GroupButtons from './GroupButtons';
import './ScanBox.css';
import { connect } from 'react-redux';
import {TimeDetails , RaisedAmount, TokenIssued, Investors} from './details'
import {TokensBarChart , DoubleBarChart} from './charts'


const ScanBoxDetails = ({...props}) =>

    (props.currency && <Grid className="scanbox-details">
            <Row className="statistics">
                <Col md={12} className="scan-content">
                    <Row>
                        <Col md={6} >
                            <TimeDetails {...props.stats.time}/>
                            <RaisedAmount totalETH={props.stats.money.totalETH}/>
                            <TokenIssued tokenIssued={props.stats.money.tokenIssued} />
                        </Col>
                    </Row>

                    <GroupButtons currencyValue={props.currencyValue}  currency={props.currency}/>

                </Col>
            </Row>

        <Row className="statistics">
            <Col md={6}>
                <TokensBarChart data={props.stats.charts.tokensAmount}  dataKey="Tokens/Time"/>
            </Col>
            <Col md={6}>
                <TokensBarChart data={props.stats.charts.tokensCount} dataKey="Transactions/Time"/>
            </Col>

            <Col md={6} className="scan-content">

                <Investors investors={props.stats.investors} currency={props.currency}/>

            </Col>
            <Col md={6}>
                <DoubleBarChart data={props.stats.charts.invetorsDistribution}/>
            </Col>
        </Row>

    </Grid>
);

export default connect(
    state => ({
        currency : state.scan.currency,
        currencyValue : state.scan.currencyValue,
        stats: state.scan.stats
    }),
    null
)(ScanBoxDetails)

