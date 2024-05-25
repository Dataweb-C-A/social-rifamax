import { useDispatch, useSelector } from "react-redux";
import { clearProducts } from "../store/reducers/cartSlice";
import { RootState } from "../store";
import { Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

// interface IProduct {
//   identifier: string;
//   raffle_id: number;
//   product_id: number;
//   price: number;
// }

export function useCart() {
  const dispatch = useDispatch();

  const cart = () => {
    const selector = useSelector((state: RootState) => state.cart);
    return selector;
  };

  const totalValue = () => {
    const selector = useSelector((state: RootState) => state.cart);
    let total = 0;
    selector.products.forEach((product) => {
      total += product.price;
    });
    return total;
  }

  const addProduct = () => {
    // dispatch(setProducts(products));

    notifications.show({
      autoClose: 5000,
      title: <Text c="white" fw={700} fz={17} italic>Agregado al carrito</Text>,
      message: <Text c="white" fz={15}>Su producto ha sido agregado con éxito</Text>,
      color: "green",
      bg: "green",
      icon: <IconCheck />,
      withCloseButton: true,
      className: "check-cart-notification",
      loading: false,
    });
  }

  const destroyCart = () => {
    dispatch(clearProducts());
  }

  const mock = () => {
    // dispatch(addProduct());
  }

  // const setTheme = (theme: "light" | "dark") => {
  //   dispatch(setThemeMode(theme));
  // };

  return { cart, totalValue, destroyCart, mock, addProduct };
}