import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom';

export const ScreenLayout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

