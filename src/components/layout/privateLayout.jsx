import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PrivateNavBar from '../PrivateNavBar'

const privateLayout = () => {
    const auth = true

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