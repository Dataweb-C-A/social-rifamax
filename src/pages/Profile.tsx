import { Avatar, Card, Group, Divider, createStyles, Text, Paper, Image, Button, Badge, Loader } from "@mantine/core"
import { initials } from "../utils/initials"
import Layout from "../Layout"
import { useUser } from "../hooks/useUser"
import { useTranslation } from "react-i18next"
import { IconUser, IconShieldCheck, IconUserCheck } from "@tabler/icons-react"
import { modals } from '@mantine/modals'
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import axios from "axios"
import { IDetailsPagoMovil, IDetailsZelle } from "@/interfaces"
import * as Icons from '@tabler/icons-react';
import EditProfileModal from "../layouts/profile/EditProfile.modal"

interface IPaymentDetails {
  id: number;
  name: "Pago Móvil" | "Zelle" | "Stripe" | "Paypal";
  details: IDetailsPagoMovil | IDetailsZelle;
  country: "Venezuela" | "Estados Unidos";
}

interface ISocialDetails {
  name: 'Facebook' | 'Instagram' | 'Twitch' | 'X' | 'YouTube';
  username: string;
  url: string;
  social_influencer_id: string
}

interface ISocialBadges {
  title: string;
  color: string;
  icon: string;
}

function Profile() {
  const { user } = useUser();
  const { signOut, token } = useAuth();

  const { t } = useTranslation();

  const [paymentDetails, setPaymentDetails] = useState<IPaymentDetails[]>([]);
  const [socialDetails, setSocialDetails] = useState<ISocialDetails[]>([]);
  const [badges, setBadges] = useState<ISocialBadges[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [nextTry, setNextTry] = useState<number>(0);

  const editProfileModal = () => modals.open({
    title: <Text fw={700} fz={17}>{t('editProfile')}</Text>,
    children: (
      <EditProfileModal />
    ),
    centered: true,
  })

  // const insightsModal = () => modals.openConfirmModal({
  //   title: <Text fw={700} fz={17}>{t('statsProfile')}</Text>,
  //   labels: { confirm: t('accept'), cancel: t('goBack') },
  //   centered: true,
  //   onConfirm: () => console.log('Confirmed'),
  //   onCancel: () => console.log('Canceled')
  // })

  useEffect(() => {
    setError(false)
    setLoading(true)
    axios.get("http://localhost:3000/social/details", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setPaymentDetails(res.data.social_payment_options)
        setSocialDetails(res.data.social_networks)
        setBadges(res.data.badges)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(true)
        console.error(err)
      })
  }, [nextTry])

  const logos = {
    instagram: '/instagram_logo.webp',
    facebook: '/facebook_logo.png'
  }

  const paymentLogos = {
    Stripe: '/stripe_logo.jpeg',
    Zelle: '/zelle_logo.png',
    "Pago Móvil": '/pagomovil_logo.jpg',
    Paypal: '/paypal_logo.webp'
  }


  const useStyles = createStyles((theme) => ({
    mainCard: {
      margin: '5px 5px 0 5px',
      height: 'calc(100vh - 85px)',
      boxShadow: `0 1px 0 0 ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
      background: `${theme.colorScheme === 'dark' ? '#1A1B1E' : '#fff'}`,
      border: `0.0625rem solid ${theme.colorScheme === 'dark' ? 'transparent' : '#dee2e6'}`,
      padding: '0px 7px'
    },
    cardProfile: {
      maxWidth: '400px',
      width: '100%',
    },
    socialLogo: {
      width: 'calc(35% - 10px)',
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '-10px'
    },
    socialLabel: {
      width: 'calc(65% - 10px)',
      marginBottom: '-10px'
    },
    paymentLabel: {
      width: 'calc(65% - 10px)',
      marginBottom: '-10px'
    },
    paymentLogo: {
      width: 'calc(35% - 10px)',
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '-10px'
    },
    pencilButton: {
      borderRadius: '100%',
      padding: '5px 6px',
    }
  }))

  const { classes } = useStyles();

  const AvatarImage = () => {
    return (
      <Avatar size="160px" bg="transparent" radius="100%">
        {
          user?.avatar ? <Image src={user?.avatar} alt="profile_pic" /> : initials(user?.name || '')
        }
      </Avatar>
    )
  }

  const ProfileCard = () => {
    return (
      <>
        <Group position="center">
          <Paper radius="100%" p="3.5px" bg="blue">
            <AvatarImage />
          </Paper>
        </Group>
        <Text ta="center" mt={10} fw={700} fz={20}>
          {user?.name}
        </Text>
        <Text ta="center" fz={13} c="dimmed">
          {user?.email}
        </Text>
        <Group position="center" spacing={5}>
          <Badge
            color="teal"
            radius='sm'
            size="sm"
            variant="light"
            my={5}
            leftSection={
              <IconShieldCheck
                style={{ marginTop: '4px' }}
                stroke={2.5}
                size="0.9rem"
              />
            }
          >
            {t('verified')}
          </Badge>
          <Badge
            color="pink"
            radius='sm'
            size="sm"
            variant="light"
            my={5}
            leftSection={
              <IconUserCheck
                style={{ marginTop: '4px' }}
                stroke={2.5}
                size="0.9rem"
              />
            }
          >
            {user?.role}
          </Badge>
          {
            badges.map((badge, index) => {
              const Icon = (Icons as unknown as { [key: string]: React.ElementType })[badge.icon];
              if (!Icon) {
                console.warn(`Icon ${badge.icon} not found`);
                return null;
              }
              return (
                <Badge
                  key={index}
                  color={badge.color}
                  radius='sm'
                  size="sm"
                  variant="light"
                  my={5}
                  leftSection={
                    <Icon
                      style={{ marginTop: '4px' }}
                      stroke={2}
                      size="1rem"
                    />
                  }
                >
                  {badge.title}
                </Badge>
              )
            })
          }
        </Group>
        <Group position="center" mt={5} spacing={10}>
          <Button
            leftIcon={<IconUser size="1.3rem" />}
            variant="light"
            color="blue"
            size="xs"
            fullWidth
            onClick={editProfileModal}
          >
            {t('editProfile')}
          </Button>
          {/* <Button
            leftIcon={<IconGraphFilled size="1.3rem" />}
            variant="light"
            color="teal"
            size="xs"
            onClick={insightsModal}
          >
            {t('statsProfile')}
          </Button> */}
        </Group>
      </>
    )
  }

  const SocialCard = () => {
    return (
      <>
        <Divider variant="dashed" mt={10} />
        <Text ta="center" fw={700} fz={16} mt={10}>
          {t('mySocials')}
        </Text>
        <Group position="center" w="100%" mt={5} mb={10}>
          {socialDetails.map((social, index) => {
            return (
              <>
                <div className={classes.socialLogo} key={index}>
                  <img width="20px" src={logos[social.name.toLowerCase() as keyof typeof logos]} />
                </div>
                <div className={classes.socialLabel} key={index}>
                  <Text ta="start" fz={13} c="dimmed">
                    {social.username}
                  </Text>
                </div>
              </>
            )
          })}
          {
            loading && (
              <>
                <Group position="center">
                  <Loader size={30} />
                  <Text ta="center" fz={13} c="dimmed">
                    {t('loading')}
                  </Text>
                </Group>
              </>
            )
          }
          {
            error && (
              <Text ta="center" fz={13} c="dimmed">
                {t('errorLoading')}
              </Text>
            )
          }
        </Group>
        <Divider variant="dashed" mt={25} />
      </>
    )
  }

  const PaymentCard = () => {
    return (
      <>
        <Text ta="center" fw={700} fz={16} mt={10}>
          {t('myPaymentsMethod')}
        </Text>
        <Group position="center" w="100%" mt={5} mb={10}>
          {paymentDetails.map((payment, index) => {
            return (
              <>
                <div className={classes.paymentLogo} key={index}>
                  <img width="20px" src={paymentLogos[payment.name]} />
                </div>
                <div className={classes.paymentLabel} key={index}>
                  <Text ta="start" fz={13} c="dimmed">
                    {payment.name}
                  </Text>
                </div>
              </>
            )
          })}
          {
            loading && (
              <>
                <Group position="center">
                  <Loader size={30} />
                  <Text ta="center" fz={13} c="dimmed">
                    {t('loading')}
                  </Text>
                </Group>
              </>
            )
          }
          {
            error && (
              <>
                <Text ta="center" fz={13} c="dimmed">
                  {t('errorLoading')}
                </Text>
              </>
            )
          }
        </Group>
        {
          error && (
            <Button
              mt={5}
              color="blue"
              variant="light"
              onClick={() => setNextTry(nextTry + 1)}
              fullWidth
            >
              {t('retry')}
            </Button>
          )
        }
        <Divider variant="dashed" mt={25} />
      </>
    )
  }

  return (
    <Layout noOverlap>
      <div className={classes.mainCard}>
        <Group w="100%" position="center" mt={7}>
          <Card className={classes.cardProfile} shadow="sm" withBorder>
            <ProfileCard />
            {
              user?.role === 'Influencer' && (
                <>
                  <SocialCard />
                  <PaymentCard />
                </>
              )
            }
            <Button
              mt={10}
              fullWidth
              color="red"
              variant="light"
              onClick={() => signOut()}
            >
              {t('logout')}
            </Button>
          </Card>
        </Group>
      </div>
    </Layout>
  )
}

export default Profile