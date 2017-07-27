import { assert, expect, should } from 'chai';
import React from 'react';
import '../helpers/mockDom';
import { shallow,mount,render } from 'enzyme';
import { MockProviders, dispatch } from '../helpers/MockProviders';
import TopHeader from '../../src/components/TopHeader';
import ICO from '../../src/components/TopHeader';

describe('Header', () => {
  const appComponent = <TopHeader />;
  let appMount;

  it('TopHeader should mount', () => {
    shallow(appComponent);
  });
});
