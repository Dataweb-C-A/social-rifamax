import { RootState } from "@/store";
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from "react";
import { Box, Burger, Drawer, Group, NavLink, Text, createStyles } from "@mantine/core"
import { useSelector } from "react-redux";
import ThemeSwitcher from "./ThemeSwitcher";
import RifamaxLogo from "./RifamaxLogo";
import { IconSearch } from "@tabler/icons-react";
import { useSpotlight } from "@mantine/spotlight";

const useStyles = createStyles((theme) => ({
  navbar: {
    width: '100%',
    height: '75px',
    display: 'flex',
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    backgroundColor: 'transparent',
    boxShadow: `0 1px 0 0 ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    padding: '0 5px',
  },
  link: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: '20px',
    letterSpacing: '1.3px',
    fontWeight: 500,
    textDecoration: 'none',
    marginTop: '8px',
    marginLeft: '20px',
    '&:hover': {
      textDecoration: 'underline',
    },
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  burger: {
    marginTop: '5px',
    '@media (min-width: 769px)': {
      display: 'none',
    },
  },
  navlink: {
    borderRadius: theme.radius.md,
    marginTop: '10px',
  },
  navlinkActive: {
    borderRadius: theme.radius.md,
    marginTop: '10px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
  },
  spotlightButton: {
    marginTop: '7px',
    background: `${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]}`,
    padding: '7px 11px',
    borderRadius: '100%',
    transition: 'background .2s ease',
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    userSelect: 'none',
    cursor: 'pointer',
    ":active": {
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    },
    ":hover": {
      border: `1px solid ${theme.colors.blue[6]}`,
    },
  }
}));

interface INavbar {
  links: { label: string, href: string, icon: ReactNode }[]
}

function Navbar({ links }: INavbar) {
  const { classes } = useStyles();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [opened, { open, close }] = useDisclosure();
  const spotlight = useSpotlight();

  return (
    <nav className={classes.navbar}>
      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        position="right"
        closeButtonProps={{
          size: 'xl',
          color: mode === 'light' ? 'dark' : undefined,
          "aria-label": 'Close menu'
        }}
        title={<Text fz={30} fw={600} mt={5}>Menú</Text>}
      >
        <Box>
          {links.map((link) => (
            <NavLink
              className={link.href === window.location.pathname ? classes.navlinkActive : classes.navlink}
              label={<Text fz={25} fw={300}>{link.label}</Text>}
              icon={link.icon}
              onClick={() => window.location.replace(link.href)}
            />
          ))}
        </Box>
      </Drawer>
      <Group position="apart" px={10} w="100%">
        <RifamaxLogo />
        <Group mt={-72}>
          <button className={classes.spotlightButton} onClick={() => spotlight.openSpotlight()}>
            <IconSearch size="0.9rem" style={{ marginTop: 3 }} />
          </button>
          <ThemeSwitcher />
          <Burger
            className={classes.burger}
            opened={opened}
            onClick={open}
            aria-label="Toggle navigation"
          />
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={classes.link}
            >
              {link.label}
            </a>
          ))}
        </Group>
      </Group>
    </nav>
  )
}

export default Navbar