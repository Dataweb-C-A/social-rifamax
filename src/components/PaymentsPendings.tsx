import standarize from '../utils/standarize';
import { Badge, Button, Card, Group, Loader, Pagination, SimpleGrid, Text } from '@mantine/core';
import i18n from 'i18next';
import { useLanguage } from '../hooks/useLanguage';
import { modals } from '@mantine/modals';
import PendingPaymentsModal from '../layouts/payments/PendingPayments.modal';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

// interface IPaymentsPendings {
//   contentCode: string
// }

interface IPaymentsPendings {
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

interface IModal {
  data: IPaymentsPendings
}

function PaymentsPendings() {
  const { currentExchange } = useLanguage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [elements, setElements] = useState<IPaymentsPendings[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [paymentsProcessed, setPaymentsProcessed] = useState<number>(0);
  
  const count = 6;

  const { t } = useTranslation();

  const acceptPayment = (id: number) => {
    axios.post(`http://localhost:3000/social/payment_methods/${id}/accept`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDQsImV4cCI6MTcxOTQ5NTU5OX0.OdoZzZqmXvGLw96_-wIRH0WQCorfgvuTCOer66TtrGw`
    }}).then(() => {
      console.log(`Payment with ID=${id} accepted`)
      setPaymentsAccepted(paymentsProcessed + 1)
    }).catch(() => {
      console.log(`Payment with ID=${id} not accepted`)
    })
  }

  const rejectPayment = (id: number) => {
    axios.post(`http://localhost:3000/social/payment_methods/${id}/reject`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDQsImV4cCI6MTcxOTQ5NTU5OX0.OdoZzZqmXvGLw96_-wIRH0WQCorfgvuTCOer66TtrGw`
    }}).then(() => {
      console.log(`Payment with ID=${id} rejected`)
      setPaymentsAccepted(paymentsProcessed + 1)
    }).catch(() => {
      console.log(`Payment with ID=${id} not rejected`)
    })
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

  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:3000/social/payment_methods?page=${page}&count=${count}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDQsImV4cCI6MTcxOTQ5NTU5OX0.OdoZzZqmXvGLw96_-wIRH0WQCorfgvuTCOer66TtrGw'
      }
    })
      .then((response) => {
        setError(false)
        setElements(response.data.social_payment_methods)
        setPages(response.data.metadata.pages)
        setPage(response.data.metadata.page)
        setIsLoading(false)
      })
      .catch(() => {
        setError(true)
        setIsLoading(false)
      })
  }, [page, paymentsProcessed])

  const LoaderWait = () => (
    <Group position='center' mt={50} w="100%">
      <Loader />
      <Text size="lg" fw={600}>
        Loading payments...
      </Text>
    </Group>
  )

  const Error = () => (
    <Group position='center' mt={50} w="100%">
      <Text size="lg" fw={600}>
        Something went wrong...
      </Text>
    </Group>
  )

  return (
    <section>
      {
        error ? <Error /> : null
      }
      {
        isLoading ?
          <LoaderWait /> :
          (
            <>
              <Group position='center'>
                <Pagination
                  total={pages}
                  siblings={10}
                  withControls
                  mt={10}
                  value={page}
                  onChange={(value) => setPage(value)}
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
                  elements.map((element: IPaymentsPendings, index: number) => {
                    return (
                      <Card radius='xs' key={index} withBorder>
                        <Group position='apart' mb={10}>
                          <Badge size="xs" radius="sm">{element.payment}</Badge>
                          <Text c="dimmed" pt={2.2} fz={11}>
                            {element.created_at}
                          </Text>
                        </Group>
                        <Text size="md">
                          {
                            standarize({
                              value: element.amount,
                              currency: element.currency,
                              country: currentExchange()
                            })
                          }
                        </Text>
                        <Text c="dimmed" fz={11.5}>
                          {element.client.name}
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
            </>
          )
      }
    </section>
  )
}

export default PaymentsPendings