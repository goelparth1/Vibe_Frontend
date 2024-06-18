import React from 'react'
import Header from './components/Header.tsx'
import SideBar from './components/SideBar.tsx'
import Footer from './components/Footer.tsx'
import { Outlet } from 'react-router-dom'
function RootLayout() {
  return (
    <div
    className = "w-full md:flex">
    <Header />
    <SideBar />
    <section 
    className = " flex flex-1 h-full">
    <Outlet />
    </section>
    <Footer />
    </div>
  )
}

export default RootLayout
