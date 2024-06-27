import { Navigate, Outlet } from 'react-router-dom'
import PrivateNavBar from '../PrivateNavBar'
import { useAuth } from '../context/useAuth'

const PrivateLayout = () => {
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

export default PrivateLayout