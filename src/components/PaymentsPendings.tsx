import standarize from '../utils/standarize';
import { Badge, Button, Card, Group, Pagination, SimpleGrid, Text } from '@mantine/core';
import i18n from 'i18next';
import { useLanguage } from '../hooks/useLanguage';
import { modals } from '@mantine/modals';
import PendingPaymentsModal from '../layouts/payments/PendingPayments.modal';
import { useTranslation } from 'react-i18next';

interface IPaymentsPendings {
  contentCode: string
}

interface IPendings {
  id: number;
  amount: number;
  money: 'USD' | 'VES' | 'COP'
  payed_at: string;
  username: string;
  raffle: string;
  payment_method: 'Pago Móvil' | 'Zelle' | 'Stripe'
  status: 'pending'
}

interface IModal {
  data: IPendings
}

function PaymentsPendings({ contentCode }: IPaymentsPendings) {
  const { currentExchange } = useLanguage();

  const { t } = useTranslation();

  const acceptPayment = (id: number) => {
    console.log(`Payment with ID=${id} accepted`)
  }

  const rejectPayment = (id: number) => {
    console.log(`Payment with ID=${id} rejected`)
  }

  const openModal = ({ data }: IModal) => modals.openConfirmModal({
    title: t('verifyPaymentModalTitle'),
    children: (
      <PendingPaymentsModal
        data={data}
      />
    ),
    labels: { confirm: t('acceptActionPaymentModal'), cancel: t('cancelActionPaymentModal') },
    centered: true,
    onConfirm: () => acceptPayment(data.id),
    onCancel: () => rejectPayment(data.id)
  })

  const elements = [
    {
      id: 1,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      username: 'Javier Diaz',
      raffle: 'Hyundai Santa Fe 2024',
      status: 'pending',
      payed_at: '04/06/2024'
    },
    {
      id: 2,
      amount: 628.12,
      money: 'VES',
      payment_method: 'Pago Móvil',
      username: 'Javier Diaz',
      raffle: 'Hyundai Santa Fe 2024',
      status: 'pending',
      payed_at: '04/06/2024'
    },
    {
      id: 3,
      amount: 628.12,
      money: 'VES',
      payment_method: 'Pago Móvil',
      username: 'Javier Diaz',
      raffle: 'Hyundai Santa Fe 2024',
      status: 'pending',
      payed_at: '04/06/2024'
    },
    {
      id: 4,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      username: 'Javier Diaz',
      raffle: 'Hyundai Santa Fe 2024',
      status: 'pending',
      payed_at: '04/06/2024'
    },
    {
      id: 5,
      amount: 628.12,
      money: 'VES',
      payment_method: 'Pago Móvil',
      username: 'Javier Diaz',
      raffle: 'Hyundai Santa Fe 2024',
      status: 'pending',
      payed_at: '04/06/2024'
    },
    {
      id: 6,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      username: 'Javier Diaz',
      raffle: 'Hyundai Santa Fe 2024',
      status: 'pending',
      payed_at: '04/06/2024'
    }
  ] satisfies IPendings[]

  return (
    <section>
      <Group position='center'>
        <Pagination
          total={4}
          siblings={10}
          withControls
          mt={10}
        />
      </Group>
      <SimpleGrid mt={15} spacing={7} mx={5}
        breakpoints={[
          { minWidth: 360, cols: 2 },
          { minWidth: 800, cols: 4 },
          { minWidth: 1000, cols: 6 },
          { minWidth: 1400, cols: 12 },
        ]}
      >
        {
          elements.map((element: IPendings, index: number) => {
            return (
              <Card radius='xs' key={index} withBorder>
                <Group position='apart' mb={10}>
                  <Badge size="xs" radius="sm">{element.payment_method}</Badge>
                  <Text c="dimmed" pt={2.2} fz={11}>
                    {element.payed_at}
                  </Text>
                </Group>
                <Text size="md">
                  {
                    standarize({
                      value: element.amount,
                      currency: element.money,
                      country: currentExchange()
                    })
                  }
                </Text>
                <Text c="dimmed" fz={11.5}>
                  {element.username}
                </Text>
                <Text c="dimmed" fz={11.5}>
                  {element.raffle}
                </Text>
                <Button mt={10} size="xs" fullWidth onClick={() => openModal({ data: element })}>
                  {i18n.t('verifyPaymentButton')}
                </Button>
              </Card>
            )
          })
        }
        {/* {
          Array(6).fill('').map((_) => {
            return (
              <Card radius='xs' withBorder>
                <Group position='left' mb={10}>
                  <Badge size="sm" radius="sm">Pago Móvil</Badge>
                </Group>
                <Text size="md">
                  VES 628.12
                </Text>
                <Text c="dimmed" fz={11.5}>
                  Javier Diaz
                </Text>
                <Text c="dimmed" fz={11.5}>
                  Hyundai Santa Fe 2023
                </Text>
                <Button mt={10} size="xs" fullWidth>
                  Verificar
                </Button>
              </Card>
            )
          })
        } */}
      </SimpleGrid>
    </section>
  )
}

export default PaymentsPendings