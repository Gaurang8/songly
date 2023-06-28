import React, { useEffect, useState } from "react";
import img from "../logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css/keyboard";
import "swiper/css";
import "./css/slider.css";
import { fetchToken, getApiData } from "../backend/fetchapi";

const url = "https://api.spotify.com/v1/browse/categories?country=IN&limit=40";

function Slider(props) {
  const [token, setToken] = useState("");
  const [apiData, setapiData] = useState([]);
  const [playlistData,setplatlistData] = useState([]);

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
    const getData = async () => {
      let apiData = await getApiData(token, url);
      setapiData(apiData);
    };

    getData();

  }, [token]);

  useEffect(() => {
    let listdata = [];

    console.log(apiData);
    if (apiData && apiData.categories && apiData.categories.items) {
      apiData.categories.items.forEach((element) => {
        let item = {};
        item.id = element.id;
        item.name = element.name;
        item.img = element.icons[0].url;
        listdata.push(item);
      });
    }

    setplatlistData(listdata);
    // renderSlides();
  }, [apiData]);

  const renderSlides = () => {

    
    if (playlistData.length === 0) {
      return <p>Loading...</p>; // Return a loading indicator while data is being fetched
    }

    const slides = [];
    for (let i = 12 * props.offcet; i < 12 * (props.offcet + 1); i++) {
      slides.push(
        <SwiperSlide key={i}>
          <div className="slider-item">
            <img src={playlistData[i]?.img || img} alt="img" width="100%" />
            <p>{playlistData[i]?.name || "unknown"}</p>
            <p>{playlistData[i]?.id || "unknown"}</p>
          </div>
        </SwiperSlide>
      );
    }
    return slides;
  };
  return (
    <>
      <h3 className="slide-heading">{props.title}</h3>
      <Swiper
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
            slidesPerView: 7,
          },
        }}
        keyboard={{
          enabled: true,
        }}
        rewind={true}
        className="slider-container"
      >
        {renderSlides()}
      </Swiper>

      {console.log(window.innerWidth)}
    </>
  );
}

export default Slider;
