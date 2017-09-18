import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = (props) =>
  <div style={{ padding: '10px', width: '10%', background: '#f0f0f0' }}>
    <ul style={{ listStyleType: 'none', padding: 0 }}>

      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      {/* <li><Link to="/plans">Plans</Link></li>
      <li><Link to="/facts">Facts</Link></li> */}
      <li><Link to="/user">Profile</Link></li>

    </ul>
  </div>

export default Sidebar
