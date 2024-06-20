import { Button, Card, Group, Text, TextInput } from "@mantine/core";
import React, { useState } from "react"
import { useForm } from "@mantine/form";
import { IconAt, IconHash, IconUser } from "@tabler/icons-react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useClient } from "../../../hooks/useClient";

interface IPayment {
  children: React.ReactNode;
  amount: number;
  onPay: () => void;
}

interface IPaymentForm {
  name: string;
  reference: string;
  email: string;
  amount: number;
}

function ZellePayment({ amount, children, onPay }: IPayment) {
  const [isNext, setIsNext] = useState<boolean>(false)
  const { client } = useClient();

  const form = useForm<IPaymentForm>({
    initialValues: {
      name: '',
      reference: '',
      email: '',
      amount: amount
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Ingrese un número de referencia' : null),
      reference: (value) => (value.length < 6 ? 'Ingrese un número de referencia' : null)
    }
  })

  const submit = () => {
    axios.post('http://localhost:3000/social/payment_methods', {
      social_payment_method: {
        amount: amount,
        currency: 'USD',
        payment: 'Zelle',
        social_client_id: client.id,
        details: {
          name: form.values.name,
          email: form.values.email,
          reference: form.values.reference
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(() => {
      onPay()
    }).catch(() => {
      console.log('error')
    })
  }

  const { t } = useTranslation();
  const PaymentWall = () => {
    return (
      <>
        <Text fw={300} fz={14} ta="center" mb={10}>
          {t('beneficiaryDetails')}
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
    <form onSubmit={submit}>
      <Card withBorder my={10}>
        {
          isNext ? (
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                w="100%"
                label={t('accountHolderName')}
                placeholder={t('accountHolderName')}
                mb={20}
                size="xs"
                icon={<IconUser size='1rem' />}
                error={form.errors.name}
                {...form.getInputProps('name')}
              />
              <TextInput
                w="100%"
                label={t('accountEmailName')}
                placeholder={t('accountEmailName')}
                mb={20}
                size="xs"
                icon={<IconAt size='1rem' />}
                error={form.errors.email}
                {...form.getInputProps('email')}
              />
              <TextInput
                w="100%"
                label={t('referenceNumber')}
                placeholder={t('referenceNumber')}
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
              type="submit"
            >
              {t('notifyPayment')}
            </Button>
          ) : (
            <Button
              p={5}
              size="xs"
              onClick={() => setIsNext(true)}
            >
              {t('confirmPayment')}
            </Button>
          )
        }
        <div>
          {children}
        </div>
      </Group>
    </form>
  )
}

export default ZellePayment