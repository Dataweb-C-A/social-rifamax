import { RootState } from "@/store";
import { IconX } from '@tabler/icons-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, setToken } from "../store/reducers/userSlice";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const login = (email: string, password: string) => {
    axios
      .post(`https://api.rifa-max.com/social/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log('user', response.data)
        dispatch(setUser(response.data));
        navigate('/admin/dashboard')
      })
      .catch(() => {
        notifications.show({
          autoClose: 5000,
          title: <Text c="white" fw={700} fz={17} italic>No autorizado.</Text>,
          message: <Text c="white" fz={15}>Correo o contraseña incorrectos.</Text>,
          color: "red",
          icon: <IconX />,
          withCloseButton: true,
          className: "my-notification-class",
          style: { backgroundColor: "red" },
          sx: { backgroundColor: "red" },
          loading: false,
        });
      });
  };

  const token = localStorage.getItem('token')

  const refreshToken = (token: string | null, acceptAction?: void, rejectAction?: void) => {
    const actionByStatus = (status_code: number, block: void) => {
      switch (status_code) {
        case 401:
          block
          break
        case 403:
          signOut(true)
          break
        default:
          signOut(true)
          break
      }
    }

    axios.post('https://api.rifa-max.com/shared/refresh', {
      token: token
    }).then((response) => {
      setTimeout(() => {
        acceptAction
        dispatch(setToken(response.data.token))
        const parsePath = location.pathname === '/login' ? '/admin/dashboard' : location.pathname
        navigate(parsePath)
      }, 2000)
    }).catch((err) => {
      setTimeout(() => {
        rejectAction
        actionByStatus(err.response.status, console.log('raffles'))
        throw new Error("User's token can't be refreshed")
      }, 2000)
    })
  }

  const isAuthenticated = (token: string) => {
    return (axios.get(`https://api.rifa-max.com/shared/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(setUser(res.data.user))
        return true;
      })
      .catch(() => {
        refreshToken(token)
        return false;
      })) as Promise<boolean>;
  };

  const userIsAuthenticated = async () => {
    const token = localStorage.getItem('token') || '';
    return await isAuthenticated(token);
  };

  const profile = (token: string) => {
    axios
      .get(`https://api.rifa-max.com/shared/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setUser(response.data.user));
        return response.data;
      })
      .catch(() => {
        dispatch(clearUser());
        notifications.show({
          autoClose: 5000,
          title: <Text c="white" fw={700} fz={17} italic>Ha ocurrido un error.</Text>,
          message: <Text c="white" fz={15}>Su sesión ha expirado, ingrese de nuevo.</Text>,
          color: "red",
          icon: <IconX />,
          withCloseButton: true,
          className: "my-notification-class",
          style: { backgroundColor: "red" },
          sx: { backgroundColor: "red" },
          loading: false,
        });
      });
  };

  const signOut = (redirect?: boolean) => {
    dispatch(clearUser());
    redirect ?
      navigate("/login")
      : null
  };

  const user = useSelector((state: RootState) => state.user);

  return { login, user, signOut, profile, userIsAuthenticated, isAuthenticated, refreshToken, token };
}