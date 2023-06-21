import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import './css/navbar.css'


function NavBar() {
  return (
    <div className='navbar'>
       <div className='input-search'>
        <input type='text' className='input-field'/>
          <SearchIcon className='input-icon'/>
       </div>
       <button className='primary-btn'>Upgrade </button>
       <button className='secondary-btn'>Get App</button>

       <div className='login-user'>
       <Avatar/>
       </div>
    </div>
  )
}

export default NavBar
