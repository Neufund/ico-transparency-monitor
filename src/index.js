import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Scan from './containers/Scan';
import './assets/css/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './views/Layout';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {promise} from "redux-promise-middleware";
import thunk from 'redux-thunk';
import TransparencyModal from './components/transparency';
import reducer from './reducers';


const root = document.getElementById('root');
const render = (store) => {
    ReactDOM.render(
        <Provider store={store}>
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/:name" component={Scan}/>
                    </Switch>
                </BrowserRouter>
                <TransparencyModal/>
            </Layout>
        </Provider> , root);
};

export const store = compose(applyMiddleware(thunk))(createStore)(reducer);
render(store);