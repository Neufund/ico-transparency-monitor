import React from 'react';
import { Grid } from 'react-flexbox-grid';
import '../assets/css/App.css';
import Header from '../components/Header';
// eslint-disable-next-line import/no-named-as-default
import IcoDataRow from './IcoDataRow';
import { getICOsAsList } from '../icos_config';

export default () => {
  const icosList = getICOsAsList();
  return (<div className="App">
    <Header />
    <Grid fluid>
      {
        icosList.map((ico) => {
          if (typeof ico === 'undefined') { return null; }

          const { information, name, status, addedBy } = ico;
          const address = ico.crowdSaleTokenContract;
          return (<IcoDataRow
            key={address}
            address={address}
            information={information}
            name={name}
            status={status}
            addedBy={addedBy}
          />);
        })
      }
    </Grid>
  </div>);
};
