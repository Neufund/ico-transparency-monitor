import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Scan from './containers/Scan';
import './assets/css/index.css';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Layout from './views/Layout';
import RPCProvider from './components/RPCProvider';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import MessageBoxModal from './components/modals';
import reducer from './reducers';

const root = document.getElementById('root');

const render = (store) => {
  ReactDOM.render(
    <Provider store={store}>
      <RPCProvider>
        <Layout>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/:name" component={Scan} />
            </Switch>
          </HashRouter>
          <MessageBoxModal />
        </Layout>
      </RPCProvider>
    </Provider>, root);
};

export const store = compose(applyMiddleware(thunk))(createStore)(reducer);
render(store);
