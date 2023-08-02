import React, { useEffect, useState, useRef ,useContext} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams  } from "react-router-dom";
import { getApiData } from "../api_fetch/fetchapi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import img from "../logo.png";
import { MyContext } from "../myContext";
import "./playlist.css";

function Song() {
  const {playingSong, setPlayingSong } = useContext(MyContext);
  const { id, type } = useParams();
  const [songId, setSongId] = useState([]);
  const [songData, setsongData] = useState([]);

  const audioRef = useRef(null);

  const handlePlay = (previewUrl , id) => {
   if (previewUrl) {
      audioRef.current.src = previewUrl;
      // audioRef.current.play();
      setPlayingSong(id);
    }
  };

  useEffect(() => {
    const getListId = async () => {
      if (type === "song") {
        setSongId([id]);
        console.log(songId, id);
        return
      } else if (type === "album") {
        await getApiData(
          `https://api.spotify.com/v1/albums/${id}/tracks`
        ).then((data) => {
          if (data && data.items) {
            console.log(data.items);
            const newData = data.items.map((element) => element.id);
            setSongId(newData);
            console.log("newdata", newData);
          }
        });
      } else if (type === "playlist") {
        await getApiData(

          `https://api.spotify.com/v1/playlists/${id}/tracks?limit=30`
        )
          .then((data) => {
            if (data && data.items) {
              console.log(data.items);
              const newData = data.items.map((element) => element.track.id);
              setSongId(newData);
              console.log("newdata", newData);
            }
          })
          .catch((err) => {
            console.log("API data couldn't be fetched");
          });
      }
    };

    getListId();
  },[]);

  useEffect(() => {
    const getData = async () => {
      let ids = songId.join("%2C");
      console.log("ids", ids);
      if (ids) {
        await getApiData(`https://api.spotify.com/v1/tracks?ids=${ids}`)
          .then((apiData) => {
            setsongData(apiData);
            console.log("final song", apiData);
          })
          .catch((err) => {
            console.log("API data couldn't be fetched");
          });
      }
    };

    if (songId.length > 0 && songData.length === 0) {
      console.log("getData is calling");
      getData();
    }
  });

  

  const renderSlide = () => {
    const slides = [];

    if (songData.length) {
      return <p>Loading...</p>;
    }

    if (songData && songData.tracks) {
      songData.tracks.map((element, index) => {
        slides.push(
          <div className="song-items" key={index}>
            <img
              src={element.album.images[2]?.url || img}
              alt="img"
              width="100%"
            />
            <div className="song-item-text">
              <div >
                <p>{element?.name || "unknown"}</p>
                <p>
                  {element?.artists.map((ele) => ele.name).join(",") ||
                    "unknown"}
                </p>
              </div>
              <div
                className="play-btn-s"
                onClick={() => handlePlay(element.preview_url , element.id)}
              >
                <PlayArrowIcon className="play-btn-icon-s" />
              </div>

              <audio ref={audioRef} controls style={{ display: "none" }} />
            </div>
          </div>
        );
      });
    }

    return slides;
  };

  return (
    <>
      <NavBar />
      <div className="song-container">
        <h1>Song Page</h1>
        {renderSlide()}
      </div>
      <Footer />
    </>
  );
}

export default Song;
