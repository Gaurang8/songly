import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { fetchToken, getApiData } from "../backend/fetchapi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import img from "../logo.png";
import SongList from "../components/slides/SongList";
import "./song.css";
// import { Co2Sharp } from "@mui/icons-material";

function Song() {
  const { id, type } = useParams();

  const [token, setToken] = useState("");
  const [songId, setSongId] = useState([]);
  const [songData, setsongData] = useState([]);

  const audioRef = useRef(null);

  const handlePlay = (previewUrl) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const getTocken = async () => {
      let accessToken = await fetchToken();
      if (accessToken) {
        setToken(accessToken);
      }
    };

    if (token === "") {
      getTocken();
    }
  }, [token]);

  useEffect(() => {
    const getListId = async () => {
      if (type === "song") {
        setSongId([id]);
        console.log(songId, id);
      } else if (type === "album") {
        const apiData = await getApiData(
          token,
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
        const apiData = await getApiData(
          token,
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
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      let ids = songId.join("%2C");
      console.log("ids", ids);
      if (ids) {
        await getApiData(token, `https://api.spotify.com/v1/tracks?ids=${ids}`)
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
  }, [songId, token]);

  // useEffect (()=>{

  //   renderSlide()

  // },[songData])

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
                onClick={() => handlePlay(element.preview_url)}
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
