import React, { Component } from 'react';

export default class IframeCssTweaker extends Component {
  componentWillMount() {
    this.setBackgroundColor();
  }

  setBackgroundColor() {
    const root = document.documentElement;
    if (this.checkIframe()) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('body-iframe');
    }
  }

  checkIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }


  render() {
    return this.props.children;
  }
}

