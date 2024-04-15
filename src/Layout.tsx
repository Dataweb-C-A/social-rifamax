import { ReactNode } from 'react'
import { createStyles } from '@mantine/core'

interface ILayout {
  children?: ReactNode
  noOverlap?: boolean
}

function Layout({ children, noOverlap = false }: ILayout) {
  const useStyles = createStyles((theme) => ({
    main: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },
    container: {
      height: 'calc(100vh - 75px)',
      width: '1920px',
      display: 'flex',
      padding: `${noOverlap ? 0 : '10px 10px'}`,
    }
  }))

  const { classes } = useStyles()

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        {children}
      </div>
    </main>
  )
}

export default Layout