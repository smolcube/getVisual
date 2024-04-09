import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import ButtonIcon from "./ButtonIcon";

import newRequest from '../Utils/newRequest';

export default function SearchBanner() {
    
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('search  button clicked')
    setShowInput(true);
    console.log(searchValue);
  };


  const handleSearch = async () => {

    try {
      const response = await newRequest.get(`/getVisual/search?q=${searchValue}`);
      setSearchResult(response.data);
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., display error message)
    }
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
      {/* Display search results */}
      {searchResult.length > 0 && (
        <div className="search-results shadow2">
          <ul>
            {searchResult.map(result => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}