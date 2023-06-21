import React from "react";
import "./css/body.css";
import NavBar from "./NavBar";
import Slider from "./Slider";
import Footer from "./Footer";

function Body() {
  const list = ["trending", "weekly-top", "all time favorite"];

  return (
    <div>
      <NavBar />
      <div className="slide-container">
        {list.map((element) => {
          return <Slider title={element} />;
        })}
      </div>

      <hr className="bottom-rural" />
      <Footer />
    </div>
  );
}

export default Body;
