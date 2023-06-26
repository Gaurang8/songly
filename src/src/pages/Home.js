import React from "react";
import SideBar from "../components/SideBar";
import Body from "../components/Body";
import './Home.css'

function Home() {
  return (
    <div className="homepage">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="body">
        <Body />
      </div>
    </div>
  );
}

export default Home;
