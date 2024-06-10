import { Box, Burger, Drawer, Button, Group, Image, NavLink, Text, Popover, createStyles, Badge } from "@mantine/core"
import ThemeSwitcher from "./ThemeSwitcher";
import RifamaxLogo from "./RifamaxLogo";
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useLanguage } from "../hooks/useLanguage";
import { useTranslation } from 'react-i18next';
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
  },
  languageButton: {
    background: 'transparent',
    borderRadius: '100%',
    marginTop: '4px',
    padding: '5px',
    transition: 'background .2s ease',
    border: 'none',
    userSelect: 'none',
    cursor: 'pointer'
  },
  groupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(50% - 2.5px)',
  },
  changeLangButton: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    width: '100%',
    height: '140px'
  },
  dropdown: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.blue[1],
    border: theme.colorScheme === 'dark' ? `1px solid ${theme.colors.dark[5]}` : `1px solid ${theme.colors.blue[0]}`,
    borderRadius: '5px'
  }
}));

interface IPublicNavbar { }

function PublicNavbar({ }: IPublicNavbar) {
  const { classes } = useStyles();

  const { currentLanguage, changeLanguage } = useLanguage();

  const { width } = useViewportSize();
  const { t } = useTranslation()

  const popoverBreakpoint = width < 600 ? '98%' : '400px'
  return (
    <nav className={classes.navbar}>
      <Group position="apart" px={10} w="100%">
        <RifamaxLogo />
        <Group mt={-72}>
        <Popover trapFocus width={popoverBreakpoint} position="bottom" shadow="md">
            <Popover.Target>
              <button className={classes.languageButton}>
                <Image src={`/${currentLanguage()}_icon.png`} alt={`${currentLanguage()}`} width={30} height={30} />
              </button>
            </Popover.Target>
            <Popover.Dropdown ml={-5} mt={10} className={classes.dropdown}>
              {
                currentLanguage() === 'en'
                  ? <Text size="lg" fw={700} align="center">Choose your language</Text>
                  : <Text size="lg" fw={700} align="center">Elige tu idioma</Text>
              }
              <Group spacing={5}>
                <div className={classes.groupWrapper}>
                  <Button className={classes.changeLangButton} onClick={() => changeLanguage('es')}>
                    <Image src="/es_icon.png" height={120} width={120} alt="es" />
                  </Button>
                  <Badge color="blue" size="md" radius="xl">Español</Badge>
                </div>
                <div className={classes.groupWrapper}>
                  <Button className={classes.changeLangButton} onClick={() => changeLanguage('en')}>
                    <Image src="/en_icon.png" height={120} width={120} alt="en" />
                  </Button>
                  <Badge color="blue" size="md" radius="xl">English</Badge>
                </div>
              </Group>
            </Popover.Dropdown>
          </Popover>
          <ThemeSwitcher />
        </Group>
      </Group>
    </nav>
  )
}

export default PublicNavbar