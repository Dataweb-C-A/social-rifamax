// import LanguageSwitcher from "./components/LanguageSwitcher"
import Layout from "./Layout"
import Navbar from "./components/Navbar"
import { IconCar, IconHome, IconPremiumRights } from "@tabler/icons-react";
import Home from "./pages/Home";
import Marquee from "./components/Marquee";
import { Group, Text, useMantineTheme } from "@mantine/core";

const links = [
  { label: 'Inicio', href: '/', icon: <IconHome size="3rem" stroke={1.5} /> },
  { label: 'Mis compras', href: '/purchases', icon: <IconPremiumRights size="3rem" stroke={1.5} /> },
  { label: 'Mi carrito', href: '/my-cart', icon: <IconCar size="3rem" stroke={1.5} /> }
]

function App() {
  const theme = useMantineTheme()
  return (
    <>
      <Navbar links={links} />
      {/* <Marquee
        direction="ltr"
        style={{
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
          boxShadow: `0 1px 0 0 ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
        }}
      >
        <Group position="apart" w="100%">
          <Text
            py={5}
            style={{
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              fontSize: '1.25rem',
              fontWeight: 500,
              letterSpacing: '1.3px',
              textAlign: 'center',
            }}
          >
            Rifamax
          </Text>
          <Text
            py={5}
            style={{
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              fontSize: '1.25rem',
              fontWeight: 500,
              letterSpacing: '1.3px',
              textAlign: 'center',
            }}
          >
            ¡Juega y gana muchos premios!
          </Text>
        </Group>
      </Marquee> */}
      <Layout>
        <Home />
      </Layout>
    </>
  )
}

export default App
