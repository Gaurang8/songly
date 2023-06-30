import React,{ useEffect, useState } from 'react'
import { fetchToken, getApiData } from "../../backend/fetchapi";
import Slider from "../Slider";

function SongList({title, url}) {
  const [token, setToken] = useState("");
  const [songData, setsongData] = useState([]);
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
        setsongData(apiData);
        console.log(apiData)
        }).catch (err => {
        console.log("api cant fetched");
      })
    };

    getData();
  }, [token]);

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
