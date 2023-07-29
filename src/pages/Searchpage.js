import React, { useState, useRef , useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { getApiData } from "../api_fetch/fetchapi";
import "./search.css";
import img from "../logo.png";
import { handleSearchsong } from "../api_fetch/fetchapi";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function Searchpage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [artistData , setArtistData] = useState("");
  const [artistFormated , setArtistFormated] = useState("");

  const audioRef = useRef(null);

  const handlePlay = (previewUrl) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      audioRef.current.play();
    }
  };

  const HandleSearch = async () => {
    const apiData = await handleSearchsong(searchValue);
    console.log(searchValue);
    setSearchData(apiData);
    console.log("search ", apiData);
    setSearchValue('')
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

  
  useEffect(() => {
    const getData = () => {
      console.log(searchData.tracks.items[0].artists[0].id)
        getApiData(`https://api.spotify.com/v1/artists/${searchData.tracks.items[0].artists[0].id}/related-artists`).then( apiData => {
        setArtistData(apiData);
        console.log('artist',apiData)
        }).catch (err => {
        console.log("api cant fetched");
      })
    };

   if (searchData?.tracks){
    getData();
   }
  }, [searchData]);

  // useEffect(() => {
  //   const reformData = () => {
  //     if (
  //       artistData &&
  //       artistData.artists
  //     ) {
  //       const newData = artistData.artists.map((element) => {
  //         const item = {};
  //         item.id = element.id;
  //         item.name = element.name;
  //         item.img = element.images[0].url;
  //         item.artists =  element.description ||
  //         "unknown";
  //         item.type = "playlist";
  //         return item;
  //       });
  //       setData(newData);
  //     }
  //   };

  //   reformData();
  // }, []);


  return (
    <>
      <NavBar
        handleSearch={HandleSearch}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />

      <div className="sec-body">
        <div className="src-result">
        {searchData.tracks && (
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
                )}
          
          <div className="src-relate-song">{renderRelated()}</div>
        </div>
        <div className="related-artist"></div>
      </div>
      <Footer />
    </>
  );
}

export default Searchpage;
