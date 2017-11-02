import React from 'react';
import '../assets/css/App.css';
import { Grid } from 'react-flexbox-grid';
import Header from '../components/Header';
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
          const address = ico.crawdSaleTokenContract;
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
