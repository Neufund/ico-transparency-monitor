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
      etoData: null,
      page: 0,
      searchTerm: '',
    };
    this.onChange = this.onChange.bind(this);

    fetch('https://platform.neufund.org/api/eto-listing/etos/0x73E44092B5A886a37bea74bFc90911D0c98F6A15')
      .then(response => response.json())
      .then((data) => {
        this.setState({ etoData: {
            maxCap: data.equity_tokens_per_share * data.minimum_new_shares_to_issue,
            minCap: data.equity_tokens_per_share * data.new_shares_to_issue,
            equity_token_symbol: data.equity_token_symbol,
            equity_token_image: data.equity_token_image,
            previewCode: data.previewCode,
            start_date: data.start_date,
            duration: data.duration,
            state: data.state,
            on_chain_state: data.on_chain_state,
            equity_token_contract_address: data.equity_token_contract_address,
            currencies: data.currencies,
            public_duration_days: data.public_duration_days,
          }});
        fetch('https://platform.neufund.org/api/eto-listing/companies/' + data.company_id)
          .then(response => response.json())
          .then((companyData) => {
            console.log(companyData);
          });
      });
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
