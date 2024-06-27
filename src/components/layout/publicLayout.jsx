import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PublicNavBar from '../PublicNavBar'
import { useAuth } from '../context/authContext'

const publicLayout = () => {
    const auth = useAuth()

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