import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/ScanBox.css';

const ScanBoxLoadingMessage = ({ longLoading }) => {
  const caption = longLoading ?
    'ICO Scanning in process, please wait this one is big it will take a while...'
    :
    'ICO Scanning in process, please wait ...';
  return (<Row>
    <Col md={12} className="scan-message-loading">
      <div className="alarm">
        <p>{caption}</p>
      </div>
    </Col>
  </Row>
  );
};

ScanBoxLoadingMessage.propTypes = {
  longLoading: PropTypes.bool,
};

ScanBoxLoadingMessage.defaultProps = {
  longLoading: false,
};

export default ScanBoxLoadingMessage;
