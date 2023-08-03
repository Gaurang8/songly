import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getApiData } from "../api_fetch/fetchapi";
import "./singlesong.css";
import img from "../logo.png";
import { MyContext } from "../myContext";

// material icon
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ReplayIcon from "@mui/icons-material/Replay";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const SingleSong = () => {
  const { playingSong, setPlayingSong } = useContext(MyContext);
  const audioRef = useRef(null);
  const [playSong, setPlaySong] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      if (playSong.preview_url) {
        if (!isPlaying) {
          audioRef.current.play();
          console.log("play in handle play");
        } else {
          audioRef.current.pause();
          console.log(audioRef.current.currentTime);
          console.log("pause in handle play");
          setIsPlaying(false);
        }
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setCurrentTime(0);
    console.log("ended event");
  };

  const handlePlaying = () => {
    setIsPlaying(true);
    setIsEnded(false);
    console.log("playing event");
  };

  useEffect(() => {
    audioRef.current.addEventListener("ended", handleEnded);
    audioRef.current.addEventListener("playing", handlePlaying);

    if (audioRef.current.ended) {
      setIsPlaying(false);
      setIsEnded(true);
    }

    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
      audioRef.current.removeEventListener("playing", handlePlaying);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      console.log("playing song", playingSong);
      await getApiData(`https://api.spotify.com/v1/tracks/${playingSong}`)
        .then((apiData) => {
          setPlaySong(apiData);
          console.log("playing song", apiData);
          handlePlay(apiData?.preview_url);
        })
        .catch((err) => {
          console.log("API data couldn't be fetched", err);
        });
    };

    if (playingSong) {
      getData();
    }
  }, [playingSong]);

  useEffect(() => {
    if (playSong.preview_url && audioRef.current) {
      audioRef.current.src = playSong.preview_url;
      handlePlay(); 
    }
  }, [playSong.preview_url]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const replySong = (val) => {
    console.log(val);
    audioRef.current.currentTime = val;
    audioRef.current.play();
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };



  return (
    <>
      <div className="mini-song-player">
        <div className="music-range-line">
          <input
            type="range"
            value={(currentTime * 100) / duration}
            onInput={(e) => replySong((e.target.value * duration) / 100)}
          />
        </div>
        <div className="playing-song">
          <div>
            <img src={playSong?.album?.images[2].url || img} alt="" />
          </div>
          <audio
            ref={audioRef}
            src={playSong?.preview_url}
            controls
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            style={{ display: "none" }}
          />
          <div className="mini-song-info">
            <h4 className="song-name">{playSong?.name || "NA"} </h4>
            <p className="song-artist">
              {playSong?.artists?.map((ele) => ele.name).join(",") || "unknown"}
            </p>
          </div>
          <div className="hidden-playsong-mini-icon">
            {!isPlaying ? (
              <button onClick={() => handlePlay()}>
                <PlayCircleOutlineIcon />
              </button>
            ) : (
              <button onClick={() => handlePlay()}>
                <PauseCircleIcon />
              </button>
            )}
          </div>
        </div>
        <div className="mini-song-player-controls">
          <button>
            <ShuffleIcon />
          </button>
          <button>
            <SkipPreviousIcon />
          </button>
          {!isPlaying ? (
            <button onClick={() => handlePlay()}>
              <PlayCircleOutlineIcon />
            </button>
          ) : (
            <button onClick={() => handlePlay()}>
              <PauseCircleIcon />
            </button>
          )}
          <button>
            <SkipNextIcon />
          </button>
          <button
            onClick={() => {
              replySong(0);
            }}
          >
            <ReplayIcon />
          </button>
        </div>
        <div className="mini-song-player-volume">
          <div>
            <span>{`0:${Math.floor(currentTime)}/0:${Math.floor(
              duration
            )}`}</span>
          </div>
          <button>
            <MoreVertIcon />
          </button>
          <button>
            <VolumeUpIcon />
          </button>

          <button
            onClick={(e) => {
              setFullScreen(!fullScreen);
            }}
          >
            {fullScreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </button>
        </div>
      </div>
      <div
        className={`single-song-container ${
          fullScreen ? "single-song-container-active" : ""
        } `}
      >
        <div className="single-song-playing">
          <div className="single-song-p-container">
            <img src={img} alt="" />
          </div>
          <div>
            <h4 className="song-name">Judai By Arijit</h4>
            <p className="song-movie">album</p>
          </div>
        </div>
        <div className="song-info-queue">
          <div className="single-song-info"></div>
          <div className="single-song-queue"></div>
        </div>
      </div>
    </>
  );
};

export default SingleSong;
