import React , {useRef} from "react";
import img from "../logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "swiper/css/keyboard";
import "swiper/css";
import "./css/slider.css";
import {Link} from "react-router-dom";

function Slider({ title, data })
 {
  const audioRef = useRef(null);

  const handlePlay = (previewUrl) => {
    if (previewUrl) {

      audioRef.current.src = previewUrl;
      audioRef.current.play();
    }
  };

  const renderData = () => {
    const slides = [];
    if (data) {
      if (data.length === 0) {
        return <p>Loading...</p>;
      }

      
      data.map((element,index) => {
     
        if(!element.play || ( element.play && element.play!== "not")){
        slides.push(
          <SwiperSlide key={index}>
            <div className="slider-item">
              <Link to={`/Playlist/${element.id}/${element.type}`}> <img src={element?.img || img} alt="img" width="100%" /></Link>
              <p>{element?.name || "unknown"}</p>
              <p>{element?.artists || "unknown"}</p>
             {element.play && <div className="play-btn"  onClick={() => handlePlay(element.play)}><PlayArrowIcon className="play-btn-icon"/></div> }
            </div>
            <audio ref={audioRef} controls style={{ display: "none" }} />
          </SwiperSlide>
        );}
      });
    }
    return slides;
  };

  return (
    <>
      <h3 className="slide-heading">{title}</h3>
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
            slidesPerView: 6,
          },
          1162:{
            slidesPerView:7
          }
        }}
        keyboard={{
          enabled: true,
        }}
        rewind={true}
        className="slider-container"
      >
        {renderData()}
      </Swiper>
    </>
  );
}

export default Slider;
