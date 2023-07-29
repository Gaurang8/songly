import React ,{useState , useContext} from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import "./css/navbar.css";
import { Link  } from "react-router-dom";
import { MyContext } from "../myContext";


import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';

function NavBar({ handleSearch, setSearchValue, searchValue }) {

  const { user } = useContext(MyContext);
  const [openDialog , setOpenDialog] = React.useState(false);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="navbar">
      <Link to="/search"><div className="input-search">
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchValue}
          autoFocus
          onKeyDown={handleKeyDown}
          class="sh-search-text"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          required
        />
        <button type="submit" class="src-btn" onClick={handleSearch}>
          <IconButton className="src-btn-icon">
            <SearchIcon />
          </IconButton>
        </button>
      </div></Link>
      <button className="upgrade primary-btn">Upgrade </button>
      <button className="get-app secondary-btn">Get App</button>
      <div className="login-user" onClick = {()=>{
        setOpenDialog(!openDialog);
      }} >
          <Avatar />
        <div className={`login-dialog-box ${ openDialog ? "active": ""}`}>
          {user.name ? (<p className="login-box-name">hey , {user.name}</p>):(<p className="login-box-name">Login</p>)}
          <p><BadgeIcon className="login-box-icons"/><span>profile</span></p>
          <p><SettingsIcon className="login-box-icons"/><span>Setting</span></p>
          <p><HelpOutlineOutlinedIcon className="login-box-icons"/><span>Help</span></p>
          <p>{!user.name ? (<><LoginIcon className="login-box-icons"/><Link to="/login"><span>Log in</span></Link></>):(<><LogoutIcon className="login-box-icons"/><span>Log Out</span></>)}</p>
          </div>
      </div>
    </div>
  );
}

export default NavBar;
