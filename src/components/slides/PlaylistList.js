import React, { useEffect, useState } from "react";
import { fetchToken, getApiData } from "../../backend/fetchapi";
import Slider from "../Slider";

function PlaylistList({title, url}) {
  const [token, setToken] = useState("");
  const [playlistData, setPlaylistData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTocken = async () => {
      let accessToken = await fetchToken();
      if (accessToken) {
        setToken(accessToken);
      }
    };

    if (token === "") {
      getTocken();
    }
  }, [token]);

  useEffect(() => {
    const getData = () => {
        getApiData(token, url).then( apiData => {
        setPlaylistData(apiData);
        console.log('dsds',apiData)
        }).catch (err => {
        console.log("api cant fetched");
      })
    };

    getData();
  }, [token]);

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
