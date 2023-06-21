import React from "react";
import img from "../logo.png";
import "./css/slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Slider(props) {


    const renderSlides = () => {
        const slides = [];
        for (let i = 0; i < 12; i++) {
          slides.push(
            <SwiperSlide key={i}>
              <div className="slider-item">
                <img src={img} alt="img" width="100%" />
                <p>Playlist</p>
                <p>Playlist description</p>
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
          slidesPerView={7}
          navigation
        //   pagination={{ clickable: true }}
        //   scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)} 
          className="slider-container"
        >
            {
               renderSlides()
            }
       

        </Swiper>
</>
  );
}

export default Slider;
