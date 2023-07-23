import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./search.css";
import { handleSearchsong } from "../api_fetch/fetchapi"; 

function Searchpage() {
  const [searchValue, setSearchValue] = useState(""); 
  const [searchData, setSearchData] = useState([]);
  const audioRef = useRef(null);

  const handlePlay = (previewUrl) => {
    if (previewUrl) {
      audioRef.current.src = previewUrl;
      audioRef.current.play();
    }
  };

  const HandleSearch = async () => {
    const apiData = await handleSearchsong(searchValue);
    console.log(searchValue)
    setSearchData(apiData);
    console.log("search ", apiData);
  };



  return (
    <>
      <NavBar
        handleSearch={HandleSearch}
        setSearchValue={setSearchValue} 
        searchValue={searchValue} 
      />
      <div className="sec-body">
        <div className="src-result">
          <div className="src-found-song">
            <img src="" alt="img" />
            <div className="song-details">lorem2</div>
          </div>
          <div className="src-relate-song"></div>
        </div>
        <div className="related-artist"></div>
      </div>
      <Footer />
    </>
  );
}

export default Searchpage;
