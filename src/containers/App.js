import React from 'react';
import '../assets/css/App.css';
import { Grid } from 'react-flexbox-grid';
import ICO from '../components/ICO';
import Header from '../components/Header';
import { getICOs } from '../utils';

export default ({ ...props }) => (
  <div className="App">
    <Header />
    <Grid fluid>
      {getICOs().map(ico => <ICO key={ico.address} ico={ico} address={ico.address} />)}
    </Grid>
  </div>
);
