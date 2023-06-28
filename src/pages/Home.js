import React,{useState , useEffect} from "react";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SideBar from "../components/SideBar";
import Body from "../components/Body";
import "./Home.css";

function Home() {

  const [navbarOpen, setNavbarOpen] = useState(false);

  const navbarToggle = () =>{
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
    <div className="homepage">
      { navbarOpen &&  <div className="sidebar">
        <SideBar />
      </div>}

      <div className="body">
        <Body />
      </div>

      <div className="navbar-toggle" onClick={navbarToggle}>
        <KeyboardDoubleArrowLeftIcon />
      </div>
    </div>
  );
}

export default Home;
