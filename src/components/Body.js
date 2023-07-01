import React,{useRef} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PlaylistList from "./slides/PlaylistList";
import SongList from "./slides/SongList";
import NewReleases from "./slides/NewReleases";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./css/body.css";
import img from "./123.jpg"
import   abc from  "./123.mp3"


function Body() {

  const audioRef = useRef(null);

  const handlePlay = () => {
      audioRef.current.src = abc;
      audioRef.current.play();
  };
  return (
    <div className="body-container">

      <NavBar />
      
      <div className="for-birthday">
          <img src={img} alt="img"/>
          <div>
          <p className="b-text">Happy Happy Birthday </p>
          <p className="b-text">You are one of the best things that happened to me</p>
          <div className="play-btn-h"  onClick={() => handlePlay()}><PlayArrowIcon className="play-btn-icon-h"/></div>
          <audio ref={audioRef} controls style={{ display: "none" }} />
          
          </div>
      </div>


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
