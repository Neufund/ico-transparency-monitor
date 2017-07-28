import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { deepFreeze } from '../../src/utils';
import reducer from '../../src/reducers';

// Always deep-freeze state during tests
const wrapReducer = next => (...args) => deepFreeze(next(...args));

// Create the Redux store
export const store = createStore(wrapReducer(reducer));
export const { getState } = store;
export const dispatch = actions =>
  Array.isArray(actions) ? actions.forEach(action => store.dispatch(action)) : dispatch([actions]);

export const MockProviders = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

MockProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MockProviders;
