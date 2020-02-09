/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactPixel from 'react-facebook-pixel';
import thunk from 'redux-thunk';

import { Route, Switch, HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import RPCProvider from './components/RPCProvider';
import MessageBoxModal from './components/modals';
import withTracker from './components/withTracker';
import reducer from './reducers';
import env from './env.json';
import IcosList from './containers/IcosList';
import InnerIcoPage from './containers/InnerIcoPage';
import ICOStatsPage from './containers/ICOStatsPage';
import './assets/css/index.css';
import { IframeCssTweaker } from './components/IframeCssTweaker';
import ETOStatsPage from './containers/ETOStatsPage';

ReactPixel.init(env.fbPixelId);
ReactPixel.pageView();

const root = document.getElementById('root');

const render = (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <RPCProvider>
        <IframeCssTweaker >
          <HashRouter>
            <Switch>
              <Route exact path="/" component={withTracker(IcosList)} />
              <Route exact path="/:name" component={withTracker(InnerIcoPage)} />
              <Route exact path="/stats/:name" component={withTracker(ICOStatsPage)} />
              <Route exact path="/eto-stats/:etoId" component={withTracker(ETOStatsPage)} />
            </Switch>
          </HashRouter>
        </IframeCssTweaker>
        <MessageBoxModal />
      </RPCProvider>
    </Provider>, root);
};

const store = createStore(reducer, applyMiddleware(thunk));

render(store);
