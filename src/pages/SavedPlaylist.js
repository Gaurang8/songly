import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../myContext";
import NavBar from "../components/NavBar";
import img from "../logo.png";
import { Favorite, PlayArrowSharp } from "@mui/icons-material";
import "./css/savedplaylist.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getApiData } from "../api_fetch/fetchapi";

// dialog box
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SavedPlaylist = () => {
  const { user, setUser } = useContext(MyContext);

  const { playingSong, setPlayingSong } = useContext(MyContext);
  let { playlistId } = useParams();
  console.log("user", user);

  const index = user?.playlists.findIndex((ele) => ele._id === playlistId);
  console.log("playlist id", playlistId);

  console.log("index", index);

  console.log(playlistId);

  const [playlistSongId, setPlaylistSongId] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [playlistName, setPlaylistName] = useState(
    user?.playlists[index]?.name
  );
  const [playlistDescription, setPlaylistDescription] = useState(
    user?.playlists[index]?.description
  );
  const [playlistImage, setPlaylistImage] = useState(
    user?.playlists[index]?.image
  );
  const [playlistPrivacy, setPlaylistPrivacy] = useState(
    user?.playlists[index]?.privacy
  );

  useEffect(() => {
    setPlaylistSongId([]);
    if (user.playlists && user.playlists.length !== 0) {
      setPlaylistSongId(user?.playlists[index]?.songs);
      console.log("playlistSongId", playlistSongId);
    }
  }, [index, user]);

  useEffect(() => {
    console.log("playlistSongId..", playlistSongId);
  }, [playlistSongId]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      await getApiData(
        `https://api.spotify.com/v1/tracks?ids=${playlistSongId.join(",")}`
      )
        .then((apiData) => {
          setPlaylist(apiData.tracks);
          console.log("final song", playlist);
        })
        .catch((err) => {
          console.log("API data couldn't be fetched");
        });
    };

    if (playlistSongId && playlistSongId?.length !== 0) {
      fetchPlaylist();
    }

    if (playlistSongId.length == 0) {
      setPlaylist([]);
    }
  }, [playlistSongId]);

  const audioRef = useRef(null);

  const handlePlay = (previewUrl, id) => {
    if (previewUrl) {
      // audioRef.current.src = previewUrl;
      // audioRef.current.play();
      setPlayingSong(id);
    }
  };

  const renderPlaylist = () => {
    if (!playlist) {
      return <p>Loading...</p>;
    }

    console.log("ssdsdsdsdsdcffrfrfrfrrr");
    console.log(playlist);

    return (
      <div>
        {playlist.length !== 0 ? (
          playlist?.map((ele, index) =>
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
                            // transform: index === queueIndex ? "rotate(90deg)" : "none",
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
                        onClick={() => handlePlay(ele?.preview_url, ele.id)}
                      >
                        <h4 className="song-name">{ele.name}</h4>
                        <p className="song-movie">
                          {ele.artists
                            ?.map((element) => element.name)
                            .join(",") || "unknown"}
                        </p>
                      </div>
                      <div className="single-song-queue-list-item-controls">
                        <button>
                          <Favorite style={{ color: "red" }} />
                        </button>
                        <div className="single-song-list-item-time">00:30</div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ) : null
          )
        ) : (
          <p>no songs</p>
        )}
      </div>
    );
  };

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const updatedPlaylist = [...playlist];
    const [reorderedItem] = updatedPlaylist.splice(result.source.index, 1);
    updatedPlaylist.splice(result.destination.index, 0, reorderedItem);

    // const newIndex = updatedPlaylist.findIndex(item => item.id === playSong.id);
    // console.log(newIndex)

    // setQueueIndex(newIndex);
    setPlaylist(updatedPlaylist);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditPlaylistDet = async () => {
    try {
      const updatedPlaylistData = {
        name: playlistName,
        description: playlistDescription,
        image: playlistImage,
        privacy: playlistPrivacy,
      };

      const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/api/editPlaylistData/${user?._id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedPlaylistData, playlistId }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser);
        setUser(updatedUser);
      }

      else {
        console.log("Failed to update playlist details.");
      }
      if (index !== -1) {
        handleClose();
      }

    } catch (error) {
      console.error("An error occurred while updating playlist details:", error);
    }
  };
  return (
    <>
      <NavBar />
      <div className="saved-playlist">
        {user.length !== 0 && user?.playlists ? (
          <div className="playlist-information">
            <div className="playlist-image">
              <img src={img} alt="playlist" />
            </div>
            <div className="playlist-name">
              <h1>{user?.playlists[index]?.name || "unknown"}</h1>
            </div>
            <div className="playlist-body-info">
              <div className="playlist-basic-info">
                <div className="playlist-creater">
                  <p>{user?.name}</p>
                </div>
                <div className="playlist-total-songs">
                  <p>{user?.playlists[index]?.totalsong} Songs</p>
                  <p>privacy</p>
                </div>
              </div>
              <div className="edit-other-button">
                <button variant="outlined" onClick={handleClickOpen}>
                  +
                </button>
                <div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Playlist</DialogTitle>
                    <DialogContent>
                      <form className="dialog-editdata">
                        <div className="left-image">
                          <label htmlFor="dialog-image" className="image-label">
                            <img src={img} />
                          </label>
                          <input
                            type="file"
                            name="image"
                            id="dialog-image"
                            style={{ display: "none" }}
                          />
                        </div>
                        <div className="right-form">
                          <div>
                            <label htmlFor="dialog-name">Name</label>
                            <input
                              type="text"
                              name="name"
                              id="dialog-name"
                              value={playlistName}
                              onChange={(e) => setPlaylistName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label htmlFor="dialog-description">
                              Description
                            </label>
                            <input
                              type="text"
                              name="description"
                              id="dialog-description"
                              value={playlistDescription}
                              onChange={(e) =>
                                setPlaylistDescription(e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label htmlFor="dialog-privacy">Privacy</label>
                            <select name="privacy" id="dialog-privacy" value={playlistPrivacy}
                              onChange={(e) => setPlaylistPrivacy(e.target.value)}
                            >
                              <option value="public" >Public</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleEditPlaylistDet}>
                        Save Change
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <button>=</button>
              </div>
            </div>
            <div className="playlist-description">
              <p>{user?.playlists[index]?.description}</p>
            </div>

            <div className="playlist-main-button">
              <button>Play All</button>
              <button>Shuffle</button>
            </div>
          </div>
        ) : (
          <p>loading...</p>
        )}
        <div className="saved-playlist-songs">
          <div>Sort</div>
          <div style={{ width: "100%" }}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="list2" direction="vertical">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderPlaylist()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedPlaylist;
