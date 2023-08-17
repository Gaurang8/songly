import React, { useContext , useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MyContext } from '../myContext';
import NavBar from '../components/NavBar';
import img from '../logo.png';
import { PlayArrowSharp } from '@mui/icons-material';
import './css/savedplaylist.css'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const SavedPlaylist = () => {
  const { user, setUser } = useContext(MyContext);

  const { playingSong, setPlayingSong } = useContext(MyContext);
  let { index } = useParams();
  index = parseInt(index -1);
  console.log("user", user)

  console.log(index)

  const [playlist , setPlaylist] = useState([])


  const audioRef = useRef(null);

  const handlePlay = (previewUrl, id) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      // audioRef.current.play();
      setPlayingSong(id);
    }
  }

  const renderPlaylist = () => {
    if (!playlist) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        {
      (playlist.length !== 0)?(
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
                onClick={() => {
                  
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
                <div className="single-song-queue-list-item-info">
                  <h4 className="song-name">{ele.name}</h4>
                  <p className="song-movie">
                    {ele.artists?.map((element) => element.name).join(",") ||
                      "unknown"}
                  </p>
                </div>
                <div className="single-song-queue-list-item-controls">
                  <button>
                    {/* <Favorite/> */}
                  </button>
                  <div className="single-song-list-item-time">00:30</div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ) : null
    )):(<p>no songs</p>)}
      </div>

    );
  };


  const handleDragEnd = (result) => {
    console.log(result)
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

  return (<>

    <NavBar />
    <div className='saved-playlist'>
     {
      (user.length !== 0 && user?.playlists) ? ( <div className='playlist-information'>
      <div className='playlist-image'>
        <img src={ img} alt='playlist' />
      </div>
      <div className='playlist-name'>
        <h1>{user?.playlists[index]?.name || "unknown"}</h1>
      </div>
      <div className='playlist-body-info'>
        <div className='playlist-basic-info'>
          <div className='playlist-creater'>
            <p>{user?.name}</p>
          </div>
          <div className='playlist-total-songs'>
            <p>{user?.playlists[index]?.totalsong} Songs</p>
            <p>privacy</p>
          </div>
        </div>
        <div className='edit-other-button'>
          <button>+</button>
          <button>=</button>
        </div>
      </div>
      <div className='playlist-description'>
        <p>{user?.playlists[index]?.description}</p>
      </div>

      <div className='playlist-main-button'>
        <button>Play All</button>
        <button>Shuffle</button>
      </div>
    </div>
      ):(<p>loading...</p>)
     }
      <div className='saved-playlist-songs'>
        <div>
          Sort
        </div>
        <div style={{ width: "100%" }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="list" direction="vertical">
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
  )
}

export default SavedPlaylist
