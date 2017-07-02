import { combineReducers } from 'redux';
import modal from './modal';
import scan from './scan';
import currency from './currency';

export default combineReducers({
    scan,
    modal,
    currency
});