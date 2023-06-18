import React from 'react'
import './sideoption.css'

function SideOption({Icon , title}) {


  return (
    <div className='side_options'>
      {Icon && <Icon className='side_options_icon'/> }
      {title && <p className='side_options_text'>{title}</p>}
    </div>
  )
}

export default SideOption
