import React from 'react';
import GoogleAnalytics from 'react-ga';
import config from '../env.json';

const trackingCodeSet = config.GaTrackingId !== undefined && config.GaTrackingId !== '';

if (trackingCodeSet) {
  let options = {};

  if (process.env.NODE_ENV !== 'production') {
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
    if (trackingCodeSet) {
      trackPage(page);
    }

    return (
      <WrappedComponent {...props} />
    );
  };
};

export default withTracker;
