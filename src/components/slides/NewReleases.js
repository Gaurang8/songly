import React, { useEffect, useState } from "react";
import { fetchToken, getApiData } from "../../backend/fetchapi";
import Slider from "../Slider";

function NewReleases({ title, url }) {
  const [token, setToken] = useState("");
  const [newRelease, setnewRelease] = useState([]);
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
      getApiData(token, url)
        .then((apiData) => {
          setnewRelease(apiData);
        })
        .catch((err) => {
          console.log("api cant fetched");
        });
    };

    getData();
  }, [token]);

  useEffect(() => {
    const reformData = () => {
      if (newRelease && newRelease.albums && newRelease.albums.items) {
        const newData = newRelease.albums.items.map((element) => {
          const item = {};
          item.id = element.id;
          item.name = element.name;
          item.img = element.images[1].url;
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
