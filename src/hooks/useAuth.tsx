import { RootState } from "@/store";
import { IconX } from '@tabler/icons-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../store/reducers/userSlice";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    axios
      .post(`https://api.rifa-max.com/admin/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
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

  const isAuthenticated = (token: string) => {
    return (axios.get(`https://api.rifa-max.com/shared/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        dispatch(clearUser())
        return true;
      })
      .catch(() => {
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
        dispatch(setUser(response.data));
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

  const signOut = () => {
    dispatch(clearUser());
  };

  const user = useSelector((state: RootState) => state.user);

  return { login, user, signOut, profile, userIsAuthenticated, isAuthenticated };
}