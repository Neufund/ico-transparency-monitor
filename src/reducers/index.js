import { combineReducers } from 'redux';
import modal from './modal';
import scan from './scan';
import currency from './currency';
import ICO from './icos';
import blocks from './blocks';

export default combineReducers({
  scan,
  modal,
  currency,
  ICO,
  blocks,
});
