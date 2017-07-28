import { ICOApp } from '../../src/components/ICOApp';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { tid } from '../testUtils';
import sinon from 'sinon';

describe('<ICOApp/>', () => {
  const render = (props) => {
    const component = (
      <ICOApp {...props} />
    );

    return shallow(component);
  };

  it('should render', () => {
    const rendered = render({
      address: '0x123',
      information: {
        aliasName: 'Test ICO',
        logo: 'favicon.co',
        website: 'https://example.com/',
      },
      name: 'Test ico',
      cap: '123 ETH',
      startDate: '01.01.2017',
      endDate: '31.01.2017',
      status: 'Successful',
      addedBy: 'Chris',
      decision: 'Transparent',
    });

    expect(rendered.find('.ico-information')).to.contain((
      <div className="ico-information">
        <h4><a href={'/#/0x123'}>Test ico</a></h4>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://example.com/"
        >https://example.com/</a>
      </div>
    ));
    expect(tid(rendered, 'ico-app-cap')).to.contain(<strong className="desc">123 ETH</strong>);
  });

  it('should call open modal callback', () => {
    const onModalShowSpy = sinon.spy();
    const rendered = render({
      address: '0x123',
      information: {
        aliasName: 'Test ICO',
        logo: 'favicon.co',
        website: 'https://example.com/',
      },
      name: 'Test ico',
      cap: '123 ETH',
      startDate: '01.01.2017',
      endDate: '31.01.2017',
      status: 'Successful',
      addedBy: 'Chris',
      decision: 'Transparent',
      onModalShow: onModalShowSpy,
    });

    rendered.find('.transparency-button').simulate('click', { stopPropagation() {} });

    expect(onModalShowSpy).to.have.been.calledOnce;
  });
});
