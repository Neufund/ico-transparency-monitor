import React from 'react';
import GoogleAnalytics from 'react-ga';
import config from '../env.json';

if (config.env !== 'dev') {
  let options = {};

  if (config.env === 'stage') {
    options =
      {
        debug: true,
      };
  }
  GoogleAnalytics.initialize(config.GaTrackingId, options);
}

const withTracker = (WrappedComponent) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({ page });
    GoogleAnalytics.pageview(page);
  };

  return (props) => {
    const page = props.location.pathname;
    if (config.env !== 'dev') {
      trackPage(page);
    }

    return (
      <WrappedComponent {...props} />
    );
  };
};

export default withTracker;
