import React, { useContext } from "react";
import "./css/sidebar.css";
import logo from "../logo.png";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { MyContext } from "../myContext";

import SideOption from "./SideOption";

function SideBar() {

  const { user, setUser } = useContext(MyContext);

  const createPlaylist = async () => {
    try {
      if (user._id) {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/api/createPlaylist/${user._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ playlistName: `Playlist #${user.playlists.length + 1}` }),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          console.log(updatedUser);
          setUser(updatedUser);
        } else {
          console.error('Failed to create playlist');
        }
      }
      else {
        console.log("Please login first");
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  }

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
          <Link to="/favorite">
            <SideOption Icon={FavoriteIcon} title={"Favorites"} />
          </Link>
          <Link to="/">
            <SideOption Icon={PlaylistAddIcon} title={"Playlist"} />
          </Link>
        </div>

        <div className="sidebar_sub">
          <h3>Playlist <span><button onClick={createPlaylist}>+</button></span></h3>
          {
            user?.playlists?.map((element, index) => {
              console.log(index)
              return <>
                <Link to={`/savedplaylist/${index + 1}`}>
                  <SideOption title={element.name} /></Link></>
            })
          }
        </div>
      </div>
    </>
  );
}

export default SideBar;
