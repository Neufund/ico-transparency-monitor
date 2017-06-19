import React from 'react';
export const TimeDetails = ({startDate, endDate, duration}) => (
    <div>
        <h3 className="title">Time</h3>
        <div className="stats">
            <table>
                <tbody>
                <tr><th>Start</th><td>{startDate}</td></tr>
                <tr><th>Finish</th><td>{endDate}</td></tr>
                <tr><th>Duration</th><td>{duration}</td></tr>
                </tbody>
            </table>
        </div>
    </div>);

export const RaisedAmount = ({totalETH}) => (
    <div>
        <h3 className="title">Raised amount</h3>
        <div className="stats">
            <table>
            <tbody>
            <tr><th>Total amount raised in ETH</th><td>{totalETH}</td></tr>
        <tr><th>Average increasement size in ETH</th><td>??</td></tr>
        </tbody>
        </table>
        </div>
    </div>
);

export const TokenIssued = ({tokenIssued}) =>(
    <div>
        <h3 className="title">Issued tokens</h3>
        <div className="stats">
            <table>
            <tbody>
            <tr><th>Number of tokens created during the ICO</th><td>{tokenIssued}</td></tr>
        </tbody>
        </table>
        </div>
    </div>
);

export const Investors = ({investors}) => (
    <div>
        <h3 className="title">Investors</h3>
        <div className="stats">
            <table>
                <tbody>
                <tr><th>Number of investors</th><td>{Object.keys(investors.senders).length}</td></tr>
            </tbody>
            </table>
            <table className="inner-table">
                <tbody>
                <tr><th>Number of investors > 100k <strong>EUR</strong></th><td>{investors.numberInvestorsMoreThanOne100kEuro}</td></tr>
                <tr><th>Number of investors between 5k to 100k <strong>EUR</strong></th><td>{investors.numberInvestorsBetween5to100kEruo}</td></tr>
                <tr><th>Number of investors less than 500k <strong>EUR</strong></th><td>{investors.numberInvestorsLessThan500K}</td></tr>
                <tr><th>Number of investors who invested more that once</th><td>{investors.numberInvestorsWhoInvestedMoreThanOnce}</td></tr>
                </tbody>
            </table>
        </div>
        <br/>
        <br/>
        <div className="stats">
            <table>
                <tbody>
                <tr><th>Maximum investment money</th><td>{investors.maxInvestmentsMoney}</td></tr>
                <tr><th>Maximum investment tokens</th><td>{investors.maxInvestmentsTokens}</td></tr>
                <tr><th>Minimum investment</th><td>{investors.minInvestments}</td></tr>
                </tbody>
            </table>
        </div>
    </div>
)