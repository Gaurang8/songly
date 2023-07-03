import React, { useState, useEffect } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SideBar from "./components/SideBar";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Song from "./pages/Song";

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const navbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 580) {
        setNavbarOpen(false);
      } else {
        setNavbarOpen(true);
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <div className="main-frame">
        <BrowserRouter>
          {navbarOpen && (
            <div className="sidebar">
              <SideBar />
            </div>
          )}
          <div className="body">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/song/:id/:type" element={<Song />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        <div className="navbar-toggle" onClick={navbarToggle}>
          <KeyboardDoubleArrowLeftIcon />
        </div>
      </div>
    </>
  );
}

export default App;
