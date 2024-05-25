import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { IconHome, IconPremiumRights, IconUserCircle } from '@tabler/icons-react'
// import useAuth from '../hooks/useAuth'

function AuthRoute() {
  // const { userIsAuthenticated } = useAuth()

  const links = [
    { label: 'Inicio', href: '/', icon: <IconHome size="3rem" stroke={1.5} /> },
    { label: 'Mis rifas', href: '/raffles', icon: <IconPremiumRights size="3rem" stroke={1.5} /> },
    { label: 'Mi perfil', href: '/admin/profile', icon: <IconUserCircle size="3rem" stroke={1.5} /> }
  ]

  return (
    <>
      <Navbar links={links} />
      <Outlet />
    </>
  )
}

export default AuthRoute