import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { IconGift, IconPremiumRights, IconUserCircle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
// import useAuth from '../hooks/useAuth'

function AuthRoute() {
  // const { userIsAuthenticated } = useAuth()
  const { t } = useTranslation()

  const links = [
    { label: t('navbarPayments'), href: '/admin/payments', icon: <IconPremiumRights size="3rem" stroke={1.5} /> },
    { label: t('navbarMyRaffles'), href: '/raffles', icon: <IconGift size="3rem" stroke={1.5} /> },
    { label: t('navbarMyProfile'), href: '/admin/profile', icon: <IconUserCircle size="3rem" stroke={1.5} /> }
  ]

  return (
    <>
      <Navbar links={links} />
      <Outlet />
    </>
  )
}

export default AuthRoute