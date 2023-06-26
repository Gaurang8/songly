import React, { useEffect, useState } from "react";
import img from "../logo.png";
import "./css/slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// backend

const client = "62b91c8cfc9f4a329c60ff1966be9d3d";
const secret = "a45d808d3dc24ab29859cc509c4edb2b";

function Slider(props) {
  const [token, setToken] = useState("");
  const [urldata, setUrlData] = useState([]);
  const [playlistData,setplatlistData] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      let options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: client,
          client_secret: secret,
          audience: "YOUR_API_IDENTIFIER",
        }),
      };

      try {
        const response = await fetch(
          "https://accounts.spotify.com/api/token",
          options
        );
        const responseData = await response.json();
        const accessToken = responseData.access_token;
        setToken(accessToken);
      } catch (error) {
        console.error(error);
      }
    };

    if (token === "") {
      fetchToken();
    }
  }, [token]);

  useEffect(() => {
    const getPlaylist = async (token) => {
      try {
        const result = await fetch(
          `https://api.spotify.com/v1/browse/categories?country=IN&limit=40`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const responseData = await result.json();
        setUrlData(responseData);
        console.log(token);
      } catch (error) {
        console.error(error);
      }
    };

    if (token !== "") {
      getPlaylist(token);
    }
  }, [token]);

  useEffect(()=>{
  
    let listdata = [];

    console.log(urldata)
    if (urldata && urldata.categories && urldata.categories.items) {
      urldata.categories.items.forEach((element) => {
        let item = {};
        item.id = element.id;
        item.name = element.name;
        item.img = element.icons[0].url;
        listdata.push(item);
      })}

    setplatlistData(listdata)
    renderSlides()
    console.log('sdsdsd',playlistData)
  },[urldata]);

  const renderSlides = () => {
    if (playlistData.length === 0) {
      return <p>Loading...</p>; // Return a loading indicator while data is being fetched
    }

    const slides = [];
    for (let i = 12 * props.offcet; i < 12 * (props.offcet + 1); i++) {
      slides.push(
        <SwiperSlide key={i}>
          <div className="slider-item">
            <img src={ playlistData[i]?.img || img  } alt="img" width="100%" />
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
        slidesPerView={2}
        navigation
        onSlideChange={() => console.log("slide change")}
        breakpoints={{
          540: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          600: {
            slidesPerView: 4,
            spaceBetween: 20,
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
    </>
  );
}

export default Slider;
