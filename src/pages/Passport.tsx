import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import Layout from "../Layout"
import { Avatar, Badge, Card, Group, Loader, Text, createStyles, getBreakpointValue } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import { IconCheck, IconLock, IconUser, IconX } from "@tabler/icons-react"
import { isUndefined } from "../utils/isUndefined"


function Passport() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)
  const { width } = useViewportSize()

  const userIsLogged = (value: boolean) => {
    return setIsLoggedIn(value)
  }

  const { refreshToken, token } = useAuth()

  const useStyles = createStyles((theme, _) => ({
    wrapper: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: width >= getBreakpointValue(theme.breakpoints.md) ? '0 100px' : '0',
    },
    card: {
      position: 'absolute',
      top: '39%',
      display: 'flex',
      flexWrap: 'wrap',
      width: 350,
      justifyContent: 'center',
    },
    avatar: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      marginBottom: '15px'
    }
  }))

  function renderIcon(isLoggedIn: boolean | undefined) {
    if (isUndefined(isLoggedIn)) {
      return <Loader size={50} />;
    } else {
      return isLoggedIn ? <IconCheck size={50} /> : <IconX size={50} />;
    }
  }

  const { classes } = useStyles();

  useEffect(() => {
    refreshToken(token, userIsLogged(true), userIsLogged(false))
  }, [])

  return (
    <Layout full>
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar size="xl" w="100%" radius='xl' color="light">
              <Group position="apart" w="100%" mx={20}>
                <IconLock size={50} />
                {renderIcon(isLoggedIn)}
              </Group>
            </Avatar>
          </div>
          <Badge my={-7} w="100%" bg="transparent">
            <Group w="100%" position="apart">
              <IconUser size={15} />
              <Text>
                Verificando acceso
              </Text>
            </Group>
          </Badge>
        </Card>
      </div>
    </Layout >
  )
}

export default Passport