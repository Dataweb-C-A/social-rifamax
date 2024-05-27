import { Button, Card, Group, Text} from "@mantine/core";
import React, { useState } from "react"
import { useForm } from "@mantine/form";

interface IPayment {
  children: React.ReactNode;
  onPay: () => void;
}

interface IPaymentForm {
  name: string;
  reference: string;
}

function StripePayment({ children, onPay }: IPayment) {
  const [isNext, setIsNext] = useState<boolean>(false)

  const form = useForm<IPaymentForm>({
    initialValues: {
      name: '',
      reference: ''
    },
    validate: {}
  })

  const PaymentWall = () => {
    return (
      <>
        <Text fw={300} fz={14} ta="center" mb={10}>
          Stripe
        </Text>
      </>
    )
  }

  return (
    <div>
      <Card withBorder my={10}>
        {
          isNext ? (
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Text>
                Stripe
              </Text>
            </form>
          ) : <PaymentWall />
        }
      </Card>
      <Group position="apart">
        {
          isNext ? (
            <Button
              p={5}
              size="xs"
              color="teal"
              disabled={form.values.reference.length < 6}
              onClick={onPay}
            >
              Notificar pago
            </Button>
          ) : (
            <Button
              p={5}
              size="xs"
              onClick={() => setIsNext(true)}
            >
              Realizar pago
            </Button>
          )
        }
        <div>
          {children}
        </div>
      </Group>
    </div>
  )
}

export default StripePayment