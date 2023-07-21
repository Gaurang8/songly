import React,{ useEffect, useState } from 'react'
import { getApiData } from "../../api_fetch/fetchapi";
import Slider from "../Slider";

function SongList({title, url}) {
  const [songData, setsongData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
        getApiData(url).then( apiData => {
        setsongData(apiData);
        console.log("bollywood-song",apiData)
        }).catch (err => {
        console.log("api cant fetched");
      })
    };

    getData();
  }, [url]);

  useEffect(() => {
    const reformData = () => {
      if (
        songData &&
        songData.items
      ) {
        const newData = songData.items.map((element) => {
          const item = {};
          item.id = element.track.id;
          item.name = element.track.name;
          item.img = element.track.album.images[1].url;
          item.play = element.track.preview_url || "not";
          item.artists =  element.track?.artists.map((ele) => ele.name).join(",") ||
          "unknown";
          item.type = "song";
          return item;
        });
        setData(newData);
      }
    };

    reformData();
  }, [songData]);
  
  return (
    <>
      {data && <Slider title={title} data={data}/>}
    </>
  );
}

export default SongList
