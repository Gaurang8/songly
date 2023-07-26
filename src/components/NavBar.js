import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import "./css/navbar.css";
import { Link } from "react-router-dom";

function NavBar({ handleSearch, setSearchValue, searchValue }) {

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="navbar">
      <Link to="/search"><div className="input-search">
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchValue}
          autoFocus
          onKeyDown={handleKeyDown}
          class="sh-search-text"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          required
        />
        <button type="submit" class="src-btn" onClick={handleSearch}>
          <IconButton className="src-btn-icon">
            <SearchIcon />
          </IconButton>
        </button>
      </div></Link>
      <button className="upgrade primary-btn">Upgrade </button>
      <button className="get-app secondary-btn">Get App</button>
      <div className="login-user">
        <Link to="/login">
          <Avatar />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
