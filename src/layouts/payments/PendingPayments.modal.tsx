import { useLanguage } from "../../hooks/useLanguage";
import standarize from "../../utils/standarize";
import { Avatar, Badge, Box, Card, Group, Text } from "@mantine/core";
import { IconTransfer } from "@tabler/icons-react";
import React from "react";

interface IPendingsPaymentModal {
  data: {
    id: number;
    amount: number;
    money: 'USD' | 'VES' | 'COP'
    payed_at: string;
    username: string;
    raffle: string;
    payment_method: 'Pago Móvil' | 'Zelle' | 'Stripe'
    status: 'pending'
  },
  children?: React.ReactNode
}

function PendingPaymentsModal({ data, children }: IPendingsPaymentModal) {
  const { currentExchange } = useLanguage()
  return (
    <div>
      <Box bg="sky">
        <Card shadow="xs" padding="xl">
          <Group position="center" mb={20}>
            <Avatar size="xl" color="light" radius='xl'>
              <IconTransfer />
            </Avatar>
          </Group>
          <Text align="center" size="xl" weight={700}>
            {data.username}
          </Text>
          <Text align="center" size="sm">
            {data.raffle}
          </Text>
          <Text align="center" size="sm">
            {data.payed_at}
          </Text>
          <Text align="center" size="sm">
          {
            standarize({
              value: data.amount,
              currency: data.money,
              country: currentExchange()
            })
          }
          </Text>
          <Group position="center" mt={5}>
            <Badge color="blue" variant="filled">
              {data.payment_method}
            </Badge>
          </Group>
        </Card>
      </Box>
      {children}
    </div>
  )
}

export default PendingPaymentsModal