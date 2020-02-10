import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TopHeader from '../components/TopHeader';

export default () => (
  <Grid>
    <Row>
      <TopHeader />
    </Row>
    <Row>
      <Grid fluid className="header-paragraph">
        <Row >
          <Col md={12} className="relative">
            <div className="title">
              <h6 >Transparency Monitor</h6>
            </div>
            <p>Transparency Monitor has long been the go-to place for investors and journalists to
              learn whether a given ICO is transparent and can be trusted. The market changed,
              and with the transition from ICO to STO, we decided to continue monitoring blockchain
              fundraising.
            </p>
            <div>
              <p>We evaluate all STOs (and previously ICOs) based on their smart contracts, and assign
                each a status as follows:</p>
              <ul>
                <li><p>Non-transparent: One or more essential dimensions of trust and security receive
                  an unfavorable rating.</p></li>
                <li><p>Transparent with issues: One or more non-essential dimensions of trust and security
                  receive an unfavorable rating.</p></li>
                <li>
                  <p>Transparent: All dimension of trust and security receive a favorable rating.</p>
                </li>
              </ul>
              <p>Please read detailed explanation
                <a
                  href="https://github.com/Neufund/ico-transparency-monitor#transparency-questionnaire"
                  target="_blank"
                  rel="noopener noreferrer"
                > here</a>.
              </p>
            </div>
            <p>
              The Transparency Monitor is an open platform. We take no responsibility for the information published or data provided, nor assume any
              liability of their accuracy.

            </p>
            <p className="center">
              <a
                href="https://bitcointalk.org/index.php?topic=2488683.0"
                target="_blank"
                className="btn-blue"
                rel="noopener noreferrer"
              >
                Join the discussion on BitcoinTalk
              </a>
            </p>
          </Col>
        </Row>
      </Grid>
    </Row>
  </Grid>
);
