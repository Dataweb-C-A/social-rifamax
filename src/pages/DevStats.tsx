import { Button, Card, Grid, Text, Group, SimpleGrid, Table, Badge, createStyles } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const useStyles = createStyles((theme) => ({
  section: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    height: 'calc(100vh - 70px)',
    borderRadius: 0,
    overflowY: 'hidden'
  },
  cardTable: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white,
    height: 'calc(100vh - 295px)',
    '@media (max-width: 992px)': {
      height: 'calc(100vh - 365px)',
    },
  },
  buttonReset: {
    borderRadius: '0 0 3px 0',
    background: theme.colors.red[6],
  },
  buttonInfo: {
    borderRadius: '0 0 0 3px'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 700,
    paddingBottom: 5,
    marginBottom: 10,
    boxShadow: `0px 1px 0px 0px ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
  serverStatus: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
  },
  bodyTable: {

  }
}))

function DevStats() {
  const { classes } = useStyles();
  const [ip, setIp] = useState<string>('');

  useEffect(() => {
    axios.get("https://api.ipify.org/?format=json").then((response) => {
      setIp(response.data.ip);
    })
  }, [])

  const ProcessTable = () => {
    const rows = elements.map((element) => (
      <tr key={element.name}>
        <td>{element.position}</td>
        <td>{element.name}</td>
        <td>{element.symbol}</td>
        <td>{element.mass}</td>
      </tr>
    ));

    return (
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }

  const StatusCard = ({ children }: { children: React.ReactNode }) => (
    <>
      <Card w="100%" h={640}>
        <Text className={classes.title}>
          Estado del servidor
        </Text>
        {children}
      </Card>
      <SimpleGrid cols={2} spacing={0} mt={-15}>
        <Button mt={10} className={classes.buttonInfo}>Más información</Button>
        <Button mt={10} className={classes.buttonReset}>Reiniciar servidor</Button>
      </SimpleGrid>
    </>
  )

  return (
    <>
      <Card className={classes.section} p={0} mb={10}>
        <Grid mx={5} mt={5}>
          <Grid.Col xs={12} md={6} orderXs={2} orderMd={1}>
            <Card className={classes.cardTable}>
              <Text className={classes.title}>
                Procesos en ejecución
              </Text>
              <ProcessTable />
            </Card>
          </Grid.Col>
          <Grid.Col xs={12} md={6} orderXs={1} orderMd={2}>
            <StatusCard>
              <Card className={classes.serverStatus}>
                <Group position='apart' mb={20}>
                  <Text fw={100} fz={17}>Dirección IP del servidor:</Text>
                  <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                    64.225.18.32
                  </Badge>
                </Group>
                <Group position='apart' mb={20}>
                  <Text fw={100} fz={17}>Stack:</Text>
                  <Group>
                    <Badge variant="gradient" size="md" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      React
                    </Badge>
                    <Badge variant="gradient" size="md" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      TypeScript
                    </Badge>
                    <Badge variant="gradient" size="md" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      Ruby on Rails
                    </Badge>
                  </Group>
                </Group>
                <Group position='apart' mb={20}>
                  <Text fw={100} fz={17}>Almacenamiento:</Text>
                  <Group>
                    <Badge variant="gradient" size="md" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      PostgreSQL
                    </Badge>
                    <Badge variant="gradient" size="md" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      Redis
                    </Badge>
                  </Group>
                </Group>
                <Group position='apart' mb={20}>
                  <Text fw={100} fz={17}>Dirección IP del cliente:</Text>
                  <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                    {ip}
                  </Badge>
                </Group>
                <Group position='apart' mb={20}>
                  <Text fw={100} fz={17}>Estado del servidor de la API:</Text>
                  <Badge variant="gradient" leftSection={<IconCheck style={{ marginTop: '7px' }} />} size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                    <Text mt={2}>Activo</Text>
                  </Badge>
                </Group>
                <Text fw={100} fz={17} ta="center" mb={10}>Puertos ocupados:</Text>
                <Card>
                  <Group position='center' py={30}>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      8080
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      6379
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      5678
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      3000
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      4000
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      443
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      80
                    </Badge>
                    <Badge variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green', deg: 105 }}>
                      22
                    </Badge>
                  </Group>
                </Card>
              </Card>
            </StatusCard>
          </Grid.Col>
        </Grid>
      </Card >
    </>
  );
}

export default DevStats