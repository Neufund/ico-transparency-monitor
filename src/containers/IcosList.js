import React from 'react';
import '../assets/css/App.css';
import { Grid } from 'react-flexbox-grid';
import Header from '../components/Header';
import IcoRow from './IcoRow';
import { getICOsAsList } from '../icos_config';

export default (props) => {
  const icosList = getICOsAsList();
  return (<div className="App">
    <Header />
    <Grid fluid>
      {
        icosList.map((ico) => {
          if (typeof ico === 'undefined') { return null; }

          const { information, name, status, addedBy } = ico;
          const address = ico.crawdSaleTokenContract;
          return (<IcoRow
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
