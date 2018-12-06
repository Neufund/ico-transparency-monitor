import React from 'react';

export default ({ onChange }) => (
  <div className="search-wrap">
    <div className="search">
      <input
        type="text"
        className="searchTerm"
        placeholder="Search for ICO/STO ..."
        onChange={onChange}
      />
      <button type="submit" className="searchButton">
        <i className="fa fa-search" />
      </button>
    </div>
  </div>
);
