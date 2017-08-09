import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { icoTransparencyMap } from '../utils';

export const ICOScanHeader = (props) => {
  const { address, information, name, addedBy, decision, onModalShow, tokenContract } = props;
  return (
    <Row>
      <Grid className="ico-scan-header">
        <Row>
          <Col lg={6} sm={6} md={6} xs={6} className="name">
            <Row className="ico-box-container">
              <Col lg={12}>
                <div className="clearfix">
                  <div className="ico-logo">
                    <img src={information.logo} alt={address} />
                  </div>
                  <div className="ico-information">
                    <h4><a href={`/#/${props.address}`}> {name || information.aliasName}</a></h4>
                    <a className="link" rel="noopener noreferrer" target="_blank" href={information.website} >{information.website}</a>
                    {address.match('0x[A-Za-z0-9]{40}') && <a className="link" rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/address/${address}`} >View ICO contract on etherscan</a>}
                    {props.tokenContract && <a className="link" rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/token/${tokenContract}`} >View token contract on etherscan</a>}
                  </div>
                </div>

              </Col>
            </Row>
          </Col>

          <Col md={6} sm={12} xs={12}>
            <Row>
              <Col lg={4} md={1} sm={1} xs={1} />
              <Col lg={8} md={11} sm={11} xs={11} className="part transparency">
                {props.addedBy && <p className="title added-by-person">Added by <b>{addedBy}</b></p>}
                <button
                  className={`transparency-button ${decision ? decision.replace(/\s+/g, '-').toLowerCase() : ''}-status`}
                  onClick={() => {
                    onModalShow(props);
                  }}
                >
                  <p>Transparency score</p>
                  <strong>{decision ? icoTransparencyMap[decision.toUpperCase()] : ''} </strong>
                  <button>Open</button>
                </button>
              </Col>
            </Row>

          </Col>
        </Row>
      </Grid>
    </Row>
  );
};
