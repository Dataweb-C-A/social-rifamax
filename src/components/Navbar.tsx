import { createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  navbar: {
    width: '100%',
    height: '75px',
    border: '2.5px dashed red',
    display: 'flex',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  }
}));

function Navbar() {
  const { classes } = useStyles();
  return (
    <nav className={classes.navbar}>

    </nav>
  )
}

export default Navbar