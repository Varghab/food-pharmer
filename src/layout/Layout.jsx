import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Navbar />
        <div className='min-h-screen'>
          <Outlet />
        </div>
      <Footer />
    </div>
  )
}

export default Layout
