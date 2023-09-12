import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };
  
  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="input-group">
      <div className="form-outline" style={{"border-radius": "10em", "background": "linear-gradient(to right, #F0B6D5, #A38495);"}}>
        <input
          type="search"
          className="form-control"
          placeholder="Search for product"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-dark"
        onClick={handleSearchClick}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBox;
