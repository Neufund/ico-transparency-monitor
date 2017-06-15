import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Scan from './Scan';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// import {Router, Route} from 'react-router';
// using CommonJS modules
import {
    BrowserRouter,
    Route,
    Link,Switch
} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter >

        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/:name" component={Scan}/>
        </Switch>

    </BrowserRouter>

    , document.getElementById('root'));
registerServiceWorker();
