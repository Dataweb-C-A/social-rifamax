import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { IconAt, IconGift, IconHome, IconLock, IconLockCheck, IconPremiumRights, IconUserCircle, IconX } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'
import useAuth from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { Button, Card, Group, Image, Loader, Modal, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDebouncedState } from '@mantine/hooks'
import axios from 'axios'
import UploadProfile from './UploadProfile'
import { notifications } from '@mantine/notifications'

interface IFirstEntryForm {
  password: string;
  password_confirmation: string;
  content_code: string;
}

function AuthRoute() {
  const { authenticate, token } = useAuth()
  const { t } = useTranslation()
  const { user, updateNoToken } = useUser()
  const { changeLanguage } = useLanguage()
  const navigate = useNavigate()

  const [firstContentCode, setFirstContentCode] = useDebouncedState<string>(user?.content_code || '', 700);
  const [isValidContentCode, setIsValidContentCode] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(true)
  const [submitClick, setSubmitClicked] = useState<boolean>(false)

  const form: any = useForm<IFirstEntryForm>({
    initialValues: {
      password: '',
      password_confirmation: '',
      content_code: firstContentCode
    },
    validate: {
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters long' : null),
      password_confirmation: (value) => (value !== form.values.password ? 'Passwords do not match' : null),
      content_code: () => (firstContentCode.length < 3 ? 'Invalid content code' : null)
    }
  })

  const links = [
    { label: t('navbarHome'), href: '/admin/dashboard', icon: <IconHome size="3rem" stroke={1.5} />, role: ["Admin", "Influencer"] },
    { label: t('navbarPayments'), href: '/admin/payments', icon: <IconPremiumRights size="3rem" stroke={1.5} />, role: ["Admin", "Influencer"] },
    { label: t('navbarMyRaffles'), href: '/admin/coupon', icon: <IconGift size="3rem" stroke={1.5} />, role: ["Influencer"] },
    { label: t('navbarMyProfile'), href: '/admin/profile', icon: <IconUserCircle size="3rem" stroke={1.5} />, role: ["Admin", "Influencer"] }
  ]

  const validatesRouteIsAllowed = () => {
    const allowedRoutes = links.map(link => link.href)
    const currentRoute = window.location.pathname

    if (!allowedRoutes.includes(currentRoute)) {
      navigate('/admin/dashboard')
      console.log('Route not allowed')
    } else {
      console.log('Route allowed')
    }
  }

  useEffect(() => {
    if (firstContentCode.length > 3) {
      setIsValidContentCode(false)
      axios.get(`http://localhost:3000/social/influencers?content_code=${firstContentCode}`)
        .then((res) => {
          if (res.data.id === user?.id) {
            setIsValidContentCode(true)
          } else {
            setIsValidContentCode(false)
          }
          setIsValidating(false)
        })
        .catch(() => {
          setIsValidContentCode(true)
          setIsValidating(false)
        })
    }
  }, [firstContentCode])

  useEffect(() => {
    validatesRouteIsAllowed()
    authenticate()
  }, [])

  const linksByRole = links.filter(link => link.role.includes(String(user?.role)))

  const UserLoading = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Group position="center">
          <Loader size="xl" />
          <Text mt="lg">{t('loading')}</Text>
        </Group>
      </div>
    )
  }

  const submit = () => {
    setSubmitClicked(true)
    axios.put('http://localhost:3000/shared/users/welcome', {
      shared_user: {
        password: form.values.password,
        password_confirmation: form.values.password_confirmation,
        content_code: form.values.content_code
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      updateNoToken({ user: res.data })
    }).catch(() => {
      setSubmitClicked(false)
      notifications.show({
        autoClose: 5000,
        title: <Text c="white" fw={700} fz={17} italic>{t('alert')}</Text>,
        message: <Text c="white" fz={15}>{t('errorInfluencer')}</Text>,
        icon: <IconX size={20} />,
        color: "red",
        loading: false,
        withCloseButton: true,
        className: "my-notification-class",
        style: { backgroundColor: "red", height: '100px' },
        sx: { backgroundColor: "red" },
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.blue[6],

            '&::before': { backgroundColor: theme.white },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
    })
  }

  return (
    <>
      {
        user ? (
          <>
            <Navbar links={linksByRole} />
            <Outlet />
          </>
        ) : (
          <UserLoading />
        )
      }
      {
        user?.is_first_entry && (
          <Modal
            opened
            size="xl"
            centered
            onClose={() => console.log('Modal closed')}
            withCloseButton={false}
            closeOnEscape={false}
            closeOnClickOutside={false}
          >
            <Card
              pb={5}
              mb={10}
            >
              <Group
                position='apart'
                w="100%"
                mb={10}
              >
                <Text
                  fz={16}
                  italic
                  fw={700}
                >
                  {t('welcomeTitle')}
                </Text>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15
                  }}
                >
                  <Image
                    style={{ cursor: 'pointer' }}
                    src="/en_icon.png"
                    height={30}
                    width={30}
                    radius="xl"
                    onClick={() => changeLanguage('en')}
                  />
                  <Image
                    style={{ cursor: 'pointer' }}
                    src="/es_icon.png"
                    height={30}
                    width={30}
                    radius="xl"
                    onClick={() => changeLanguage('es')}
                  />
                </div>
              </Group>
            </Card>
            <Text fz={14} ta="center" mb={10}>{t('welcomeMessage')}</Text>
            <UploadProfile />
            <form>
              <PasswordInput
                mb={5}
                label={t('password')}
                placeholder={t('password')}
                error={form.errors.password}
                icon={<IconLock size='1.5rem' />}
                {...form.getInputProps('password')}
              />
              <PasswordInput
                mb={5}
                label={t('passwordConfirmation')}
                placeholder={t('passwordConfirmation')}
                icon={<IconLockCheck size='1.5rem' />}
                error={form.errors.password_confirmation}
                {...form.getInputProps('password_confirmation')}
              />
              <TextInput
                label={t('contentCode')}
                placeholder={t('contentCode')}
                value={firstContentCode}
                icon={<IconAt size="1.3rem" />}
                error={form.errors.content_code}
                onChange={(event) => setFirstContentCode(event.currentTarget.value)}
              />
              {
                firstContentCode.length > 2 && (
                  <Text
                    mt={5}
                    mb={10}
                    fz={14}
                    ta="center"
                    color={isValidContentCode ? 'green' : isValidating ? 'blue' : 'red'}
                  >
                    {
                      isValidating ? t('validating') : isValidContentCode ? t('contentCodeValid') : t('contentCodeInvalid')
                    }
                  </Text>
                )
              }
              <Button
                mt={10}
                variant="light"
                size="xs"
                onClick={submit}
                disabled={!form.isValid() || !isValidContentCode || user?.avatar === null || submitClick}
                fullWidth
              >
                {t('finish')}
              </Button>
            </form>
          </Modal>
        )
      }
    </>
  )
}

export default AuthRoute