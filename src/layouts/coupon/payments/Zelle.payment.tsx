import { Button, Card, Group, Text, TextInput } from "@mantine/core";
import React, { useState } from "react"
import { useForm } from "@mantine/form";
import { IconHash, IconUser } from "@tabler/icons-react";

interface IPayment {
  children: React.ReactNode;
  onPay: () => void;
}

interface IPaymentForm {
  name: string;
  reference: string;
}

function ZellePayment({ children, onPay }: IPayment) {
  const [isNext, setIsNext] = useState<boolean>(false)

  const form = useForm<IPaymentForm>({
    initialValues: {
      name: '',
      reference: ''
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Ingrese un número de referencia' : null),
      reference: (value) => (value.length < 6 ? 'Ingrese un número de referencia' : null)
    }
  })

  const PaymentWall = () => {
    return (
      <>
        <Text fw={300} fz={14} ta="center" mb={10}>
          Datos del beneficiario
        </Text>
        <Group position="center">
          <Text fw={700} fz={12}>
            Andys Fuenmayor
          </Text>
        </Group>
        <Group position="center" mb={7}>
          <Text fw={700} fz={12}>
            andyfuenmayor@gmail.com
          </Text>
        </Group>
      </>
    )
  }

  return (
    <div>
      <Card withBorder my={10}>
        {
          isNext ? (
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                w="100%"
                label="Nombre de la cuenta"
                placeholder="Nombre del poseedor de la cuenta"
                mb={20}
                size="xs"
                icon={<IconUser size='1rem' />}
                error={form.errors.name}
                {...form.getInputProps('name')}
              />
              <TextInput
                w="100%"
                label="Número de referencia"
                placeholder="Ingrese número de referencia"
                mb={20}
                size="xs"
                icon={<IconHash size='1rem' />}
                error={form.errors.reference}
                {...form.getInputProps('reference')}
              />
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

export default ZellePayment