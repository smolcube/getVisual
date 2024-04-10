import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { FaSearch, FaTimes } from "react-icons/fa";

import ButtonIcon from "./ButtonIcon";
import newRequest from '../Utils/newRequest';

export default function SearchBanner() {
 const [showInput, setShowInput] = useState(false);
 const [searchValue, setSearchValue] = useState("");
 const [searchResult, setSearchResult] = useState({ users: [], packages: [] });

 const handleInputChange = (event) => {
   setSearchValue(event.target.value);
 };

 const handleSearchClick = () => {
   setShowInput(true);
 };

 const handleSearch = async () => {
  try {
    const response = await newRequest.get(`/search/${searchValue}`);
    console.log("hit")
    setSearchResult(response.data);
    console.log(response);

    } catch (err) {
    console.error(err);
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
     {searchResult.users.length > 0 && (
       <div className="search-results shadow2">
         <h4>Users</h4>
         <br />
         <hr />
         <br />
         <ul>
           {searchResult.users.map(user => (
             <li key={user._id}><Link to={`/getVisual/users/${user.username}`}>{user.username}</Link></li>
           ))}
         </ul>
       </div>
     )}
     {searchResult.packages.length > 0 && (
       <div className="search-results shadow2">
         <h4>Packages</h4>
         <br />
         <hr />
         <br />
         <ul>
           {searchResult.packages.map(pkg => (
             <li key={pkg._id}><Link to={`/getVisual/package/${pkg._id}`}>{pkg.name}</Link></li>
           ))}
         </ul>
       </div>
     )}
   </div>
 );
}