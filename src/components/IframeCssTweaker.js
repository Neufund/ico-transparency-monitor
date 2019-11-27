import React, { Component } from 'react';
import { connect } from 'react-redux';
import { web3Connection } from '../actions/web3';

export class IframeCssTweaker extends Component {

  componentWillMount() {
    this.setBackgroundColor();
  }

  checkIframe () {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  setBackgroundColor() {
    const root = document.documentElement;
    console.log(">>--->> this is an iframe:", this.checkIframe())
    if(this.checkIframe()){
      const body = document.getElementsByTagName('body')[0]
      body.classList.add('body-iframe')
    }
  }

  render() {
    return this.props.children;
  }
}




