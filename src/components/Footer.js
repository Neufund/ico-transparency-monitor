import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default() => (
  <Grid fluid className="footer">
    <Row>
      <Col md={12}>
        <p className="footer-text">If you want to give us
          feedback write us at icomonitor@neufund.org</p>
      </Col>
    </Row>
  </Grid>
);
