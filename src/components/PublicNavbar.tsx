import { Group, createStyles } from "@mantine/core"
import ThemeSwitcher from "./ThemeSwitcher";
import RifamaxLogo from "./RifamaxLogo";
import Cart from "./Cart";

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
    background: `${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]}`,
    borderRadius: '100%',
    marginTop: '6px',
    padding: '2.5px 8px',
    transition: 'background .2s ease',
    border: `0.0625rem solid ${theme.colorScheme === 'dark' ? '#373A40' : '#dee2e6'}`,
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

interface IPublicNavbar { }

function PublicNavbar({ }: IPublicNavbar) {
  const { classes } = useStyles();

  return (
    <nav className={classes.navbar}>
      <Group position="apart" px={10} w="100%">
        <RifamaxLogo />
        <Group mt={-72}>
          <ThemeSwitcher />
          <Cart />
        </Group>
      </Group>
    </nav>
  )
}

export default PublicNavbar