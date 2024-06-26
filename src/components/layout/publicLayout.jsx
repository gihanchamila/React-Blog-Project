import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PublicNavBar from '../PublicNavBar'

const publicLayout = () => {
    const auth = true

    if(!auth){
        return <Navigate to="/" />
    }

  return (
    <>
        <PublicNavBar />
        <Outlet />
    </>
  )
}

export default publicLayout