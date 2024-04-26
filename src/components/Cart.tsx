import { IconShoppingCart, /*IconTrash*/ } from "@tabler/icons-react"
import { Divider, Popover, Text, createStyles, Button, Group,/* Card */} from "@mantine/core"
import standarize from "../utils/standarize";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// interface IProducts {
//   identifier: string;
//   price: string;
//   raffle_id: string;
// }

const useStyles = createStyles((theme) => ({
  container: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    display: 'flex',
    width: '150px',
    marginTop: '4px',
    padding: '10px',
    borderRadius: theme.radius.xs,
    justifyContent: 'space-evenly',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    }
  },
  cartWallet: {
    fontSize: theme.fontSizes.sm,
    marginTop: '3px',
    userSelect: 'none'
  },
  emptyCart: {
    padding: '50px 0px',
    textAlign: 'center',
    fontWeight: 700,
    fontSynthesis: 'bold',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]
  }
}))

function Cart() {
  const { classes } = useStyles();
  const selector = useSelector((state: RootState) => state.cart);

  // const cart = [
  //   {
  //     identifier: '1',
  //     price: '10000',
  //     raffle_id: '1'
  //   },
  //   {
  //     identifier: '2',
  //     price: '10000',
  //     raffle_id: '2'
  //   }
  // ] satisfies IProducts[];

  // const ProductsCart = (products: IProducts[]) => {
  //   return (
  //     <>
  //       {
  //         products.map((product, index) => (
  //           <Card key={product.identifier}>
  //             <Text>{index++}</Text>
  //             <Text>{product.price}</Text>
  //             <Text>{product.raffle_id}</Text>
  //           </Card>
  //         ))
  //       }
  //     </>
  //   )
  // }

  const EmptyCartMessage = () => {
    return (
      <>
        <Divider variant="dashed" mt={13} h="13px" />
        <Group position="center">
          <Text className={classes.emptyCart} w="100%">
            Tu carrito está vacío
          </Text>
        </Group>
        <Divider variant="dashed" h="13px" />
        <Button fullWidth>Seguir comprando</Button>
      </>
    )
  }

  return (
    <>
      <Popover width={260} position="bottom" shadow="md" radius="xs">
        <Popover.Target>
          <div className={classes.container}>
            <IconShoppingCart />
            <Text className={classes.cartWallet}>
              {
                standarize({
                  value: 0,
                  country: 'en-US',
                  currency: 'USD'
                })
              }
            </Text>
          </div>
        </Popover.Target>
        <Popover.Dropdown ml={-15}>
          {/* <Card bg="dark" mb={10} style={{ display: 'flex', gap: '10px' }}>
            <Card w="50px" bg='blue' ta="center" fw={700} fz={16}>1</Card>
            <div>
              <Text>4Runner 2023</Text>
              <Text c="dimmed" fz={10}>CANTIDAD: 1</Text>
              <Text c="dimmed" fz={10}>PRECIO: 5$</Text>
            </div>
          </Card>
          <Card mb={10} bg="dark" style={{ display: 'flex', gap: '10px' }}>
            <Card w="50px" bg='blue' ta="center" fw={700} fz={16}>1</Card>
            <div>
              <Text>4Runner 2023</Text>
              <Text c="dimmed" fz={10}>CANTIDAD: 1</Text>
              <Text c="dimmed" fz={10}>PRECIO: 5$</Text>
            </div>
          </Card>
          <Card bg="dark" style={{ display: 'flex', gap: '10px' }}>
            <Card w="50px" bg='blue' ta="center" fw={700} fz={16}>1</Card>
            <div>
              <Text>4Runner 2023</Text>
              <Text c="dimmed" fz={10}>CANTIDAD: 1</Text>
              <Text c="dimmed" fz={10}>PRECIO: 5$</Text>
            </div>
          </Card>
          <Group w="100%">
            <Button w="150px" mt={10}>Comprar</Button>
            <Button w="60px" color="red" mt={10}><IconTrash /></Button>
          </Group> */}
          {
            selector.cart.products.length === 0 && <EmptyCartMessage />
          }
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default Cart