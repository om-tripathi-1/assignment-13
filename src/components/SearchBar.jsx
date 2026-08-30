import React from 'react'

const SearchBar = ({value, onChange}) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={onChange}
      className="search-input"
    />
  );

}

export default SearchBar