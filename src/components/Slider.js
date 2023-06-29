import React from "react";
import img from "../logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import "swiper/css/keyboard";
import "swiper/css";
import "./css/slider.css";

function Slider({ title, data }) {
  const renderData = () => {
    const slides = [];
    if (data) {
      if (data.length === 0) {
        return <p>Loading...</p>;
      }

      
      data.map((element,index) => {
        slides.push(
          <SwiperSlide key={index}>
            <div className="slider-item">
              <img src={element?.img || img} alt="img" width="100%" />
              <p>{element?.name || "unknown"}</p>
              <p>{element?.id || "unknown"}</p>
            </div>
          </SwiperSlide>
        );
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
            slidesPerView: 7,
          },
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
