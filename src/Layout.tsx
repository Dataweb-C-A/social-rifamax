import { ReactNode } from 'react'
import { ScrollArea, createStyles } from '@mantine/core'

interface ILayout {
  children?: ReactNode
  noOverlap?: boolean
  full?: boolean
  width?: string
}

function Layout({ children, noOverlap = false, full = false, width = '1920px' }: ILayout) {
  const useStyles = createStyles((theme) => ({
    main: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    },
    container: {
      height: full ? '100vh' : 'calc(100vh - 75px)',
      width: width,
      display: 'flex',
      padding: `${noOverlap ? 0 : '10px 10px'}`,
    }
  }))

  const { classes } = useStyles()

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <ScrollArea w="100%" h="calc(100%)" scrollbarSize={0}>
          {children}
        </ScrollArea>
      </div>
    </main>
  )
}

export default Layout