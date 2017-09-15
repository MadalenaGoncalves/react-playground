import React from 'react'
import Sidebar from 'components/layout/Sidebar'
import Navbar from 'components/layout/Navbar'
import Footer from 'components/layout/Footer'

const Page = (props) =>
  <div style={{ display: 'flex' }}>
    <Sidebar />

    <Navbar />

    {props.children}

    <Footer />
  </div>

export default Page
