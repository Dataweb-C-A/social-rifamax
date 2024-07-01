import axios from "axios";
import { RootState } from "@/store";
import { IconX, IconInfoCircle } from '@tabler/icons-react';
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export default function useAuth() {
  const navigate = useNavigate();

  const { clear, update } = useUser();

  const login = (email: string, password: string) => {
    axios
      .post(`http://localhost:3000/social/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        update(response.data.user, response.data.token);
        navigate('/admin/payments');
      })
      .catch(() => {
        notifications.show({
          autoClose: 5000,
          title: <Text c="white" fw={700} fz={17} italic>No autorizado.</Text>,
          message: <Text c="white" fz={15}>Correo o contraseña incorrectos.</Text>,
          icon: <IconX size={20} />,
          color: "red",
          loading: false,
          withCloseButton: true,
          className: "my-notification-class",
          style: { backgroundColor: "red", height: '100px' },
          sx: { backgroundColor: "red" },
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.blue[6],
              borderColor: theme.colors.blue[6],

              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.red[7] },
            },
          }),
        });
      });
  };

  const token = useSelector((state: RootState) => state.user.token);

  const authenticate = async () => {
    try {
      const response = await axios.get('http://localhost:3000/shared/users/profile', {
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      });
      update({user: response.data}, String(token));
      return response.data;
    } catch (error) {
      clear();
      notifications.show({
        title: <Text c="white" fw={700} fz={17} italic>Sesión expirada.</Text>,
        message: <Text c="white" fz={15}>Su sesión ha expirado, ingrese nuevamente</Text>,
        color: '#1971c2',
        icon: <IconInfoCircle size={20} />,
        loading: false,
        withCloseButton: true,
        autoClose: 5000,
        style: { backgroundColor: '#1971c2', height: '100px' },
        sx: { backgroundColor: "red" },
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.blue[6],
  
            '&::before': { backgroundColor: theme.white },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.blue[7] },
          },
        }),
      })
      navigate('/login')
      return false;
    }
  };

  const signOut = () => {
    clear();
    navigate('/login');
  };

  return {
    login,
    signOut,
    authenticate,
    token
  };
}