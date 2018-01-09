import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { icoTransparencyMap, isCorrectTokenAddress } from '../utils';
import { isNeufundAddress } from '../utils/web3';
import ShareButtons from './ShareButtons';

export default (props) => {
  const { address, information, addedBy, decision,
    tokenContract, toggleTable, readMoreButton } = props;
  const eventName = isNeufundAddress(address) ? 'ICBM' : 'ICO';

  return (
    <Row>
      <Grid className="ico-scan-header">
        <Row>
          <Col lg={6} md={6} sm={12} xs={12} className="name">
            <Row className="ico-box-container">
              <Col lg={12}>
                <div className="clearfix">
                  <div className="ico-logo">
                    <img src={information.logo} alt="" />
                  </div>
                  <div className="ico-information">
                    <h4><a href={`/#/${address}`}> {information.name}</a></h4>
                    <a
                      className="link"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={information.website}
                      onClick={e => e.stopPropagation()}
                    >{eventName} Page</a>
                    {address && isCorrectTokenAddress(address) && <a className="link" rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/address/${address}`} >View {eventName} contract on etherscan</a>}
                    {tokenContract && <a className="link" rel="noopener noreferrer" target="_blank" href={`https://etherscan.io/token/${tokenContract}`} >View token contract on etherscan</a>}
                    <ShareButtons projectName={information.name} />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Row>
              <Col lg={4} md={1} sm={1} xs={1} />
              <Col lg={8} md={11} sm={11} xs={11} className="part transparency">
                {addedBy && <p className="title added-by-person">Added by <b>{addedBy}</b></p>}
                <button
                  className={`transparency-button ${decision ? decision.replace(/\s+/g, '-').toLowerCase() : ''}-status`}
                  onClick={() => {
                    toggleTable();
                  }}
                >
                  <p>Transparency score</p>
                  <strong>{decision ? icoTransparencyMap[decision.toUpperCase()] : ''} </strong>
                  <span className="read-more">{readMoreButton}</span>
                </button>

              </Col>
            </Row>

          </Col>
        </Row>
      </Grid>
    </Row>
  );
};
