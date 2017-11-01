import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const Header = () => (
  <Grid fluid className="header-paragraph">
    <Row>
      <Grid>
        <Row >
          <Col md={12} className="relative">
            <div className="title">
              <h6 >ICO Transparency Monitor</h6>
            </div>
            <p>A go to place for investors and journalists to learn whether a given ICO is transparent and can be trusted.
              The ICO Monitor serves as a transparency benchmark for the community to better evaluate offerings and make
              informed decisions based on objective metrics.
            </p>
            <div>
              We evaluate all ICOs based on their smart contracts.
              <ul>
                <li><p>Non-transparent: this rating means that one or more essential dimensions of trust and security receive an unfavorable rating.</p></li>
                <li><p>Transparent with issues: this rating means that one or more non-essential dimensions of trust and security receive an unfavorable rating.</p></li>
                <li><p>Transparent: this rating means that all dimension of trust and security receive a favorable rating.</p></li>
              </ul>
              Please read detailed explanation <a href="https://github.com/Neufund/ico-transparency-monitor#transparency-questionnaire" target="_blank" rel="noopener noreferrer">here</a>.
            </div>
            <p>
                ICO Monitor is an open platform. We take no responsibility for the information published or data provided.
                We also do not assume any liability of their correctness.
            </p>
            <a href="https://github.com/Neufund/ico-transparency-monitor#adding-custom-icos-to-the-transparency-monitor" target="_blank" className="add-new-ico" rel="noopener noreferrer">
              <i className="fa fa-plus" aria-hidden="true" />Submit New ICO or Update HERE! for free</a>
          </Col>
        </Row>
      </Grid>
    </Row>
  </Grid>
);

export default Header;

