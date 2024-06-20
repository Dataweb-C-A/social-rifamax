import { Breadcrumbs, Anchor, Card, createStyles, Title, Group, Text, Stepper, ScrollArea, Button, Divider, Avatar } from "@mantine/core"
import Layout from "../Layout"
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from '@mantine/hooks';
import { useState, useRef } from "react";
import { motion } from 'framer-motion'
import { IconCheck, IconCreditCard, IconMinus, IconPlus, IconShoppingBag, IconTrash, IconUser } from "@tabler/icons-react";
import { CouponForm } from "../layouts/coupon/Coupon.form";
import Checkout from "../components/Checkout";

interface ICoupon {

}

function Coupon({ }: ICoupon) {
  const isMobile = useMediaQuery(`(max-width: 900px)`);

  const [illumination, setIllumination] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0)
  const [touchMove, setTouchMove] = useState<string>('0%');
  const [active, setActive] = useState<number>(0);

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
      marginTop: 20,
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
      display: !isMobile ? 'none' : 'block',
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
      backgroundImage: 'url(https://api.rifa-max.com/uploads/x100/raffle/ad/28/Hyundai-Santa-Fe-2023-10.jpg)',
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
    minusButton: {
      borderRadius: '3px 0 0 3px'
    },
    quantityCounter: {
      borderRadius: 0
    },
    plusButton: {
      borderRadius: '0 3px 3px 0'
    }
  }))

  const { classes } = useStyles()
  const navigate = useNavigate()
  const constraintsRef = useRef(null);

  const { t } = useTranslation();
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const items = [
    { title: t('raffles'), href: '/raffles' },
    { title: t('couponsTitle'), href: '/coupon' },
  ].map((item, index) => (
    <Anchor fz={17} mt={-2} onClick={() => navigate(item.href)} key={index}>
      {item.title}
    </Anchor>
  ));

  const addQuantity = (value: number) => {
    if (active === 0) {
      return setQuantity(quantity + value)
    }
  }

  const decreaseQuantity = () => {
    if (active === 0) {
      if (quantity === 1) {
        setTouchMove('-75%');
      }
      return setQuantity(quantity - 1)
    }
  }

  const SuperiorHead = () => (
    <Group position="apart">
      <div>


        <Title order={2} mb={10}>
          {t('couponsTitle')}
        </Title>
      </div>
      <Breadcrumbs>{items}</Breadcrumbs>
    </Group>
  )

  const CouponSelector = () => (
    <Card
      className={classes.couponSelector}
      w="100%"
      h={180}
    >
      <Text
        className={classes.raffleLabel}
      >
        Hyundai Santa Fe 2024
      </Text>
      <Button
        size="xs"
        className={classes.buttonBuy}
        variant="gradient"
        onClick={() => addQuantity(1)}
      >

        {t('buy')}
      </Button>
    </Card>
  )

  const Steps = () => {
    return (
      <Stepper
        size='xs'
        mt={20}
        px={10}
        active={active}
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          icon={<IconShoppingBag size={16} />}
          label={<Text mt={3} fz={10}>{t('Verification')}</Text>}
        >
          <Text fz={18} mb={5} fw={700}>
            {t('Verifyselection')}
          </Text>
          <ScrollArea mah={500} h={390} scrollbarSize={3}>
            {
              Array(quantity).fill(0).map((_, key) => {
                return (
                  <>
                    <Group>
                      <Card ta="center" className={classes.cardQuantity}>
                        {key + 1}
                      </Card>
                      <div>

                        <Text fw={500} fz={15}>
                          Rifa de Hyundai Santa Fe 2023
                        </Text>
                        <Text fw={300} mt={-2} fz={10} c="dimmed" italic>

                          {t('quantity')}: 1
                        </Text>
                        <Text fw={300} fz={10} mt={-5} c="dimmed" italic>
                          {t('prize')}: 21$
                        </Text>
                      </div>
                      <div className={classes.removeButton}>
                        <Button
                          color="red"
                          variant="subtle"
                          size="xs"
                          px={5}
                          onClick={decreaseQuantity}
                        >
                          <IconTrash />
                        </Button>
                      </div>
                    </Group>
                    <Divider variant="dashed" my={10} />
                  </>
                )
              })
            }
          </ScrollArea>
          <Group position="apart">
            <Group w="50%" spacing={0}>
              <Button
                size="xs"
                px={5}
                className={classes.minusButton}
                onClick={() => decreaseQuantity()}
              >
                <IconMinus size={13} />
              </Button>
              <Card
                px={10}
                py={2.5}
                className={classes.quantityCounter}
              >
                {quantity}
              </Card>
              <Button
                size="xs"
                px={5}
                className={classes.plusButton}
                onClick={() => addQuantity(1)}
              >
                <IconPlus size={13} />
              </Button>
            </Group>
            <div>
              <Text fz={11} ta="end" italic fw={700}>
                {t('totalAmount')}:
              </Text>
              <Text fz={14} ta="end" fw={300}>
                {quantity * 21}$
              </Text>

            </div>
          </Group>
          <Group spacing={5} mt={20} position="center">
            <Button onClick={prevStep} disabled={active === 0} size="xs"> {t('back')}</Button>
            <Button onClick={nextStep} size="xs">  {t('next')}</Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step
          icon={<IconUser size={16} />}
          label={<Text mt={3} fz={10}>{t('Information')}</Text>}
        >
          <CouponForm
            nextStep={() => setActive(2)}
            prevStep={() => setActive(0)}
          />
        </Stepper.Step>

        <Stepper.Step
          icon={<IconCreditCard size={16} />}
          label={<Text mt={3} fz={10}>{t('payStepper')}</Text>}
        >
          <Checkout
            amount={quantity * 21}
            paymentMethods={['Pago Móvil', 'Zelle']}
            quantity={quantity}
            onComplete={() => nextStep()}
          />
        </Stepper.Step>

        <Stepper.Completed>
          <Card>
            <Group position="apart">
              <Text c="dimmed" italic fz={12}>
                ORD-ABDU1782930
              </Text>
              <Text c="dimmed" italic fz={12}>
                {t('quantity')}: {quantity}
              </Text>
            </Group>
            <Group my={20} position="center">
              <Avatar color="teal" size="xl" radius='xl'>
                <IconCheck />
              </Avatar>
            </Group>
            <Text ta="center" mb={20} fz={20} fw={700}>
              {t('purchaseSuccessful')}
            </Text>
            <Text ta="center" mb={20} fz={15} fw={700}>
              {t('receiptWillBeSent')}
            </Text>
            <ScrollArea mah={190} h={190} scrollbarSize={3} mb={20}>
              {
                Array(quantity).fill(0).map((_, key) => {
                  return (
                    <>
                      <Group>
                        <Card ta="center" className={classes.cardQuantity}>
                          {key + 1}
                        </Card>
                        <div>

                          <Text fw={500} fz={15}>
                            Rifa de Hyundai Santa Fe 2023
                          </Text>
                          <Text fw={300} mt={-2} fz={10} c="dimmed" italic>
                            {t('quantity')}: 1
                          </Text>
                          <Text fw={300} fz={10} mt={-5} c="dimmed" italic>
                            {t('prize')}: 21$
                          </Text>
                        </div>
                        <div className={classes.removeButton}>
                        </div>
                      </Group>
                      <Divider variant="dashed" my={10} />
                    </>
                  )
                })
              }
            </ScrollArea>
            <Button
              fullWidth
              onClick={() => {
                setTouchMove('-75%');
                setQuantity(0)
                setActive(0)
              }}
            >
              {t('completed')}
            </Button>
          </Card>
        </Stepper.Completed>
      </Stepper>
    )
  }

  return (
    <>
      <Layout full noOverlap>
        <Card className={classes.mainCard}>
          <SuperiorHead />
          <div className={classes.couponContainer}>
            <div className={classes.couponWrapper}>
              <CouponSelector />
              {/* <Card className={classes.paymentDesktop}>
                a
              </Card> */}
              <motion.div
                ref={constraintsRef}
                className={classes.paymentMobile}
                drag='y'
                dragConstraints={constraintsRef}
                initial={{
                  bottom: '-95%'
                }}
                animate={{
                  bottom: quantity === 0 ? '-100%' : touchMove
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
                      setTouchMove('-75%');
                    }
                  }}
                >
                  <motion.div className={classes.touchBar} />
                </motion.div>
                <Steps />
              </motion.div>
            </div>
          </div>
        </Card>
      </Layout>
    </>
  )
}

export default Coupon