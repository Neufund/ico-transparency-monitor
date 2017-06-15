import React from 'react';
import {Table} from 'react-bootstrap';

const TransparancyTable = ({logo}) => (
        <Table striped bordered condensed hover>
            <thead>
                <tr><th>Question</th><th>Answer</th></tr>
            </thead>
            <tbody>
                <tr><td>Is ICO controlled by a smart contract?</td><td></td></tr>
                <tr><td>Is smart contract source code available?</td><td></td></tr>
                <tr><td>Is smart contract source code provided in etherscan?</td><td></td></tr>
                <tr><td>Is instruction provided how to reproduce deployed bytecode? (does not apply if etherscan source is there)</td><td></td></tr>
                <tr><td>Does smart contract provide all tracking data via events?</td><td></td></tr>
                <tr><td>Is information on token price in ETH provided? (via event or in transaction?)</td><td></td></tr>
                <tr><td>Does smart contract handle ETH in a trustless way?</td><td></td></tr>
                <tr><td>If ICO is using other currencies is information on token price provided?</td><td></td></tr>
                <tr><td>Does smart contract handle other currencies in a trust less way? Does some smart contract store balance of those currencies?</td><td></td></tr>
                <tr><td>Was smart contract code easy to read and properly commented?</td><td></td></tr>

            </tbody>
        </Table>
);

export default TransparancyTable;

