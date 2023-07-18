import React, { useEffect, useState } from "react";
import { getApiData } from "../../api_fetch/fetchapi";
import Slider from "../Slider";

function PlaylistList({title, url}) {
  const [playlistData, setPlaylistData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
        getApiData(url).then( apiData => {
        setPlaylistData(apiData);
        console.log('playlist',apiData)
        }).catch (err => {
        console.log("api cant fetched");
      })
    };

    getData();
  }, [url]);

  useEffect(() => {
    const reformData = () => {
      if (
        playlistData &&
        playlistData.playlists &&
        playlistData.playlists.items
      ) {
        const newData = playlistData.playlists.items.map((element) => {
          const item = {};
          item.id = element.id;
          item.name = element.name;
          item.img = element.images[0].url;
          item.artists =  element.description ||
          "unknown";
          item.type = "playlist";
          return item;
        });
        setData(newData);
      }
    };

    reformData();
  }, [playlistData]);
  
  return (
    <>
      {data && <Slider title={title} data={data}/>}
    </>
  );
}

export default PlaylistList;
