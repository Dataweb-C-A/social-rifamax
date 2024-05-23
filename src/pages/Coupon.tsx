import { Breadcrumbs, Anchor, Card, createStyles, Select, ActionIcon, TextInput, Title, Group, Text, Stepper, ScrollArea, Button, Divider } from "@mantine/core"
import Layout from "../Layout"
import PublicNavbar from "../components/PublicNavbar"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from '@mantine/hooks';
import { useState, useRef } from "react";
import axios from "axios"
import { motion } from 'framer-motion'
import { IconCreditCard, IconSearch, IconShoppingBag, IconTrash, IconUser } from "@tabler/icons-react";
import { CouponForm } from "../layouts/coupon/Coupon.form";

interface ICoupon {

}


function Coupon({ }: ICoupon) {
  const isMobile = useMediaQuery(`(max-width: 900px)`);
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
      zIndex: 9999,
      borderRadius: '25px 25px 0 0',
      display: !isMobile ? 'none' : 'block',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },
    touchWrapper: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
    },
    touchBar: {
      width: 40,
      height: '3px',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[6],
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
    }
  }))

  const { classes } = useStyles()
  const navigate = useNavigate()
  const constraintsRef = useRef(null);

  const [quantity, setQuantity] = useState<number>(0)
  const [touchMove, setTouchMove] = useState<string>('-75%');
  const [active, setActive] = useState<number>(0);

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const items = [
    { title: 'Rifas', href: '/raffles' },
    { title: 'Cupones', href: '/coupon' },
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
        <Title order={2} mb={10}>Cupones</Title>
      </div>
      <Breadcrumbs>{items}</Breadcrumbs>
    </Group>
  )

  const CouponSelector = () => (
    Array(10).fill(1).map((_, key) => {
      return (
        <Card
          className={classes.couponCard}
          onClick={() => addQuantity(key + 1)}
        >
          <Text>{key + 1}</Text>
        </Card>
      )
    })
  )

  const Steps = () => {
    return (
      <Stepper size='xs' mt={20} px={10} active={active} onStepClick={setActive}>
        <Stepper.Step
          icon={<IconShoppingBag size={16} />}
          label={<Text mt={3} fz={10}>Verificación</Text>}
          description={<Text fz={7} mt={-3} c="dimmed">Verifica compra</Text>}
        >
          <Text fz={18} mb={5} fw={700}>
            Verificar selección
          </Text>
          <ScrollArea mah={500} scrollbarSize={3}>
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
                          Rifa por Hyundai Santa Fe 2023
                        </Text>
                        <Text fw={300} mt={-2} fz={10} c="dimmed" italic>
                          Cantidad: 1
                        </Text>
                        <Text fw={300} fz={10} mt={-5} c="dimmed" italic>
                          Precio: 21$
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
            <Text c='dimmed' fz={12} italic fw={300}>
              Cantidad: {quantity}
            </Text>
            <Text fz={12} ta="end" fw={300}>
              Total a pagar: {quantity * 21}$
            </Text>
          </Group>
          <Group spacing={5} mt={20} position="center">
            <Button onClick={prevStep} disabled={active === 0} size="xs">Anterior</Button>
            <Button onClick={nextStep} size="xs">Siguiente</Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step
          icon={<IconUser size={16} />}
          label={<Text mt={3} fz={10}>Información</Text>}
          description={<Text mt={-3} fz={7} c="dimmed">Datos personales</Text>}
        >
          <CouponForm />
        </Stepper.Step>
        <Stepper.Step
          icon={<IconCreditCard size={16} />}
          label={<Text mt={3} fz={10}>Comprar</Text>}
          description={<Text mt={-3} fz={7} c="dimmed">Realizar pago</Text>}
        >
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    )
  }

  return (
    <>
      <PublicNavbar />
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
                onDragEnd={(_, info) => {
                  if (info.offset.y < 0) {
                    setTouchMove('0%');
                  } else {
                    setTouchMove('-75%');
                  }
                }}
              >
                <div className={classes.touchWrapper}>
                  <div className={classes.touchBar} />
                </div>
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