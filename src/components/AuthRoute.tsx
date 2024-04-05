import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { IconCar, IconHome, IconPremiumRights } from '@tabler/icons-react'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

type Props = {}

function AuthRoute({ }: Props) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const token = localStorage.getItem('token')

  const links = [
    { label: 'Inicio', href: '/', icon: <IconHome size="3rem" stroke={1.5} /> },
    { label: 'Mis compras', href: '/purchases', icon: <IconPremiumRights size="3rem" stroke={1.5} /> },
    { label: 'Mi carrito', href: '/my-cart', icon: <IconCar size="3rem" stroke={1.5} /> }
  ]

  useEffect(() => {
    if (isAuthenticated(token) === false) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Navbar links={links} />
      <Outlet />
    </>
  )
}

export default AuthRoute