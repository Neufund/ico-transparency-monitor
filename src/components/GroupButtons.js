import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './GroupButtons.css';

const CurrencyButton = ({currencyValue,currency}) => (
    <Row >
        <Col md={4}>
            <p>Converted to:</p>
            <ul className="currency-buttons">
                <li><a>EUR</a></li>
                <li><a>USD</a></li>
                <li><a>BTC</a></li>
                <li><a>ETH</a></li>
            </ul>
        </Col>

        <Col md={4}>
            <p>Exchange rate:</p>
            <ul className="currency-buttons">
                <li><a>Day of ICO end</a></li>
                <li><a>Current</a></li>

            </ul>
        </Col>
        <Col md={4}>
            <span>On: </span> <storng>ETH 1 / {currency} {currencyValue} </storng>
        </Col>
    </Row>
);

export default CurrencyButton;

