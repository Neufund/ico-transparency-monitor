import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ScanBox.css';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const ScanBoxDetails = ({statistics}) => (
    <Grid className="scanbox-details">
        <Row className="statistics">
            <Col md={12} className="scan-content">
                <Row>
                    <Col md={6} >
                        <h3 className="title">Time</h3>
                        <div className="stats">
                            <table>
                                <tbody>
                                    <tr><th>Start</th><td>{statistics.time.startDate}</td></tr>
                                    <tr><th>Finish</th><td>{statistics.time.endDate}</td></tr>
                                    <tr><th>Duration</th><td>{statistics.time.duration}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="title">Raised amount</h3>
                        <div className="stats">
                            <table>
                                <tbody>
                                <tr><th>Total amount raised in ETH</th><td>{statistics.money.totalETH}</td></tr>
                                <tr><th>Avarage increasement size in ETH</th><td>??</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="title">Issued tokens</h3>
                        <div className="stats">
                            <table>
                                <tbody>
                                    <tr><th>Number of tokens created during the ICO</th><td>{statistics.money.tokenIssued}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row className="statistics">
            <Col md={6}>
                <BarChart width={600} height={300} data={statistics.charts.tokensAmount} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="Tokens/Time" fill="#8884d8" />
                </BarChart>
            </Col>
            <Col md={6}>
                <BarChart width={600} height={300} data={statistics.charts.tokensCount}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="Transactions/Time" fill="#8884d8" />
                </BarChart>
            </Col>

            <Col md={6} className="scan-content">
                <h3 className="title">Investors</h3>
                <div className="stats">
                    <table>
                        <tbody>
                        <tr><th>Number of investors</th><td>{Object.keys(statistics.investors.senders).length}</td></tr>
                        </tbody>
                    </table>
                    <table className="inner-table">
                        <tbody>
                            <tr><th>Number of investors > 100k <strong>EUR</strong></th><td>{statistics.investors.numberInvestorsMoreThanOne100kEuro}</td></tr>
                            <tr><th>Number of investors between 5k to 100k <strong>EUR</strong></th><td>{statistics.investors.numberInvestorsBetween5to100kEruo}</td></tr>
                            <tr><th>Number of investors less than 500k <strong>EUR</strong></th><td>{statistics.investors.numberInvestorsLessThan500K}</td></tr>
                            <tr><th>Number of investors who invested more that once</th><td>{statistics.investors.numberInvestorsWhoInvestedMoreThanOnce}</td></tr>
                        </tbody>
                    </table>


                </div>
                <br/>
                <br/>
                <div className="stats">
                    <table>
                        <tbody>

                        <tr><th>Maximum investment money</th><td>{statistics.investors.maxInvestmentsMoney}</td></tr>
                        <tr><th>Maximum investment tokens</th><td>{statistics.investors.maxInvestmentsTokens}</td></tr>
                        <tr><th>Minimum investment</th><td>{statistics.investors.minInvestments}</td></tr>

                        </tbody>
                    </table>
                </div>

            </Col>
            <Col md={6}>

                { statistics.charts.invetorsDistribution != null  &&
                    <BarChart width={600} height={300} data={[
                    {
                        name: 'x < 10k',
                        Investors: statistics.charts.invetorsDistribution['l10k'][1],
                        Ether: statistics.charts.invetorsDistribution['l10k'][0],
                    },
                    {
                        name: '10k>x>100k',
                        Investors: statistics.charts.invetorsDistribution['g10kl100k'][1],
                        Ether: statistics.charts.invetorsDistribution['g10kl100k'][0],
                    },
                    {
                        name: '100k>x>500k',
                        Investors: statistics.charts.invetorsDistribution['g100kl500k'][1],
                        Ether: statistics.charts.invetorsDistribution['g100kl500k'][0],
                    },
                    {
                        name: 'x > 500k',
                        Investors: statistics.charts.invetorsDistribution['g500k'][1],
                        Ether: statistics.charts.invetorsDistribution['g500k'][0],
                    },
                ]}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="Investors" fill="#8884d8" />
                    <Bar dataKey="Ether" fill="#82ca9d" />
                    </BarChart>
                }
            </Col>
        </Row>

    </Grid>
);

export default ScanBoxDetails;

