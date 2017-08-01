import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import '../assets/css/ScanBox.css';

const ScanBoxLoadingMessage = ({ alternativeLoadingMsg }) => {
  const caption = alternativeLoadingMsg !== null ?
    alternativeLoadingMsg
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
  alternativeLoadingMsg: PropTypes.string,
};

ScanBoxLoadingMessage.defaultProps = {
  alternativeLoadingMsg: null,
};

export default ScanBoxLoadingMessage;
