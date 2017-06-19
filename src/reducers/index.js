import { combineReducers } from 'redux';
import modal from './modal';
import scan from './scan';
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
    scan,
    modal,
    loadingBar: loadingBarReducer
});