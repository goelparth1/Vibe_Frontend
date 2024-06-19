import React from 'react'
import { Outlet,Navigate } from "react-router-dom"
import App from '../App.tsx'

function AuthLandingLayout() {

  const isAuthenticated = false ;
  return (

      <>
    { 
    isAuthenticated ? (
        <Navigate to="/" />
    ) :(
    <>
    <section
    className = 'flex flex-col flex-1 justify-center items-center py-10'>
    < Outlet />
    </section>
    <img
    src = "/assets/images/authbackground.jpg"
    alt = "todo"
    className = "hidden xl:block h-screen w-1/2 bg-no-repeat object-cover " />
    </>
    )
    }
    </>
  )
}

export default AuthLandingLayout
