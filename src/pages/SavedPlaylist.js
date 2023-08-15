import React, { useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MyContext } from '../myContext';
import NavBar from '../components/NavBar';
import img from '../logo.png';
import { PlayArrowSharp } from '@mui/icons-material';
import './css/savedplaylist.css'

const SavedPlaylist = () => {
  const { user, setUser } = useContext(MyContext);
  const { playingSong, setPlayingSong } = useContext(MyContext);

  const element = {}

  const { index } = useParams();
  console.log(index)

  const audioRef = useRef(null);

  const handlePlay = (previewUrl, id) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      // audioRef.current.play();
      setPlayingSong(id);
    }
  }

  return (<>

    <NavBar />
    <div className='saved-playlist'>
      <div className='playlist-information'>
        <div className='playlist-image'>
          <img src={user.playlists[index]?.image || img} alt='playlist' />
        </div>
        <div className='playlist-name'>
          <h1>{user.playlists[index]?.name}</h1>
        </div>
        <div className='playlist-body-info'>
          <div className='playlist-basic-info'>
            <div className='playlist-creater'>
              <p>{user?.name}</p>
            </div>
            <div className='playlist-total-songs'>
              <p>{user.playlists[index]?.totalsong} Songs</p>
              <p>privacy</p>
            </div>
          </div>
          <div className='edit-other-button'>
            <button>+</button>
            <button>=</button>
          </div>
        </div>
        <div className='playlist-description'>
          <p>{user.playlists[index]?.description}</p>
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
          {
            user?.playlists[0]?.songs.map((ele, i) => {
              console.log('enter')
              return (
                <div className="song-items" key={i}>
                  <img
                    src={ele?.album?.images[2].url || img}
                    alt="img"
                    width="100%"
                  />
                  <div className="song-item-text">
                    <div >
                      <p>{ele?.name || "unknown"}</p>
                      <p>
                      {ele?.artists?.map((artist) => artist.name).join(",") || "unknown"}
                      </p>
                    </div>
                    <div
                      className="play-btn-s"
                      onClick={() => handlePlay(element.preview_url, element.id)}
                    >
                      <PlayArrowSharp className="play-btn-icon-s" />
                    </div>

                    <audio ref={audioRef} controls style={{ display: "none" }} />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  </>
  )
}

export default SavedPlaylist
