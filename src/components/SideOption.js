import React from 'react'
import './css/sideoption.css'
import { Link } from 'react-router-dom'

function SideOption({ Icon, title}) {

  // console.log(index)
  console.log(title)

  return (
    <div className='side_options'>
      {Icon && <Icon className='side_options_icon' />}
      {title && <p className='side_options_text'>{title}</p>}
    </div>
  )
}

export default SideOption
