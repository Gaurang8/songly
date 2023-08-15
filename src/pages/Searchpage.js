import React, { useState, useRef, useEffect ,useContext } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { getApiData } from "../api_fetch/fetchapi";
import "./css/search.css";
import img from "../logo.png";
import { handleSearchsong } from "../api_fetch/fetchapi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css/keyboard";
import "swiper/css";
import { Link } from "react-router-dom";
import { MyContext } from "../myContext";

function Searchpage() {

  const {playingSong, setPlayingSong } = useContext(MyContext);

  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [artistData, setArtistData] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const audioRef = useRef(null);

  const handlePlay = (previewUrl ,id) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      // audioRef.current.play();
      setPlayingSong(id);
    }
  };

  const HandleSearch = async () => {
    const apiData = await handleSearchsong(searchValue);
    console.log(searchValue);
    setSearchData(apiData);
    console.log("search ", apiData);
    setSearchValue("");
  };

  const renderRelated = () => {
    const slides = [];

    if (searchData.length) {
      return <p>Loading...</p>;
    }

    if (searchData && searchData.tracks) {
      searchData.tracks.items.slice(1).map((element, index) => {
        slides.push(
          <div className="song-items" key={index}>
            <img
              src={element.album.images[2]?.url || img}
              alt="img"
              width="100%"
            />
            <div className="song-item-text">
              <div>
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

  useEffect(() => {
    const getartistData = async () => {
      await getApiData(`https://api.spotify.com/v1/artists?ids=${searchData.tracks.items[0].artists.map((ele) => ele.id).join("%2C")}`).then((apiData) => { 
        setSongArtist(apiData.artists);
        console.log("artist", apiData)}).catch((err) => {
          console.log("api cant fetched");
        });
    }
    const getData = async () => {
      
     await getApiData(
        `https://api.spotify.com/v1/artists/${searchData.tracks.items[0].artists[0].id}/related-artists`
      )
        .then((apiData) => {
          setArtistData([...songArtist, ...apiData.artists])
          console.log("artist", apiData);

         console.log("finale-artist", artistData);

        })
        .catch((err) => {
          console.log("api cant fetched 2");
        });
    };

    if (searchData?.tracks) {
      getData();
      getartistData();
    }
  }, [searchData]);



  const renderData = () => {
    const slides = [];
    if (artistData) {
      if (artistData.length === 0) {
        return <p>Loading...</p>;
      }

      
      artistData.map((element,index) => {
     
        slides.push(
          <SwiperSlide key={index}>
            <div className="slider-item  artist-card"><div className="artist-img">
              <Link to={`/Playlist/${element.id}/${element.type}`}> <img src={element.images[2]?.url} alt="img" width="100%" /></Link> </div>
             <div className="artist-details">
              <p>{element?.name || "unknown"}</p>
              </div>
            
            </div>
          </SwiperSlide>
        );})
    }
    return slides;
  };

  return (
    <>
      <NavBar
        handleSearch={HandleSearch}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />

      <div className="sec-body">
          {searchData.tracks && (
        <div className="src-result">
            <div className="src-found-song">
              <div className="src-song-card">
                <img
                  src={searchData.tracks.items[0].album.images[1].url}
                  alt="img"
                />
                <div>
                  <p className="">{searchData.tracks.items[0].name}</p>
                  <p className="b-text" style={{ color: "#ccc" }}>
                    {searchData.tracks.items[0].artists
                      .map((ele) => ele.name)
                      .join(",") || "unknown"}
                  </p>
                  <div
                    className="play-btn-h"
                    onClick={() =>
                      handlePlay(searchData.tracks.items[0].preview_url)
                    }
                  >
                    <PlayArrowIcon className="play-btn-icon-h" />
                  </div>
                  <audio ref={audioRef} controls style={{ display: "none" }} />
                </div>
              </div>
            </div>
           <div className="src-relate-song">{renderRelated()}</div>
           </div>)}
     

         

       <h2 className="search-heading">Related Artists</h2>

        <div className="related-artist"> <Swiper
        spaceBetween={35}
        scrollbar={{ draggable: true }}
        modules={[Keyboard]}
        slidesPerView={2}
        breakpoints={{
          300: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          440: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 5,
          },
          876: {
            slidesPerView: 6,
          },
          1162:{
            slidesPerView:7
          }
        }}
        keyboard={{
          enabled: true,
        }}
        rewind={true}
        className="slider-container"
      >
        {renderData()}
      </Swiper></div>
      </div>
      <Footer />
    </>
  );
}

export default Searchpage;
