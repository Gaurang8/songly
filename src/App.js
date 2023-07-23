import React, { useState, useEffect } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SideBar from "./components/SideBar";
import "./App.css";
import Home from "./pages/Home";
import { MyContext } from "./myContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Song from "./pages/Song";
import Login from "./pages/user";
import { authUser } from "./api_fetch/fetchapi";
import Searchpage from "./pages/Searchpage";

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const userData = await authUser();
      console.log(userData)
      setUser(userData);
      setIsAuth(userData);
    }
    fetchUser();
  }, []);

  console.log(user?.name);

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
        <MyContext.Provider value={{isAuth , setIsAuth , user , setUser}}>
          <BrowserRouter>
            {navbarOpen && (<>
            <div className="sidebar">
                <SideBar />
              </div>
              <div className="empty-div-sbar" onClick={navbarToggle}></div></>

            )}
            <div className="body">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/song/:id/:type" element={<Song />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/search" element={<Searchpage />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
          <div className="navbar-toggle" onClick={navbarToggle}>
            <KeyboardDoubleArrowLeftIcon />
          </div>
        </MyContext.Provider>
      </div>
    </>
  );
}

export default App;