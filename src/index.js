/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import IcosList from './containers/IcosList';
import InnerIcoPage from './containers/InnerIcoPage';
import './assets/css/index.css';
import Layout from './views/Layout';
import RPCProvider from './components/RPCProvider';
import MessageBoxModal from './components/modals';
import withTracker from './components/withTracker';
import reducer from './reducers';
import env from './env.json';
import ReactPixel from 'react-facebook-pixel';

ReactPixel.init(env.fbPixelId);
ReactPixel.pageView();

const root = document.getElementById('root');

const render = (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <RPCProvider>
        <Layout>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={withTracker(IcosList)} />
              <Route exact path="/:name" component={withTracker(InnerIcoPage)} />
            </Switch>
          </HashRouter>
          <MessageBoxModal />
        </Layout>
      </RPCProvider>
    </Provider>, root);
};

const store = createStore(reducer, applyMiddleware(thunk));
render(store);
