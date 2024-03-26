import { useCallback, useMemo, useState } from "react"
import axios from "axios"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Card, Divider, Grid, Group, SegmentedControl, Text } from "@mantine/core"
import { useMantineTheme } from "@mantine/core"
import HoverCard from "../components/HoverCard"
import { IconTrees } from "@tabler/icons-react"

function Home() {
  const theme = useMantineTheme()

  const URL = import.meta.env.BASE_URL

  const [finder, setFinder] = useState<number | "general">("general")

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
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '384px' }}>
        <Button
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
        </Button>
        <HoverCard
          image="https://rifa-max.com/Flyer-Bera.jpg"
          title="Moto Bera"
          button="Ver ventas"
        />
        <HoverCard
          image="https://rifa-max.com/Flyer-Empire.jpg"
          title="Moto Bera"
          button="Ver ventas"
        />
      </div>
      <div style={{ width: 'calc(100% - 384px)', height: '100%', padding: '0 0 0 10px' }}>
        <Card
          withBorder
          shadow="sm"
          style={{
            height: '100%',
            background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
          }}
        >
          <Group position="apart" px={0} w="100%">
            <Text style={{
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              fontSize: '24px',
              letterSpacing: '1.3px',
              fontWeight: 500,
              marginBottom: '20px',
              textDecoration: 'none',
              marginTop: '8px',
              marginLeft: '10px'
            }}>
              Reporte de ventas
            </Text>
            <SegmentedControl
              mb={10}
              data={[
                { label: 'Anual', value: 'vue' },
                { label: 'Mensual', value: 'react' },
                { label: 'Semanal', value: 'ng' },
              ]}
            />
          </Group>
          <Divider mx={10} mb={20} mt={-10} />
          <div style={{ width: '100%' }}>
            <Grid>
              <Grid.Col md={6} sm={12}>
                <Text style={{
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  fontSize: '18px',
                  letterSpacing: '1.3px',
                  textAlign: 'center',
                  fontWeight: 500,
                  textDecoration: 'none',
                  marginTop: '8px',
                  marginLeft: '10px'
                }}>
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
                <Text style={{
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  fontSize: '18px',
                  letterSpacing: '1.3px',
                  textAlign: 'center',
                  fontWeight: 500,
                  textDecoration: 'none',
                  marginTop: '8px',
                  marginLeft: '10px'
                }}>
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
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Home