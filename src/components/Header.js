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
            <p>A go to place for investors and journalists to learn whether a given ICO is transparent and
                            can be trusted. The ICO Monitor serves as a transparency benchmark for the community to
                            better evaluate offerings and make informed decisions based on objective metrics.</p>
            <a href="https://github.com/Neufund/ico-transparency-monitor#adding-custom-icos-to-the-transparency-monitor" target="_blank" className="add-new-ico"><i className="fa fa-plus" aria-hidden="true"/>Submit New ICO or Update HERE!</a>
          </Col>
        </Row>
      </Grid>
    </Row>
  </Grid>
);

export default Header;

