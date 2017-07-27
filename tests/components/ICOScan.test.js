import { ICOScan } from '../../src/components/ICOScan'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme';
import { Col } from 'react-flexbox-grid';

describe('<ICOScan/>', () => {

  let initProps = {
    isLoading:false,
    web3 : {
      key : 'test'
    },
    showLoader:false,
    symbol: "TEST",
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
    totalSupply: 9000000
  }


  const render = (props) => {
    const component = (
      <ICOScan {...props} />
    )
    return shallow(component)
  }

  it('should not load the cap part becuase it is loading the content', () => {
    initProps.showLoader = true;
    const rendered = render(initProps);
    expect(rendered.find('.scanbox-details-parameters')).not.to.contain((
      <Col md={3} className="part">
        <p className="title">
          Declared Cap
        </p>
        <strong className="desc">
          123 ETH
        </strong>
      </Col>
    ))
  });

  it('should render', () => {
    initProps.showLoader = false;
    const rendered = render(initProps)
    expect(rendered.find('.scanbox-details-parameters')).to.contain((
      <Col md={3} className="part">
        <p className="title">
          Declared Cap
        </p>
        <strong className="desc">
          123 ETH
        </strong>
      </Col>
    ))
  });

  it('should have the loading bar with class show', () => {
    initProps.isLoading = true;
    const rendered = render(initProps)
    expect(rendered.find('#loadingProgressG').hasClass('show')).to.equal(true)
  });

  it('should have the loading bar with class hide', () => {
    initProps.isLoading = false;
    const rendered = render(initProps)
    expect(rendered.find('#loadingProgressG').hasClass('hide')).to.equal(true)
  });

  it('should hide the cap part becuase it\'s null', () => {
    initProps.showLoader = false;
    initProps.cap = null;
    const rendered = render(initProps)
    expect(rendered.find('.scanbox-details-parameters')).to.contain((
      <Col md={3} className="part">
        <p className="title">
          Declared Cap
        </p>
      </Col>
    ))
  });

  it('should print Not Available instead of the value because null is passed', () => {
    initProps.showLoader = false;
    initProps.symbol = null;
    const rendered = render(initProps)
    expect(rendered.find('.scanbox-details-parameters')).to.contain((
      <Col md={2} className="part">
        <p className="title">
          Token symbol
        </p>
        <strong className="desc">
          Not Available
        </strong>
      </Col>
    ))

  });

})
