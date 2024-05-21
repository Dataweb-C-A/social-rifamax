import { Button, Card, createStyles, Grid, Progress, Text } from "@mantine/core"
import { motion } from 'framer-motion'
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  raffleHero: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xs,
    padding: "0 !important",
    cursor: 'pointer'
  },
  raffleImage: {
    width: '100%',
    height: 300,
    objectFit: 'cover',
    borderRadius: theme.radius.xs,
    opacity: 0.8,
    backgroundImage: 'linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.5) 50%, rgb(0, 0, 0) 95%)',
    zIndex: 1
  },
  raffleCard: {
    padding: '0 !important',
    borderRadius: '0 !important',
    zIndex: 0,
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
    borderRadius: theme.radius.xs,
    backgroundColor: 'transparent',
    zIndex: 999
  },
  infoCard: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingTop: '5px',
    zIndex: 99999
  },
  buttonRaffle: {
    width: '100%',
    borderRadius: "0 0 3px 3px !important",
  },
  infoRaffle: {
    display: 'flex',
    flexWrap: 'no-wrap',
    borderRadius: '7px',
    height: 270,
    margin: '0px 5px !important',
    width: '100%',
    padding: "0 !important"
  },
  title: {
    color: theme.colors.blue[5],
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: '.5px'
  },
  value: {
    fontWeight: 300,
    fontSize: 16
  },
  labelsWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    padding: '0 40px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  titlesWrapper: {
    width: '50%',
  },
  ribbon: {
    width: '30px',
    background: theme.colors.blue[5]
  }
}))

interface IRaffles {
  data: {
    id: number;
    image?: string;
    title: string;
    tickets_count: number;
    draw_type: 'Fecha limite' | 'Progresiva' | 'Infinito';
    init_date: string
  }[]
}

function RaffleHero({ data }: IRaffles) {
  const { classes } = useStyles();

  const [cardPressed, setCardPressed] = useState<number | null>(null)

  const Titles = (label: string, value: string, dir: 'right' | 'left' = "right", m: boolean = false) => {
    return (
      <div className={classes.titlesWrapper}>
        <Text className={classes.title} ta={dir}>{label}</Text>
        <Text className={classes.value} ta={dir} mb={m ? "xl" : undefined}>{value}</Text>
      </div>
    )
  }

  return (
    <div className={classes.raffleHero}>
      <Grid w="100%" justify="center" gutter={7} my={5} pl={5}>
        {
          data.map((raffle) => {
            return (
              <Grid.Col xs={12} sm={6} lg={4} xl={3}>
                <Card className={classes.raffleCard}>
                  <div
                    className={classes.wrapper}
                    onMouseEnter={() => setCardPressed(raffle.id)}
                    onMouseLeave={() => setCardPressed(null)}
                  >
                    <Progress
                      value={100}
                      radius={0}
                      label="29394 Tickets vendidos"
                      size="20px"
                      className={classes.buttonRaffle}
                    />
                  </div>
                  <motion.div
                    className={classes.infoCard}
                    initial={{
                      y: 300,
                      background: 'transparent'
                    }}
                    animate={{
                      y: cardPressed === raffle.id ? 0 : 300,
                      background: 'rgba(0, 0, 0, 0.6)',
                      animationDuration: '.2s'
                    }}
                    onMouseEnter={() => setCardPressed(raffle.id)}
                    onMouseLeave={() => setCardPressed(null)}
                  >
                    <Card
                      className={classes.infoRaffle}
                      withBorder
                      shadow="md"
                    >
                      <div className={classes.ribbon} />
                      <div className={classes.labelsWrapper}>
                        {Titles("RIFA ", raffle.title, 'left', true)}
                        {Titles("TIPO DE RIFA", raffle.draw_type, 'right', true)}
                        {Titles("FECHA", raffle.init_date, 'left')}
                        {Titles("NÚMEROS", `${raffle.tickets_count} tickets`, 'right')}
                      </div>
                    </Card>
                  </motion.div>
                  <img
                    className={classes.raffleImage}
                    src="https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492"
                    alt="4Runner"
                  />
                </Card>
              </Grid.Col>
            )
          })
        }
      </Grid>
    </div>
  )
}

export default RaffleHero