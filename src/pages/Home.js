import React from "react";
import SideBar from "../components/SideBar";
import Body from "../components/Body";
import Footer from "../components/Footer";
import './Home.css'

function Home() {
  return (
    <div className="homepage">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="body">
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
