import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (email: string, password: string) => {
    console.log("Email: ", email);
    console.log("Password: ", password);

    login(email, password)
  }

  return (
    <div>
      Login

      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={() => handleLogin('a', 'a')}>Login</button>
    </div>
  )
}

export default Login