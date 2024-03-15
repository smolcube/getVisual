import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import ButtonIcon from "./ButtonIcon";

export default function SearchBanner() {
  console.log('searchbanner')
    
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    console.log('search  button clicked')
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    // Perform search functionality with searchValue
    console.log("Searching for:", searchValue);
  };

  const handleCloseClick = () => {
    setShowInput(false);
    setSearchValue("");
  };

  return (
    <div className="search-banner">
      {!showInput ? (
        <ButtonIcon 
          className="search-icon" 
          onClick={handleSearchClick}
          id="search"
          ionicon="search-outline"
        />
      ) : (
        <div className="search-input">
          <input
            type="text"
            placeholder="Search here"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
          <button className="close-button" onClick={handleCloseClick}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
}
