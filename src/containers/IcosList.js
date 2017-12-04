import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import '../assets/css/App.css';
import { Grid } from 'react-flexbox-grid';
import Header from '../components/Header';
import IcoDataRow from './IcoDataRow';
import { getICOsAsList } from '../icos_config';
import { appendICO } from '../config';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icosList: [],
      hasMoreItems: true,
    };
  }

  loadIcos(page) {
    const icosList = getICOsAsList(page);
    this.setState(
      { icosList: icosList.icos,
        hasMoreItems: !(icosList.icos.length >= icosList.length) }
    );
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    const items = this.state.icosList.map((ico) => {
      if (typeof ico === 'undefined') { return null; }
      const { information, name, status, addedBy } = ico;
      const address = ico.crowdSaleTokenContract;
      appendICO(address, ico);

      return (<IcoDataRow
        key={address}
        address={address}
        information={information}
        name={name}
        status={status}
        addedBy={addedBy}
      />);
    });

    return (
      <div className="App">
        <Header />
        <Grid fluid>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadIcos.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={loader}
          >

            <div className="tracks">
              {items}
            </div>
          </InfiniteScroll>
        </Grid>
      </div>
    );
  }
}
