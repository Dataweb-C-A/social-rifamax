import { useSelector } from 'react-redux'
import RifamaxLogo from '../components/RifamaxLogo'
import useAuth from '../hooks/useAuth'
import { Button, Card, PasswordInput, Text, TextInput, createStyles } from "@mantine/core"
import { RootState } from '../store'
import { ChangeEvent, useState } from 'react'

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    padding: '0 15px'
  },
  cardWrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
    maxWidth: '400px',
    width: '100%',
    minWidth: '300px',
    padding: '30px 30px !important'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  button: {}
}))

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login } = useAuth()
  const { classes } = useStyles()

  const handleLogin = (email: string, password: string) => {
    login(email, password)
  }

  const mode = useSelector((state: RootState) => state.theme.mode)

  return (
    <div className={classes.container}>
      <Card
        shadow='xl'
        radius='md'
        withBorder={mode === 'dark' ? false : true}
        className={classes.cardWrapper}
      >
        <div className={classes.center}>
          <RifamaxLogo size={250} />
        </div>
        <TextInput
          placeholder='micuenta@rifamax.com'
          mt='-160px'
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
          label={
            <Text fw={750} fz={15}>Correo</Text>
          }
        />
        <PasswordInput
          placeholder='********'
          mt={10}
          mb={20}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
          label={
            <Text fw={750} fz={15}>Contraseña</Text>
          }
        />
        <Button
          onClick={() => handleLogin(email.toLowerCase(), password)}
          className={classes.button}
          mb={10}
          fullWidth
        >
          Login
        </Button>
      </Card>
    </div>
  )
}

export default Login