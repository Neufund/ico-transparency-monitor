import React from 'react';

export const ICO = ({ transparency, icoName, ...props }) => (
  <button
    href={icoName}
    className={`transparency-button ${transparency.replace(/\s+/g, '-').toLowerCase()}-status`}
    onClick={() => { props.onModalShow(props.ico); }}
  >
    <p>Transparency</p>
    <strong> {computeICOTransparency(props.ico.matrix)[0]} <span className="fa fa-arrow-right" /> </strong>
  </button>
);
