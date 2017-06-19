import React from 'react';
import Layout from './views/Layout';
import App from './App';

const page = View => () => <Layout><View /></Layout>;

// Routes for redux-router-kit
const routes = {
    '/': page(App),
};

export default routes;
