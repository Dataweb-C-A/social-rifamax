import { Button, Card, Grid, Group, ScrollArea, SegmentedControl, Text, createStyles, useMantineTheme } from "@mantine/core"
import { Carousel } from '@mantine/carousel';
import HoverCard from "../components/HoverCard"
import { useId, useState } from 'react';
import Layout from "../Layout";
import { IconDownload, IconEye, IconEyeClosed, IconWorld } from '@tabler/icons-react';
import ReactApexChart, { Props as IApexChart } from 'react-apexcharts';
import standarize from "../utils/standarize";

interface IHoverCarousel {
  image: string;
  title: string;
  button: string;
  onClick?: () => void;
}

const useStyles = createStyles((theme) => ({
  homeContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    '@media (min-width: 1100px)': {
      overflow: 'hidden'
    }
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
  groupChart: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingBottom: '10px'
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
    marginLeft: '10px',
  },
  cardCharts: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  groupTitle: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    marginBottom: '10px',
    marginTop: '30px',
    '@media (max-width: 515px)': {
      flexWrap: 'wrap',
      flexDirection: 'column',
      gap: 0,
    },
  },
  markData: {
    width: '40px',
    height: '100%',
    background: theme.colors.red[5],
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '3px 0 0 3px'
  },
  markSells: {
    width: '40px',
    height: '100%',
    background: theme.colors.teal[4],
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '3px 0 0 3px'
  },
  mark: {
    width: '40px',
    height: '100%',
    background: theme.colors.blue[4],
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '3px 0 0 3px'
  },
  scope: {
    height: '34px',
    width: '100%',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[4],
    position: 'absolute',
    top: '0%',
    left: '0',
    borderTop: `0.0625rem solid ${theme.colorScheme === 'dark' ? '#373A40' : '#dee2e6'}`,
    borderLeft: `0.0625rem solid ${theme.colorScheme === 'dark' ? '#373A40' : '#dee2e6'}`,
    borderRight: `0.0625rem solid ${theme.colorScheme === 'dark' ? '#373A40' : '#dee2e6'}`,
    borderRadius: '3px 3px 0 0'
  },
  scopeText: {
    color: theme.white,
    fontSize: theme.fontSizes.md,
    textAlign: 'center',
    fontWeight: 700,
    marginLeft: '10px',
    marginTop: '4px'
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

const HoverCarouselCard = ({ image, title, button, onClick }: IHoverCarousel) => {
  const [showImage, setShowImage] = useState<boolean>(false)

  return (
    <Card h="100%" mx={2} p={0}>
      {
        showImage ? (
          <>
            <div style={{ position: 'absolute', right: 10, top: 10 }}>
              <Button size="xs" color='red' onClick={() => setShowImage(false)} leftIcon={<IconEyeClosed size='1.3rem' />}><Text mt={2}>Cerrar Imagen</Text></Button>
            </div>
            <div style={{ width: '100%', height: '100%', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </>
        ) : (
          <Card p={0} withBorder shadow="xs" style={{ display: 'flex', height: '100%', width: ' 100%' }} onClick={onClick}>
            <div style={{ width: '40px', height: '100%', background: '#4dabf7' }}></div>
            <div style={{ position: 'absolute', right: 10, top: 10 }}>
              <Button size="xs" variant='subtle' color='green' onClick={() => setShowImage(true)} leftIcon={<IconEye size='1.3rem' />}><Text mt={2}>Ver imagen</Text></Button>
            </div>
            <div style={{ position: 'absolute', left: '40px' }}>
              <Text ta="start" fw={500} fz={18} color='#4dabf7' ml={10} mt={5}>Rifa</Text>
              <Text ta="start" fw={350} fz={16} ml={10} mt={-5}>4Runner + una moto</Text>
              <Text ta="start" fw={500} fz={18} color='#4dabf7' ml={10} mt={5}>Tipo</Text>
              <Text ta="start" fw={350} fz={16} ml={10} mt={-5}>1000 Números (Triple)</Text>
              <Text ta="start" fw={500} fz={18} color='#4dabf7' ml={10} mt={10}>Fecha</Text>
              <Text ta="start" fw={350} fz={16} ml={10} mt={-5}>27/03/2024</Text>
            </div>
          </Card>
        )
      }
    </Card>
  )
};

function Home() {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const [finder, setFinder] = useState<string>("general")

  const options = {
    series: [{
      name: 'Cantidad de ventas',
      data: [10, 14, 28, 51, 42, 109, 100]
    }, {
      name: 'Ganancia por ventas',
      data: [20, 32, 56, 102, 66, 218, 200]
    }],
    options: {
      theme: {
        mode: theme.colorScheme,
      },
      grid: {
        show: false
      },
      chart: {
        height: 350,
        background: 'transparent',
        type: 'area',
        foreColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
        toolbar: {
          show: true,
          tools: {
            download: true,
            reset: true,
            zoomin: false,
            zoomout: false,
          },
          export: {
            csv: {
              filename: undefined,
            },
            svg: {
              filename: undefined,
            },
          }
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-20T00:00:00.000Z", "2018-09-21T00:00:00.000Z", "2018-09-22T00:00:00.000Z", "2018-09-23T00:00:00.000Z", "2018-09-24T00:00:00.000Z", "2018-09-25T00:00:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd-MM-yyyy'
        },
      },
    },
  } satisfies IApexChart

  return (
    <Layout>
      <div className={classes.homeContainer}>
        <div className={classes.raffleCardCont}>
          <Button
            fullWidth
            variant="light"
            mb={10}
            style={{
              background: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.colors.blue[4],
              color: theme.colorScheme === 'dark' ? theme.white : theme.white
            }}
            leftIcon={<IconWorld />}
            onClick={() => setFinder("general")}
          >
            Ver ventas global
          </Button>
          <ScrollArea h="calc(100vh - 95px)" type="scroll" scrollbarSize={2}>
            {
              Array(6)
                .fill(0)
                .map((_,) => (
                  <HoverCard
                    image="https://rifa-max.com/Flyer-Bera.jpg"
                    title="Moto Bera"
                    button="Ver ventas"
                    onClick={() => setFinder('Moto Bera')}
                    key={useId()}
                  />
                ))
            }
          </ScrollArea>
        </div>
        <div className={classes.containerStats}>
          <Carousel
            height={165}
            slideSize="33.333333%"
            slideGap="xs"
            loop={false}
            align="start"
            className={classes.carousel}
            mb={10}
            breakpoints={[
              { maxWidth: 'md', slideSize: '50%' },
              { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
            ]}
          >
            {
              Array(6)
                .fill(0)
                .map((_,) => (
                  <Carousel.Slide>
                    <HoverCarouselCard
                      image="https://rifa-max.com/Flyer-Bera.jpg"
                      title="Moto Bera"
                      button="Ver ventas"
                      onClick={() => setFinder('Moto Bera - 1000 numeros')}
                    />
                  </Carousel.Slide>
                ))
            }
          </Carousel>
          <Card
            className={classes.cardStats}
            withBorder
            shadow="sm"
          >
            <div className={classes.scope}>
              <Text className={classes.scopeText}>
                {finder === "general" ? "Global" : finder}
              </Text>
            </div>
            <Group position="apart" px={0} w="100%" className={classes.groupTitle}>
              <Text className={classes.statsTitle}>
                Reporte de ventas
              </Text>
              <SegmentedControl
                className={classes.controlStat}
                mb={10}
                data={[
                  { label: 'Anual', value: 'yearly' },
                  { label: 'Mensual', value: 'monthly' },
                  { label: 'Semanal', value: 'weekly' },
                ]}
              />
            </Group>
            <ScrollArea
              h="calc(100% - 150px)"
              type='never'
              scrollbarSize={2}
              className={classes.scrollTitles}
            >
              <Grid mb={5} grow gutter={10}>
                <Grid.Col xs={6} md={4}>
                  <Card withBorder shadow="xs" p={10} h={120} className={classes.cardCharts}>
                    <div className={classes.mark} />
                    <Text className={classes.quantityStatsTitle}>
                      Ganancia total
                    </Text>
                    <Text ta="center" fz={30} mt={10}>
                      {
                        standarize({ value: 1192.09, country: "en-US", currency: 'USD' })
                      }
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col xs={6} md={4}>
                  <Card withBorder shadow="xs" p={10} h={120} className={classes.cardCharts}>
                    <div className={classes.markSells} />
                    <Text className={classes.quantityStatsTitle}>
                      Rifas activas
                    </Text>
                    <Text ta="center" fz={30} mt={10}>
                      6
                    </Text>
                  </Card>
                </Grid.Col>
                <Grid.Col xs={6} md={4}>
                  <Card withBorder shadow="xs" p={10} h={120} className={classes.cardCharts}>
                    <div className={classes.markData} />
                    <Text className={classes.quantityStatsTitle}>
                      Rifas expiradas
                    </Text>
                    <Text ta="center" fz={30} mt={10}>
                      1
                    </Text>
                  </Card>
                </Grid.Col>
              </Grid>
              <Card w="100%" withBorder shadow="xs" className={classes.cardCharts}>
                <Group position="center" px={0} w="100%" className={classes.groupChart}>
                  <Text className={classes.profitTitle}>
                    Cantidad de ventas | Ganancias por ventas
                  </Text>
                </Group>
                { /* Chart */}
                <div id="chart">
                  <ReactApexChart options={options.options} series={options.series} type="area" height={350} />
                </div>
                <div id="html-dist"></div>
              </Card>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Home