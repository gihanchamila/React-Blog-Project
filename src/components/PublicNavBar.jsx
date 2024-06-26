import React from 'react'
import { NavLink } from 'react-router-dom'

const PublicNavBar = () => {
  return (
    <nav className='primary-link'>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
    </nav>
  )
}

export default PublicNavBar