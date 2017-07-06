import {assert, expect, should} from 'chai';
import React from 'react';
import '../helpers/mockDom';
import { mount } from 'enzyme';
import { MockProviders, dispatch } from '../helpers/MockProviders';
import TopHeader from '../../src/components/TopHeader';
import ICO from '../../src/components/TopHeader';

describe('Header', () => {
    const appComponent = <MockProviders><TopHeader /></MockProviders>;
    let appMount;

    it('TopHeader should mount', ()=>{
       appMount = mount(appComponent);
    });
});
