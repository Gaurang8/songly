import React from "react";
import "./css/sidebar.css";
import logo from "../logo.png";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

import SideOption from "./SideOption";

function SideBar() {
  return (
    <>
      <div className="sidebar-i">
        <div className="sidebar-logo">
          <img src={logo} alt="logo" height={"100%"} />
          <h2>Musicly</h2>
        </div>

        <div className="sidebar_option">
          <Link to="/">
            <SideOption Icon={HomeIcon} title={"Home"} />
          </Link>
          <Link to="/">
          <SideOption Icon={FavoriteIcon} title={"Favorites"} />
          </Link>
          <Link to="/">
          <SideOption Icon={PlaylistAddIcon} title={"Playlist"} />
          </Link>
        </div>

        <div className="sidebar_sub">
          <h3>Playlist</h3>
          <SideOption title={"party song"} /> <SideOption title={"90's song"} />
        </div>
      </div>
    </>
  );
}

export default SideBar;