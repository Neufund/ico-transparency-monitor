import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default({message}) => (
  <Grid fluid className="well error-box">
    <Row>
      <Col md={12}>
        <h1 className="notfound-404">404</h1>
         <p className="message">{message}</p> 
        <p className="was-not-found">Was not found</p>
        <a className="back-main" href="/">Back to main page</a>
      </Col>
    </Row>
  </Grid>
);
