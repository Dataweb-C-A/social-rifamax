import { useLanguage } from "../../hooks/useLanguage";
import standarize from "../../utils/standarize";
import { Avatar, Badge, Box, Card, Group, Text } from "@mantine/core";
import { IconTransfer, IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";
import React from "react";

interface IPaymentsHistory {
  data: {
    id: number;
    payment: 'Pago Móvil' | 'Zelle' | 'Stripe';
    amount: number;
    currency: 'USD' | 'VES' | 'COP';
    status: 'active' | 'rejected' | 'refunded' | 'accepted';
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

interface IPfpIcon {
  status: 'active' | 'accepted' | 'rejected' | 'refunded'
}

const IconPfp = ({ status }: IPfpIcon) => {
  const colors = {
    active: 'blue',
    accepted: 'teal',
    rejected: 'red',
    refunded: 'light'
  }

  const icons: { [key: string]: JSX.Element } = {
    active: <IconInfoCircle size="2.5rem" />,
    accepted: <IconCheck size="2.5rem" />,
    rejected: <IconX size="2.5rem" />,
    refunded: <IconTransfer size="2.5rem" />
  }

  return (
    <Avatar size="xl" color={colors[status]} radius="xl">
      {icons[status]}
    </Avatar>
  )
}

function PaymentHistoryModal({ data, children }: IPaymentsHistory) {
  const { currentExchange } = useLanguage()
  return (
    <div>
      <Box bg="sky">
        <Card shadow="xs" padding="xl">
          <Group position="center" mb={20}>
            <IconPfp status={data.status} />
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

export default PaymentHistoryModal