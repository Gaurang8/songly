import React,{useRef} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PlaylistList from "./slides/PlaylistList";
import SongList from "./slides/SongList";
import NewReleases from "./slides/NewReleases";
import "./css/body.css";


function Body() {

  return (
    <div className="body-container">

      <NavBar />
    

      <div className="slide-container">
      <SongList
          title="Bollywood Songs"
          url="https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks"
        />
        <NewReleases
          title="New Release"
          url="https://api.spotify.com/v1/browse/new-releases?country=IN&limit=20"
        />
        <PlaylistList
          title="Playlist"
          url="https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHCxg5H5PtqW/playlists?country=IN&limit=20"
        />
       
      </div>

      <hr className="bottom-rural" />
      <Footer />

    </div>
  );
}

export default Body;
