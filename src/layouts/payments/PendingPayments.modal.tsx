import { useLanguage } from "../../hooks/useLanguage";
import standarize from "../../utils/standarize";
import { Avatar, Badge, Box, Card, Group, Text } from "@mantine/core";
import { IconTransfer } from "@tabler/icons-react";
import React from "react";

interface IPendingsPaymentModal {
  data: {
    id: number;
    payment: 'Pago Móvil' | 'Zelle' | 'Stripe';
    amount: number;
    currency: 'USD' | 'VES' | 'COP';
    status: 'active' | 'rejected' | 'refunded';
    details: {
      name: string;
      email?: string;
      last_digits?: number;
      reference?: string;
      phone?: string;
      dni?: string;
      bank?: string;
    };
    client: {
      name: string;
      email: string;
      phone: string;
      dni: string;
      country: string;
      province: string;
      address: string;
      zip_code: string
    };
    raffle: string;
    created_at: string;
  }
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
          <Text align="center" size={25} fw={700}>
          {
            standarize({
              value: data.amount,
              currency: data.currency,
              country: currentExchange()
            })
          }
          </Text>
          <Text align="center" size="xl" weight={300}>
            {data.details.name}
          </Text>
          <Text align="center" size="sm" c="dimmed" weight={300}>
            {data.details.email}
          </Text>
          <Text align="center" size="sm" c="dimmed" weight={300}>
            {data.details.reference}
          </Text>
          <Text align="center" size="sm">
            {data.created_at}
          </Text>
          <Group position="center" mt={5}>
            <Badge color="blue" variant="filled">
              {data.payment}
            </Badge>
          </Group>
        </Card>
      </Box>
      {children}
    </div>
  )
}

export default PendingPaymentsModal