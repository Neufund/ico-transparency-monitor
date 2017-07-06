import React from 'react';
import {formatNumber} from '../utils';
import {tokenHoldersPercentage} from '../utils/charts';

export const TimeDetails = ({startDate, endDate, duration}) => (
    <div>
        <h3 className="title">Time</h3>
        <div className="stats">
            <table>
                <tbody>
                <tr><th>First transaction date </th><td>{startDate}</td></tr>
                <tr><th>Last transaction date</th><td>{endDate}</td></tr>
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
            <tr><th>Total amount raised in ETH</th><td>{formatNumber(totalETH)}</td></tr>
        </tbody>
        </table>
        </div>
    </div>
);

export const TokenIssued = ({tokenIssued}) =>(
    <div>
        <h3 className="title">Tokens issuance</h3>
        <div className="stats">
            <table>
            <tbody>
            <tr><th>Number of tokens created during the ICO</th><td>{formatNumber(tokenIssued)}</td></tr>
        </tbody>
        </table>
        </div>
        <div className="stats">
            <table>
                <tbody>
                {/*<tr><th>Number of investors</th><td>{Object.keys(investors.senders).length}</td></tr>*/}
                </tbody>
            </table>
            <table className="inner-table">
                <tbody>
                {/*<tr><th>Number of investors > 100k <strong>{currency}</strong></th><td>{formatNumber(investors.numberInvestorsMoreThanOne100kEuro)}</td></tr>*/}
                {/*<tr><th>Number of investors between 5k to 100k <strong>{currency}</strong></th><td>{formatNumber(investors.numberInvestorsBetween5to100kEruo)}</td></tr>*/}
                {/*<tr><th>Number of investors less than 500k <strong>{currency}</strong></th><td>{formatNumber(investors.numberInvestorsLessThan500K)}</td></tr>*/}
                {/*<tr><th>Number of investors who invested more that once</th><td>{formatNumber(parseInt(investors.numberInvestorsWhoInvestedMoreThanOnce))}</td></tr>*/}
                </tbody>
            </table>
        </div>

    </div>
);

export const Investors = ({total, investors , percentages}) => {
    return(
        <div>
            <h3 className="title">Token distribution</h3>
            <div>
                <div className="stats">
                    <table>
                        <tbody>
                        {/*<tr><th>Maximum investment money</th><td>{formatNumber(investors.maxInvestmentsMoney)}</td></tr>*/}
                        {/*<tr><th>Maximum investment tokens</th><td>{formatNumber(investors.maxInvestmentsTokens)}</td></tr>*/}
                        {/*<tr><th>Minimum investment</th><td>{formatNumber(investors.minInvestments)}</td></tr>*/}
                        </tbody>
                    </table>
                </div>
            </div>
            <table className="table table-responsive">
                <thead>
                    <tr><th>Investors percentage</th><th>Token percentage</th></tr>
                </thead>
                <tbody>
                {
                    tokenHoldersPercentage(total,investors.senders,percentages).map((item, index)=>{
                        const key = Object.keys(item)[0];
                        return <tr key={Math.random()}><td key={key}>{key*100}%</td><td>{item[key]}%</td></tr>
                        })
                }
                </tbody>
            </table>

        </div>)
};