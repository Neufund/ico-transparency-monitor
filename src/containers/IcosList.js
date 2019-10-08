import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Row } from 'react-flexbox-grid';
import '../assets/css/App.css';
import Header from '../components/Header';
// eslint-disable-next-line import/no-named-as-default
import IcoDataRow from './IcoDataRow';
import { getICOsAsList, search } from '../icos_config';
import { appendICO } from '../config';
import SearchBox from '../components/SearchBox';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icosList: [],
      hasMoreItems: true,
      lockLoadMore: false,
      page: 0,
      searchTerm: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.length === 0) {
      this.setState({ lockLoadMore: false, hasMoreItems: true });
      return;
    }
    const icos = search(e.target.value);
    this.setState({
      icosList: icos,
      lockLoadMore: true,
      searchTerm: e.target.value,
    });
  }

  loadIcos(page) {
    if (this.state.lockLoadMore) { return; }
    const icosList = getICOsAsList(page);
    const icos = icosList.icos.filter(i => !i.hide);
    this.setState(
      {
        icosList: icos,
        hasMoreItems: icosList.icos.length < icosList.length,
        page,
      }
    );
  }

  render() {
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

    if (window.location.pathname === '/recent') {
      return (<div className="App">
        <InfiniteScroll
          pageStart={0}
          // eslint-disable-next-line react/jsx-no-bind
          loadMore={this.loadIcos.bind(this)}
          hasMore={this.state.hasMoreItems}
        >
          {items.slice(0, 3)}
        </InfiniteScroll>
      </div>);
    }

    return (
      <div className="App">
        <Header />
        <Grid fluid>
          <Row>
            <Grid>
              <Row>
                <SearchBox onChange={this.onChange} />
              </Row>
            </Grid>
          </Row>
          <InfiniteScroll
            pageStart={0}
            // eslint-disable-next-line react/jsx-no-bind
            loadMore={this.loadIcos.bind(this)}
            hasMore={this.state.hasMoreItems}
          >

            <div className="tracks">
              {items}

              {items.length <= 0 &&
              <div className="icos-not-found">
                <Row className="ico-container">
                  <Grid className="alarm">
                    <h3>Not Found: </h3>
                    <p>No ICO has matched the keyword <i>{this.state.searchTerm}</i></p>
                  </Grid>
                </Row>
              </div>
              }
            </div>
          </InfiniteScroll>
        </Grid>
      </div>
    );
  }
}
