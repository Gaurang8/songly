import React,{useRef} from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PlaylistList from "./slides/PlaylistList";
import SongList from "./slides/SongList";
import NewReleases from "./slides/NewReleases";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./css/body.css";


function Body() {

  const audioRef = useRef(null);

  const handlePlay = () => {
      audioRef.current.src = "https://p.scdn.co/mp3-preview/767976462df41e836ac0d5bccfd528376c92d2ba?cid=62b91c8cfc9f4a329c60ff1966be9d3d";      ;
      audioRef.current.play();
  };
  return (
    <div className="body-container">

      <NavBar />
      
      <div className="for-birthday">
          <img src="https://i.scdn.co/image/ab67616d00001e02c08202c50371e234d20caf62" alt="img"/>
          <div>
          <p className="b-text">Kesariya - Brahmastra </p>
          <p className="b-text" style={{"color":"#ccc"}}>Arijit Singh</p>
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
