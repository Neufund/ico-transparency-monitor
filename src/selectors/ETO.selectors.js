import { createSelector } from 'reselect';
import EtoConfig from '../utils/ETOConfig';

const etoDataSelector = state => state.ETO.etoData;
const etoBlocksSelector = state => state.ETO.etoBlocks;
const currencySelector = state => state.currency.value;
const scanSelector = state => state.scan;
const web3Selector = state => state.modal.web3;
const blocksSelector = state => state.blocks;
const etoPropertiesSelector = (state, address) => state.ETO.properties[address];
const isComponentReadySelector = createSelector(scanSelector, scan => (scan.showStats));
const isLoadingSelector = createSelector(scanSelector, scan => (scan.showLoader));
const hasNoTransactionsSelector = createSelector(scanSelector, scan => (scan.hasNoTransactions));
const isSmartContractLoadedSelector = createSelector(scanSelector, scan => (scan.isSmartContractLoaded));
const etoConfigSelector = createSelector(
  etoBlocksSelector,
  etoDataSelector,
  (etoBlocks, etoData) => (etoData && etoBlocks) ? new EtoConfig(etoData, etoBlocks) : null
);

export {
  etoBlocksSelector,
  etoDataSelector,
  currencySelector,
  etoConfigSelector,
  isLoadingSelector,
  web3Selector,
  blocksSelector,
  isComponentReadySelector,
  isSmartContractLoadedSelector,
  hasNoTransactionsSelector,
  etoPropertiesSelector,
};
