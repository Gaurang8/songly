import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MyContext } from '../myContext';
import NavBar from '../components/NavBar';
import img from '../logo.png';
import { Favorite, PlayArrowSharp } from '@mui/icons-material';
import './css/favorite.css'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getApiData , removeFavorite } from '../api_fetch/fetchapi';
import LoginIcon from '@mui/icons-material/Login';

const FavoritePage = () => {

  const { user, setUser } = useContext(MyContext);

  const { playingSong, setPlayingSong } = useContext(MyContext);
  console.log("user", user)

  const [favoriteSongId, setfavoriteSongId] = useState([])
  const [favorite, setfavorite] = useState([])

  useEffect(() => {
    if (user.favorites) {
      setfavoriteSongId(user?.favorites[0]?.songs)
      console.log("favoriteSongId", favoriteSongId)
    }
  }, [user])

  useEffect(() => {
    console.log("favoriteSongId ...........", favoriteSongId)
  }
    , [favoriteSongId])

  useEffect(() => {
    const fetchPlaylist = async () => {
      await getApiData(`https://api.spotify.com/v1/tracks?ids=${favoriteSongId.join(",")}`)
        .then((apiData) => {
          setfavorite(apiData.tracks);
          console.log("final song", favorite);
        })
        .catch((err) => {
          console.log("API data couldn't be fetched");
        });
    };

    if (favoriteSongId.length !== 0) {
      fetchPlaylist();
    }
  }, [favoriteSongId]);

  const handlePlay = (previewUrl, id) => {
    if (previewUrl) {
      setPlayingSong(id);
    }
  }

  const renderPlaylist = () => {
    if (!favorite) {
      return <p>Loading...</p>;
    }

    const handleRemoveFav = async (id, user) => {
      const response = await removeFavorite(id, user);
  
      console.log(response);
      response?.user &&  setUser(response.user);
  
  
    }
  

    return (
      <div>
        {
          (favorite.length !== 0) ? (
            favorite?.map((ele, index) =>
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
                        <div className="single-song-queue-list-item-info" onClick={() => handlePlay(ele?.preview_url, ele.id)}>
                          <h4 className="song-name">{ele.name}</h4>
                          <p className="song-movie">
                            {ele.artists?.map((element) => element.name).join(",") ||
                              "unknown"}
                          </p>
                        </div>
                        <div className="single-song-queue-list-item-controls">
                          <button onClick={()=>{
                            handleRemoveFav(ele.id , user)
                          }} >
                            <Favorite style={{ color: "red" }} />
                          </button>
                          <div className="single-song-list-item-time">{Math.floor(ele.duration_ms / 60000)}:{Math.floor((ele.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</div>

                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ) : null
            )) : (<p>no songs</p>)}
      </div>

    );
  };


  const handleDragEnd = (result) => {
    console.log(result)
    if (!result.destination) {
      return;
    }
    const updatedfavorite = [...favorite];
    const [reorderedItem] = updatedfavorite.splice(result.source.index, 1);
    updatedfavorite.splice(result.destination.index, 0, reorderedItem);

    // const newIndex = updatedfavorite.findIndex(item => item.id === playSong.id);
    // console.log(newIndex)

    // setQueueIndex(newIndex);
    setfavorite(updatedfavorite);
  };

  console.log("user", user.length)

  return (
    <>
      <NavBar />
      <div className='saved-playlist'>
        {
          (user.length !== 0 ) ? (
            <>
              <div className='playlist-information'>
                <div className='playlist-image'>
                  <img src={img} alt='playlist' />
                </div>
                <div className='playlist-name'>
                  <h1>{user?.favorites[0]?.name || "unknown"}</h1>
                </div>
                <div className='playlist-body-info'>
                  <div className='playlist-basic-info'>
                    <div className='playlist-creater'>
                      <p>{user?.name}</p>
                    </div>
                    <div className='playlist-total-songs'>
                      <p>{user?.favorites[0]?.totalsong} Songs</p>
                      <p>privacy</p>
                    </div>
                  </div>
                  <div className='edit-other-button'>
                    <button>+</button>
                    <button>=</button>
                  </div>
                </div>
                <div className='playlist-description'>
                  <p>{user?.favorites[0]?.description}</p>
                </div>

                <div className='playlist-main-button'>
                  <button>Play All</button>
                  <button>Shuffle</button>
                </div>
              </div>
              <div className='saved-playlist-songs'>
                <div>
                  Sort
                </div>
                <div style={{ width: "100%" }}>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="favorite-ff" direction="vertical">
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
            </>
          ) : (<div><p style={{fontSize:"2rem"}}>Login to see Favorite</p>
              <div style={{textAlign:"center"}}>
                <Link to="/login">
                <LoginIcon/>
                </Link>
              </div>
          </div>)
        }
      </div>
    </>
  )
}

export default FavoritePage;
