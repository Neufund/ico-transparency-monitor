import { assert } from 'chai';
import { getEtherPerCurrency } from '../src/utils';

describe('getEtherPerCurrency', () => {
    it('accepts date and currency', () => {
        getEtherPerCurrency((e)=>{
            console.log(e);
        })
    });
});
