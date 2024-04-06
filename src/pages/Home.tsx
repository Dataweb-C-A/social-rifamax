// import { useCallback, useMemo, useState } from "react"
// import axios from "axios"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Grid, Group, ScrollArea, SegmentedControl, Text, createStyles } from "@mantine/core"
import { Carousel } from '@mantine/carousel';
import HoverCard from "../components/HoverCard"
import { useId } from 'react';
// import { IconTrees } from "@tabler/icons-react"
import Layout from "../Layout";

const useStyles = createStyles((theme) => ({
  homeContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  containerStats: {
    width: 'calc(100% - 384px)',
    height: '100%',
    padding: '0 0 0 10px',
    '@media (max-width: 1100px)': {
      width: '100%',
      padding: 0,
      marginBottom: '10px'
    },
  },
  raffleCardCont: {
    width: '384px',
    '@media (max-width: 1100px)': {
      display: 'none'
    },
  },
  carousel: {
    '@media (min-width: 1100px)': {
      display: 'none'
    },
  },
  cardStats: {
    height: '100%',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    '@media (max-width: 1100px)': {
      height: 'calc(100vh - 10px)'
    },
  },
  cardCarousel: {
    height: '100%',
    width: '100%',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },
  statsTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: '24px',
    letterSpacing: '1.3px',
    fontWeight: 500,
    marginBottom: '20px',
    textDecoration: 'none',
    marginTop: '8px',
    marginLeft: '10px'
  },
  quantityStatsTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: '18px',
    letterSpacing: '1.3px',
    textAlign: 'center',
    fontWeight: 500,
    textDecoration: 'none',
    marginTop: '8px',
    marginLeft: '10px'
  },
  profitTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: '18px',
    letterSpacing: '1.3px',
    textAlign: 'center',
    fontWeight: 500,
    textDecoration: 'none',
    marginTop: '8px',
    marginLeft: '10px'
  },
  groupTitle: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    '@media (max-width: 515px)': {
      flexWrap: 'wrap',
      flexDirection: 'column',
      gap: 0,
      marginBottom: '10px'
    },
  },
  controlStat: {
    '@media (max-width: 515px)': {
      width: '100%',
    },
  },
  scrollTitles: {
    overflowX: 'hidden'
  }
}))

function Home() {
  const { classes } = useStyles()

  const data = [
    {
      name: 'Lunes',
      uv: 40,
      pv: 400,
      amt: 2400,
    },
    {
      name: 'Martes',
      uv: 20,
      pv: 200,
      amt: 2210,
    },
    {
      name: 'Miercoles',
      uv: 40,
      pv: 400,
      amt: 2290,
    },
    {
      name: 'Jueves',
      uv: 80,
      pv: 800,
      amt: 2000,
    },
    {
      name: 'Viernes',
      uv: 10,
      pv: 100,
      amt: 2181,
    },
    {
      name: 'Sabado',
      uv: 90,
      pv: 900,
      amt: 2500,
    },
    {
      name: 'Domingo',
      uv: 9,
      pv: 90,
      amt: 2100,
    },
  ];

  return (
    <Layout>
      <div className={classes.homeContainer}>
        <div className={classes.raffleCardCont}>
          {/* <Button
            fullWidth
            variant="light"
            mb={10}
            style={{
              background: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.colors.blue[4],
              color: theme.colorScheme === 'dark' ? theme.white : theme.white
            }}
            leftIcon={<IconTrees />}
            onClick={() => setFinder("general")}
          >
            Ver ventas global
          </Button> */}
          <ScrollArea h="calc(100vh - 95px)" type="scroll" scrollbarSize={2}>
            {
              Array(6)
                .fill(0)
                .map((_,) => (
                  <HoverCard
                    image="https://rifa-max.com/Flyer-Bera.jpg"
                    title="Moto Bera"
                    button="Ver ventas"
                    key={useId()}
                  />
                ))
            }
          </ScrollArea>
        </div>
        <div className={classes.containerStats}>
          <Carousel
            height={200}
            slideSize="33.333333%"
            slideGap="md"
            loop={false}
            align="start"
            className={classes.carousel}
            mb={10}
            breakpoints={[
              { maxWidth: 'md', slideSize: '50%' },
              { maxWidth: 'xs', slideSize: '100%', slideGap: 0 },
            ]}
          >
            {
              Array(4)
                .fill(0)
                .map((_) => (
                  <Carousel.Slide>
                    <Card
                      className={classes.cardCarousel}
                      withBorder
                    >
                      {_}
                    </Card>
                  </Carousel.Slide>
                ))
            }
          </Carousel>
          <Card
            className={classes.cardStats}
            withBorder
            shadow="sm"
          >
            <Group position="apart" px={0} w="100%" className={classes.groupTitle}>
              <Text className={classes.statsTitle}>
                Reporte de ventas
              </Text>
              <SegmentedControl
                className={classes.controlStat}
                mb={10}
                data={[
                  { label: 'Anual', value: 'vue' },
                  { label: 'Mensual', value: 'react' },
                  { label: 'Semanal', value: 'ng' },
                ]}
              />
            </Group>
            <ScrollArea h="100%" type='hover' scrollbarSize={2} className={classes.scrollTitles}>
              <Grid>
                <Grid.Col md={6} sm={12}>
                  <Text className={classes.quantityStatsTitle}>
                    Cantidad de ventas
                  </Text>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={data}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="natural" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <Text className={classes.profitTitle}>
                    Ganancias por ventas
                  </Text>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      width={500}
                      height={200}
                      data={data}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="natural" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Grid.Col>
              </Grid>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Home