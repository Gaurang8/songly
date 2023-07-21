import React, { useEffect, useState } from "react";
import { getApiData } from "../../api_fetch/fetchapi";
import Slider from "../Slider";

function NewReleases({ title, url }) {
  const [newRelease, setnewRelease] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      getApiData(url)
        .then((apiData) => {
          setnewRelease(apiData);
          console.log("new-release",apiData)
        })
        .catch((err) => {
          console.log("api cant fetched");
        });
    };

    getData();
  }, [url]);

  useEffect(() => {
    const reformData = () => {
      if (newRelease && newRelease.albums && newRelease.albums.items) {
        const newData = newRelease.albums.items.map((element) => {
          const item = {};
          item.id = element.id;
          item.name = element.name;
          item.img = element.images[1].url;
          item.artists =  element?.artists.map((ele) => ele.name).join(",") ||
          "unknown"
          item.type = "album";
          return item;
        });
        setData(newData);
      }
    };

    reformData();
  }, [newRelease]);

  return (
     <>{data && <Slider title={title} data={data} />}</>);
}

export default NewReleases;
