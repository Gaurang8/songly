import React, { useEffect, useRef, useState, useContext } from "react";
import {
  getApiData,
  handleFavorite,
  handlePlaylist,
  handqlePlaylist,
} from "../api_fetch/fetchapi";
import "./css/singlesong.css";
import img from "../logo.png";
import { MyContext } from "../myContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import {
  Done,
  Favorite,
  FavoriteSharp,
  MoreHorizOutlined,
  MoreVert,
  PlaylistAdd,
  VolumeMute,
} from "@mui/icons-material";
import DragHandleIcon from "@mui/icons-material/DragHandle";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
};

const SingleSong = () => {
  const { user, setUser } = useContext(MyContext);
  const { playingSong, setPlayingSong } = useContext(MyContext);
  const audioRef = useRef(null);
  const [playSong, setPlaySong] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [queue, setQueue] = useState([]);
  const [offsetY, setOffsetY] = useState(0);
  const [queueIndex, setQueueIndex] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      if (playSong?.preview_url) {
        if (!isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  };

  const handleFavClick = async (id, user) => {
    const response = await handleFavorite(id, user);

    console.log(response);
    response?.user && setUser(response.user);
  };

  const handleAddToPlaylist = async (id, user) => {
    const response = await handlePlaylist(id, selectedPlaylists, user);

    console.log(response);
    response?.user && setUser(response.user);
    setSelectedPlaylists([]);
  };

  useEffect(() => {
    if (queueIndex || queueIndex === 0) {
      setPlaySong(queue[queueIndex]);
      console.log(playSong);
    } else {
      console.log("not a number");
    }
  }, [queueIndex, queue]);

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (isEnded) {
      console.log(queueIndex);
      setQueueIndex((prevIndex) => {
        return (prevIndex + 1) % queue.length;
      });
      console.log(queueIndex);
    }
  }, [isEnded]);

  const handlePlaying = () => {
    setIsPlaying(true);
    setIsEnded(false);
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
      const playSongApiData = await getApiData(
        `https://api.spotify.com/v1/tracks/${playingSong}`
      );
      const recommendationsApiData = await getApiData(
        `https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${playingSong}`
      );

      console.log(playSongApiData);
      console.log(recommendationsApiData);

      setQueue([playSongApiData, ...recommendationsApiData.tracks]);

      console.log(queue);
      setPlaySong(queue[0]);
    };

    if (playingSong) {
      setQueueIndex(0);
      getData();
    }
  }, [playingSong]);

  useEffect(() => {
    if (playSong?.preview_url && audioRef.current) {
      setCurrentTime(0);
      audioRef.current.src = playSong?.preview_url;
      audioRef.current.play();
    }
  }, [playSong, playSong?.preview_url]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const replySong = (val) => {
    audioRef.current.currentTime = val;
    audioRef.current.play();
  };

  const shuffleQueue = () => {
    const shuffledQueue = [...queue];
    for (let i = shuffledQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQueue[i], shuffledQueue[j]] = [
        shuffledQueue[j],
        shuffledQueue[i],
      ];
    }
    setQueue(shuffledQueue);
    setQueueIndex(0);
  };
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const renderQueue = () => {
    if (!queue) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        {queue.map((ele, index) =>
          ele?.preview_url ? (
            <Draggable key={ele.id} draggableId={ele.id} index={index}>
              {(provided, snapshot) => (
                <div
                  className={`single-song-queue-list-item`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  <div
                    className="single-song-queue-list-item-container"
                    style={{
                      opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                  >
                    <div className="single-song-queue-list-drag-icon">
                      <div
                        style={{
                          cursor: "grab",
                          transform:
                            index === queueIndex ? "rotate(90deg)" : "none",
                        }}
                        {...provided.dragHandleProps}
                      >
                        <DragHandleIcon />
                      </div>
                    </div>
                    <div className="single-song-queue-list-item-img">
                      <img src={ele?.album?.images[2]?.url || img} alt="" />
                    </div>
                    <div
                      className="single-song-queue-list-item-info"
                      onClick={() => {
                        setQueueIndex(index);
                      }}
                    >
                      <h4 className="song-name">{ele.name}</h4>
                      <p className="song-movie">
                        {ele.artists
                          ?.map((element) => element.name)
                          .join(",") || "unknown"}
                      </p>
                    </div>
                    <div className="single-song-queue-list-item-controls">
                      <button
                        onClick={() => {
                          handleFavClick(ele.id, user);
                        }}
                      >
                        <Favorite />
                      </button>
                      <div className="single-song-list-item-time">
                        {Math.floor(ele.duration_ms / 60000)}:
                        {Math.floor((ele.duration_ms % 60000) / 1000)
                          .toFixed(0)
                          .padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ) : null
        )}
      </div>
    );
  };

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const updatedQueue = [...queue];
    const [reorderedItem] = updatedQueue.splice(result.source.index, 1);
    updatedQueue.splice(result.destination.index, 0, reorderedItem);

    const newIndex = updatedQueue.findIndex((item) => item.id === playSong.id);
    console.log(newIndex);

    setQueueIndex(newIndex);
    setQueue(updatedQueue);
  };

  const handlePlaylistSelection = (playlistId) => {
    console.log(playlistId)
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId)); // Deselect playlist
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]); // Select playlist
    }
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
        <div
          className="playing-song"
          onClick={() => {
            setFullScreen(true);
          }}
        >
          <div>
            <img src={playSong?.album?.images[2].url || img} alt="" />
          </div>
          <audio
            ref={audioRef}
            src={playSong?.preview_url}
            controls
            volume={volume}
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
          <button onClick={shuffleQueue}>
            <ShuffleIcon />
          </button>
          <button
            onClick={() =>
              setQueueIndex((queueIndex - 1 + queue.length) % queue.length)
            }
          >
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
          <button
            onClick={() => setQueueIndex((queueIndex + 1) % queue.length)}
          >
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
          <button className="plst-btn-mini-player" onClick={handleOpen}>
            <label htmlFor="plst-checkbox">
              <PlaylistAdd />
            </label>
            <input type="checkbox" id="plst-checkbox" />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <div className="playlist-options">
              <div className="plst-heading">Select Playlists</div>
              <ul>
                {user?.playlists?.map((ele, index) => (
                  <>
                    <li
                      key={index}

                    >
                      <input
                        type="checkbox"
                        id={index}
                        checked={selectedPlaylists.includes(ele._id)}
                        onChange={() => handlePlaylistSelection(ele._id)}
                      />
                      <label htmlFor={index}>{ele.name}</label>
                    </li>
                  </>
                ))}
              </ul>
              <button
                onClick={() => {
                  handleAddToPlaylist(playSong?.id, user);
                  handleClose();
                }}
              >
                <Done />
                Done
              </button>
            </div>
              </Box>
            </Modal>
          </button>
          <button
            className="fav-btn-mini-player"
            onClick={() => {
              handleFavClick(playSong?.id, user);
            }}
          >
            <FavoriteSharp />
          </button>
          <button className="volume-control-icon">
            {volume == 0 ? <VolumeMute /> : <VolumeUpIcon />}
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                audioRef.current.volume = e.target.value;
              }}
            />
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
        className={`single-song-container ${fullScreen ? "single-song-container-active" : ""
          }`}
      >
        <div
          className="single-song-p-c-toggle"
          onClick={() => {
            setFullScreen(false);
          }}
        >
          X
        </div>
        <div className="single-song-playing">
          <div className="single-song-p-container">
            <img src={playSong?.album?.images[1].url || img} alt="" />
            <button className="song-more-btn" >
              <label htmlFor="more-checkbox">
                <MoreVertIcon />
              </label>
            </button>
            <input type="checkbox" id="more-checkbox" style={{ display: "none" }} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <div className="playlist-options">
              <div className="plst-heading">Select Playlists</div>
              <ul>
                {user?.playlists?.map((ele, index) => (
                  <>
                    <li
                      key={index}

                    >
                      <input
                        type="checkbox"
                        id={index}
                        checked={selectedPlaylists.includes(ele._id)}
                        onChange={() => handlePlaylistSelection(ele._id)}
                      />
                      <label htmlFor={index}>{ele.name}</label>
                    </li>
                  </>
                ))}
              </ul>
              <button
                onClick={() => {
                  handleAddToPlaylist(playSong?.id, user);
                  handleClose();
                }}
              >
                <Done />
                Done
              </button>
            </div>
              </Box>
            </Modal>
            <div className="more-hidden-btn">
              <button className="song-more-btn" onClick={handleOpen}>
                <PlaylistAdd />
              </button>
              <button className="song-more-btn" onClick={() => {
                handleFavClick(playSong?.id, user);
              }}>
                <Favorite />
              </button>
            </div>
          </div>
          <div className="single-song-info-control">
            <div>
              <h4 className="song-name">{playSong?.name}</h4>
              <p className="song-movie">
                {" "}
                {playSong?.artists?.map((ele) => ele.name).join(",") ||
                  "unknown"}
              </p>
            </div>
            <div className="playback-range-time-controll">
              <div className="playback-range-time-c-container">
                <div className="b-p-music-time">
                  <span>{`0:${Math.floor(currentTime)}`}</span>
                </div>
                <div className="b-p-music-range-line">
                  <input
                    type="range"
                    value={(currentTime * 100) / duration}
                    onInput={(e) =>
                      replySong((e.target.value * duration) / 100)
                    }
                  />
                </div>
                <div className="b-p-music-time">
                  <span>{`0:${Math.floor(duration)}`}</span>
                </div>
              </div>
            </div>
            <div className="big-song-player-controls">
              <button onClick={shuffleQueue}>
                <ShuffleIcon />
              </button>
              <button
                onClick={() =>
                  setQueueIndex((queueIndex - 1 + queue.length) % queue.length)
                }
              >
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
              <button
                onClick={() => setQueueIndex((queueIndex + 1) % queue.length)}
              >
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
          </div>
        </div>
        <div className="song-info-queue">
          <div className="single-song-info"></div>
          <div className="single-song-queue">
            <div className="single-song-queue-container">
              <div className="single-song-queue-header">
                <h4>Queue</h4>
                <div>
                  <button
                    onClick={() => {
                      return;
                    }}
                  >
                    <PlayCircleOutlineIcon />
                  </button>
                  <button>
                    <MoreVertIcon />
                  </button>
                </div>
              </div>
              <div className="single-song-queue-list">
                <div className="single-song-queue-list-container">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="list" direction="vertical">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {renderQueue()}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSong;
