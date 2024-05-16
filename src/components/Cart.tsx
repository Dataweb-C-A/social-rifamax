import { IconShoppingCart, IconTrash } from "@tabler/icons-react"
import { Divider, Popover, Text, createStyles, Button, Group, Card, ScrollArea } from "@mantine/core"
import standarize from "../utils/standarize";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    display: 'flex',
    width: '130px',
    marginTop: '4px',
    padding: '5px',
    borderRadius: theme.radius.xs,
    justifyContent: 'space-evenly',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    }
  },
  cartWallet: {
    fontSize: '13px',
    marginTop: '4px',
    userSelect: 'none'
  },
  emptyCart: {
    padding: '50px 0px',
    textAlign: 'center',
    fontWeight: 700,
    fontSynthesis: 'bold',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7]
  },
  cartProduct: {
    display: 'flex',
    marginBottom: '10px',
    gap: '10px',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  cartIdentifier: {
    width: '50px',
    background: theme.colors.blue[7],
    textAlign: 'center',
    fontWeight: 700,
    fontSize: '16px',
    color: '#fff !important'
  }
}))

export default function Cart() {
  const { classes } = useStyles();
  const { cart, totalValue, destroyCart, mock, addProduct } = useCart();

  const navigate = useNavigate()

  const redirect = () => {
    navigate('/raffles')
  }

  const ProductsCart = () => {
    return (
      <>
        <Text fz={14} italic c="dimmed" mb={10} fw={300}>
          Cantidad: {cart().products.length}
        </Text>
        <ScrollArea h={cart().products.length > 0 ? 210 : 0} w="100%" type="always" scrollbarSize={5}>
          {
            cart().products.map((product, index: number) => (
              <>
                <Card key={index} className={classes.cartProduct}>
                  <Card key={index} className={classes.cartIdentifier}>{index + 1}</Card>
                  <div>
                    <Text>4Runner 2023</Text>
                    <Text c="dimmed" fz={10}>CANTIDAD: 1</Text>
                    <Text c="dimmed" fz={10}>PRECIO:
                      {
                        standarize({
                          value: product.price,
                          country: 'en-US',
                          currency: 'USD'
                        })
                      }
                    </Text>
                  </div>
                </Card>
              </>
            ))
          }
        </ScrollArea>
        {
          cart().products.length > 0 && (
            <Group w="100%" mt={-7}>
              <Button w="150px" mt={10} onClick={mock}>Comprar</Button>
              <Button w="60px" color="red" mt={10} onClick={destroyCart}><IconTrash /></Button>
            </Group>
          )
        }
      </>
    )
  }

  const EmptyCartMessage = () => {
    return (
      <>
        {
          cart().products.length === 0 && (
            <>
              <Divider variant="dashed" h="13px" />
              <Group position="center">
                <Text className={classes.emptyCart} w="100%">
                  Tu carrito está vacío
                </Text>
              </Group>
              <Divider variant="dashed" h="13px" />
              <Button fullWidth onClick={addProduct}>Seguir comprando</Button>
            </>
          )
        }
      </>
    )
  }

  return (
    <Popover width={260} position="bottom" shadow="md" radius="xs">
      <Popover.Target>
        <div className={classes.container}>
          <IconShoppingCart />
          <Text className={classes.cartWallet}>
            {
              standarize({
                value: totalValue(),
                country: 'en-US',
                currency: 'USD'
              })
            }
          </Text>
        </div>
      </Popover.Target>
      <Popover.Dropdown ml={-15}>
        <ProductsCart />
        <EmptyCartMessage />
      </Popover.Dropdown>
    </Popover>
  )
}