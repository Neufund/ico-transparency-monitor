import React from 'react';

export const ICO = ({ transparency, icoName, ...props }) => (
  <button
    href={icoName}
    className={`transparency-button ${transparency}-status`}
    onClick={() => { props.onModalShow(props.ico); }}
  >
    <p>Transparency</p>
    <strong> {transparency} <span className="fa fa-arrow-right" /> </strong>
  </button>
);
