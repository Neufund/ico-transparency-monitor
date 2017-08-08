/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './containers/App';
import Scan from './containers/Scan';
import './assets/css/index.css';
import Layout from './views/Layout';
import RPCProvider from './components/RPCProvider';
import MessageBoxModal from './components/modals';
import withTracker from './components/withTracker';
import reducer from './reducers';

const root = document.getElementById('root');

const render = (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <RPCProvider>
        <Layout>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={withTracker(App)} />
              <Route exact path="/:name" component={withTracker(Scan)} />
            </Switch>
          </HashRouter>
          <MessageBoxModal />
        </Layout>
      </RPCProvider>
    </Provider>, root);
};

const store = createStore(reducer, applyMiddleware(thunk));
render(store);
