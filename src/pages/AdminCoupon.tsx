import Layout from "../Layout"
import axios from "axios";
import { IRaffles } from "../interfaces";
import { Card, createStyles, Title, Group, Text, Button, Paper, Avatar, Box, Image, Badge, Loader } from "@mantine/core"
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from "react";
import { motion } from 'framer-motion'
import { useUser } from "../hooks/useUser";
import { IconChevronLeft, IconChevronRight, IconGraphFilled, IconStars, IconUserDollar } from "@tabler/icons-react";
import moment from "moment";
import standarize from "../utils/standarize";
import useAuth from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

interface IStats {
  data: IRaffles
}

interface IStatuses {
  status: 'En venta' | 'Finalizando' | 'Cerrado' | 'Winner' | 'NoWinner'
}

interface IStats {
  rejected_payments: number;
  unverified_payments: number;
  total_profit: number;
  quantity_sold: number
}

function Coupon() {
  const isMobile = useMediaQuery(`(max-width: 900px)`);

  const { user } = useUser();
  const { token } = useAuth();
  const { currentExchange } = useLanguage();

  const [illumination, setIllumination] = useState<boolean>(false);
  const [touchMove, setTouchMove] = useState<string>('0%');
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)
  const [raffles, setRaffles] = useState<IRaffles[]>([])
  const [raffleSelected, setRaffleSelected] = useState<IRaffles | null>(null)
  const [stats, setStats] = useState<IStats | null>(null)

  const count = 3;

  const useStyles = createStyles((theme) => ({
    main: {},
    mainCard: {
      margin: '5px 5px 0 5px',
      height: '95vh',
      boxShadow: `0 1px 0 0 ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
      background: `${theme.colorScheme === 'dark' ? '#1A1B1E' : '#fff'}`,
      border: `0.0625rem solid ${theme.colorScheme === 'dark' ? 'transparent' : '#dee2e6'}`,
    },
    couponWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      gap: '5px',
      maxWidth: 900,
      flexWrap: 'wrap',
      marginTop: 5,
      padding: '10px'
    },
    couponCard: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '17%',
      height: '100px',
      ':hover': {
        background: theme.colors.blue[5],
        cursor: 'pointer',
        scale: '1.03',
        transition: 'all 1s'
      }
    },
    couponContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    paymentDesktop: {
      width: '87%',
      marginTop: '10px',
      height: '100%',
      display: isMobile ? 'none' : 'block',
      border: `0.0625rem solid ${theme.colorScheme === 'dark' ? 'transparent' : '#dee2e6'}`,
    },
    paymentMobile: {
      position: 'absolute',
      width: 'calc(100% - 4px)',
      border: `0.0625rem solid ${theme.colorScheme === 'dark' ? 'transparent' : '#dee2e6'}`,
      borderBottom: 'none',
      marginTop: '10px',
      height: '100%',
      bottom: 0,
      zIndex: 2,
      borderRadius: '25px 25px 0 0',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },
    touchWrapper: {
      display: 'flex',
      width: '100%',
      height: '20px',
      justifyContent: 'center',
    },
    touchBar: {
      width: 40,
      height: '3px',
      backgroundColor:
        illumination
          ? theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.gray[9]
          : theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[6],
      borderRadius: '10px',
      marginTop: '6px'
    },
    cart: {
      width: '100%',
      height: 400
    },
    removeButton: {
      display: 'flex',
      justifyContent: 'end',
      marginBottom: '10px',
    },
    cardQuantity: {
      width: '50px',
      height: '50px',
      background: theme.colors.blue[6]
    },
    couponSelector: {
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    },
    buttonBuy: {
      position: 'absolute',
      bottom: 10,
      right: 0,
      borderRadius: '3px 0 0 3px'
    },
    raffleLabel: {
      color: 'black',
      fontSize: 13.5,
      fontWeight: 600,
      textAlign: 'center',
      background: '#fff',
      margin: '-16px -16px 0 -16px',
      paddingY: '5px',
      borderRadius: '5px 5px 0 0'
    },
    pagyWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    },
    leftPagy: {
      borderRadius: '5px 0 0 5px'
    },
    rightPagy: {
      borderRadius: '0 5px 5px 0'
    },
    pagyText: {
      fontWeight: 700,
      fontSize: 12,
      width: '100%',
      marginTop: '-20px',
      padding: '0 10px 0 0',
      textAlign: 'end'
    },
    cardProfit: {
      marginBottom: 10,
      background: theme.colorScheme === 'dark' ? theme.colors.teal[8] : theme.colors.teal[5]
    },
    cardQuantitySold: {
      background: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[5]
    },
    cardRejectedPayments: {
      width: 'calc(50% - 5px)'
    },
    cardUnverifyPayments: {
      width: 'calc(50% - 5px)'
    }
  }))

  useEffect(() => {
    axios.get(`http://localhost:3000/social/raffles/actives?content_code=${user?.content_code}&count=${count}&page=${page}`)
      .then((res) => {
        setRaffles(res.data.social_raffles)
        setPage(res.data.metadata.page)
        setPages(res.data.metadata.pages)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    setStats(null)
    axios.get(`http://localhost:3000/social/stats/specific?id=${raffleSelected?.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setStats(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [raffleSelected])

  const selectRaffle = (data: IRaffles) => {
    setIsOpen(false)
    setRaffleSelected(data)
    setIsOpen(true)
  }

  const { classes } = useStyles()
  const constraintsRef = useRef(null);

  const { t } = useTranslation();

  const SuperiorHead = () => (
    <Group position="apart">
      <div>
        <Title order={2} mb={10}>
          {t('couponsTitle')}
        </Title>
      </div>
      <div className={classes.pagyWrapper}>
        <Text
          className={classes.pagyText}
        >
          {t('page')} {page} {t('of')} {pages}
        </Text>
        <Group spacing={0} mt={0}>
          <Button
            size="xs"
            disabled={page === 1}
            className={classes.leftPagy}
          >
            <IconChevronLeft size={20} />
          </Button>
          <Button
            size="xs"
            disabled={page === pages}
            className={classes.rightPagy}
          >
            <IconChevronRight size={20} />
          </Button>
        </Group>
      </div>
    </Group>
  )

  const StatusBadge = ({ status }: IStatuses) => {
    const colors = {
      'En venta': 'teal',
      'Finalizando': 'yellow',
      'Cerrado': 'red',
      'Winner': 'purple',
      'NoWinner': 'cyan'
    }

    const labels = {
      'En venta': 'On sale',
      'Finalizando': 'Ending',
      'Cerrado': 'Closed',
      'Winner': 'Has winners',
      'NoWinner': 'No winners yet'
    }

    return (
      <Badge color={colors[status]} variant="light">{labels[status]}</Badge>
    )
  }

  const StatsPage = ({ data }: IStats): React.ReactElement => {
    return (
      <center>
        <Paper mx={10} py={20} px={10} maw={400}>
          <Text fw={1000} fz={12} mb={10}>
            {t('statsProfile').toUpperCase()}
          </Text>
          <Card
            className={classes.cardProfit}
          >
            <Group position='apart'>
              <Text fw={1000} fz={12}>
                GANANCIAS DE VENTAS
                {
                  stats !== null ? (
                    <Text ta="start" fw={700} fz={20}>
                      {standarize({ value: Number(stats?.total_profit), currency: 'USD', country: currentExchange() })}
                    </Text>
                  ) : (
                    <Group position="left">
                      <Loader size={30} variant="dots" color="white" />
                      <Text fw={700} fz={20}>
                        {t('loading')}
                      </Text>
                    </Group>
                  )
                }
              </Text>
              <Avatar color='dark' variant="light">
                <IconUserDollar stroke={1.5} />
              </Avatar>
            </Group>
          </Card>
          <Card
            className={classes.cardQuantitySold}
          >
            <Group position='apart'>
              <Text fw={1000} fz={12}>
                CANTIDAD DE VENTAS
                {
                  stats !== null ? (
                    <Text ta="start" fw={700} fz={20}>
                      {stats?.quantity_sold}
                    </Text>
                  ) : (
                    <Group position="left">
                      <Loader size={30} variant="dots" color="white" />
                      <Text fw={700} fz={20}>
                        {t('loading')}
                      </Text>
                    </Group>
                  )
                }
              </Text>
              <Avatar color='dark' variant="light">
                <IconStars stroke={1.2} />
              </Avatar>
            </Group>
          </Card>
          <Group mt={10} position="apart" w="100%" spacing={10}>
            <Button
              variant="gradient"
              className={classes.cardUnverifyPayments}
              size="xs"
              bg="yellow"
            >
              {stats?.unverified_payments} {t('unverifiedPayments')}
            </Button>
            <Button
              variant="gradient"
              className={classes.cardRejectedPayments}
              size="xs"
              bg="red"
            >
              {stats?.rejected_payments} {t('rejectedPayments')}
            </Button>
          </Group>
          <Box mt={20}>
            <Text fw={1000} fz={12}>
              DATOS DE LA RIFA
            </Text>
            <Card mt={10}>
              <Group position="center">
                <Image
                  src={data.ad.url === null ? '/no_image.jpg' : data.ad.url}
                  radius="md"
                  alt='raffle image'
                  mb={10}
                  width='100%'
                  height={160}
                />
              </Group>
              <Group position="center" mb={10}>
                <StatusBadge status={data.status} />
                <StatusBadge status={data.has_winners ? 'Winner' : 'NoWinner'} />
              </Group>
              <Group position="apart">
                <Text fw={1000} fz={12}>
                  RIFA:
                </Text>
                <Text fw={700} fz={14}>
                  {data.title}
                </Text>
              </Group>
              <Group position="apart">
                <Text fw={1000} fz={12}>
                  TIPO DE RIFA:
                </Text>
                <Text fw={700} fz={14}>
                  {data.raffle_type}
                </Text>
              </Group>
              <Group position="apart">
                <Text fw={1000} fz={12}>
                  TIPO DE SORTEO:
                </Text>
                <Text fw={700} fz={14}>
                  {data.draw_type}
                </Text>
              </Group>
              <Group position="apart">
                <Text fw={1000} fz={12}>
                  CREACIÓN:
                </Text>
                <Text fw={700} fz={14}>
                  {moment(data.created_at).format('DD/MM/YYYY')}
                </Text>
              </Group>
              <Group position="apart">
                <Text fw={1000} fz={12}>
                  EXPIRACIÓN:
                </Text>
                <Text fw={700} fz={14}>
                  {moment(data.expired_date).format('DD/MM/YYYY')}
                </Text>
              </Group>
            </Card>
          </Box>
        </Paper>
      </center>
    )
  }

  const CouponSelector = () => (
    raffles.map((raffle) => {
      return (
        <Card
          key={raffle.id}
          className={classes.couponSelector}
          style={{ backgroundImage: `url(${raffle.ad.url === null ? '/no_image.jpg' : raffle.ad.url})` }}
          w="100%"
          h={180}
        >
          <Text
            className={classes.raffleLabel}
          >
            {raffle.title}
          </Text>
          <Button
            size="xs"
            className={classes.buttonBuy}
            variant="gradient"
            onClick={() => selectRaffle(raffle)}
            leftIcon={<IconGraphFilled />}
          >
            {t('statsProfile')}
          </Button>
        </Card>
      )
    })
  )

  return (
    <>
      <Layout full noOverlap>
        <Card className={classes.mainCard}>
          <SuperiorHead />
          <div className={classes.couponContainer}>
            <div className={classes.couponWrapper}>
              <CouponSelector />
              <motion.div
                ref={constraintsRef}
                className={classes.paymentMobile}
                drag='y'
                dragConstraints={constraintsRef}
                initial={{
                  bottom: '-95%'
                }}
                animate={{
                  bottom: isOpen === false ? '-100%' : touchMove
                }}
              >
                <motion.div
                  className={classes.touchWrapper}
                  drag='y'
                  dragMomentum={false}
                  dragTransition={{
                    bounceDamping: 10,
                    bounceStiffness: 100,
                    max: 0,
                    min: 0,
                    restDelta: 100,
                    from: 0,
                    power: 0,
                    timeConstant: 0.01,

                  }}
                  onDragStart={() => {
                    setIllumination(true)
                  }}
                  ref={constraintsRef}
                  dragConstraints={constraintsRef}
                  dragSnapToOrigin
                  onDragEnd={(_, info) => {
                    setIllumination(false)
                    if (info.offset.y < 0) {
                      setTouchMove('0%');
                    } else {
                      setIsOpen(false)
                      setStats(null)
                      setTimeout(() => {
                        setRaffleSelected(null)
                      }, 500)
                    }
                  }}
                >
                  <motion.div className={classes.touchBar} />
                </motion.div>
                {
                  raffleSelected !== null && <StatsPage data={raffleSelected} />
                }
              </motion.div>
            </div>
          </div>
        </Card>
      </Layout>
    </>
  )
}

export default Coupon