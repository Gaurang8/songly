import React, { useContext, useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { getApiData } from "../api_fetch/fetchapi";
import { MyContext } from "../myContext";
import Avatar from "@mui/material/Avatar";
import "./css/navbar.css";
import img from "../logo.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";

function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const { isAuth, user } = useContext(MyContext);
  const [searchData, setSearchData] = useState([]);

  const audioRef = useRef(null);

  const handlePlay = (previewUrl) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      audioRef.current.play();
    }
  };

  const handleSearch = async () => {
    await getApiData(
      `https://api.spotify.com/v1/search?q=${searchValue.replace(
        / +/g,
        "+"
      )}&type=track&limit=3`
    )
      .then((apiData) => {
        setSearchData(apiData);
        console.log("search ", apiData);
      })
      .catch((err) => {
        console.log("api cant fetched");
      });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const renderSlide = () => {
    if (searchData.length) {
      return <p>Loading...</p>;
    }

    if (searchData && searchData.tracks) {
      return (
        <div className="sh-search-items">
          {searchData.tracks.items.map((element, index) => (
            <div className="sh-song-items" key={index}>
              <img
                src={element.album.images[2]?.url || img}
                alt="img"
                width="100%"
              />
              <div className="sh-song-item-text">
                <div>
                  <p>{element?.name || "unknown"}</p>
                  <p>
                    {element?.artists.map((ele) => ele.name).join(",") ||
                      "unknown"}
                  </p>
                </div>
                <div
                  className="play-btn-s"
                  onClick={() => handlePlay(element.preview_url)}
                >
                  <PlayArrowIcon className="play-btn-icon-s" />
                </div>

                <audio ref={audioRef} controls style={{ display: "none" }} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="navbar">
      <div className="input-search">
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
      </div>
      {renderSlide()}
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
