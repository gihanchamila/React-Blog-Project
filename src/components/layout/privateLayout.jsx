import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PrivateNavBar from '../PrivateNavBar'
import { useAuth } from '../context/authContext'

const privateLayout = () => {
    const auth = useAuth()

    if(!auth){
        return <Navigate to="/login" />
    }

  return (
    <>
        <PrivateNavBar />
        <Outlet />
    </>
  )
}

export default privateLayout