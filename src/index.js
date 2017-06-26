import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Scan from './components/Scan';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './views/Layout';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import LoadingBar from 'react-redux-loading-bar'

import TransparencyModal from './components/transparency';
import reducer from './reducers';

const root = document.getElementById('root');

const render = (store) => {
    ReactDOM.render(
        <Provider store={store}>
            <Layout>
                <LoadingBar />
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

export const store = createStore(reducer);
render(store);
registerServiceWorker();