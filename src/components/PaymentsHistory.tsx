import { Badge, Button, Loader, SegmentedControl, Table, createStyles, Group, Text, Box, Avatar, Paper } from '@mantine/core'
import { IconBoxOff, IconChevronLeft, IconChevronRight, IconInfoCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals'
import PaymentHistoryModal from '../layouts/payments/PaymentHistory.modal'
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

interface IHistory {
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

interface IModal {
  data: IHistory
}

interface IBadges {
  status: 'accepted' | 'rejected' | 'refunded' | 'active'
}

const useStyles = createStyles(() => ({
  tableBody: {
    height: '10px !important',
    overflowY: 'scroll'
  }
}))

function PaymentsHistory() {
  const { classes } = useStyles();
  const { t } = useTranslation()
  const { token } = useAuth();

  const paymentsMethods = ['Pago Móvil', 'Zelle', 'Stripe']

  const [paymentSelected, setPaymentSelected] = useState<string>('Zelle')
  const [elements, setElements] = useState<IHistory[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(false)
    setLoading(true)
    axios.get(`http://localhost:3000/social/payment_methods/history?payment=${paymentSelected}&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setElements(res.data.social_payment_methods)
        setPages(res.data.metadata.pages)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [paymentSelected, page])

  const openModal = ({ data }: IModal) => modals.open({
    title: t('verifyPaymentModalTitle'),
    centered: true,
    children: (
      <PaymentHistoryModal
        data={data}
      >
        <Button fullWidth onClick={() => modals.closeAll()} mt="md">
          {t('accept')}
        </Button>
      </PaymentHistoryModal>
    )
  })

  const SelectBadge = ({ status }: IBadges) => {
    return (
      <Badge color={
        status === 'accepted' ? 'teal' :
          status === 'rejected' ? 'red' :
            'blue'
      }>
        {status}
      </Badge>
    )
  }

  const rows = elements.map((row, index) => (
    <tr key={index} style={{ textAlign: 'center' }}>
      <td>{row.currency} {row.amount}</td>
      <td>{row.created_at}</td>
      <td><SelectBadge status={row.status} /></td>
      <td><Button size='xs' px={5} onClick={() => openModal({ data: row })}><IconInfoCircle /></Button></td>
    </tr>
  ))

  return (
    <section style={{ padding: '0 5px' }}>
      {
        loading ? (
          <Group w="100%" mt={20} position="center">
            <Loader size="md" />
            <Text>Cargando historial...</Text>
          </Group>
        ) : (
          <>
            <Text fw={700} size="sm" w="100%" ta="end" ml={-15} mb={-20} mt={15}>
              {t('page')} {page} {t('of')} {pages}
            </Text>
            <Group position='apart'>
              <SegmentedControl
                mt={20}
                data={paymentsMethods}
                value={paymentSelected}
                onChange={(value) => setPaymentSelected(value)}
              />
              <Paper style={{ display: 'flex', flexWrap: 'wrap' }} mt={15}>
                <Button
                  size="sm"
                  style={{ borderRadius: '5px 0 0 5px' }}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  w="50%"
                >
                  <IconChevronLeft />
                </Button>
                <Button
                  size="sm"
                  style={{ borderRadius: '0 5px 5px 0' }}
                  onClick={() => setPage(page + 1)}
                  disabled={page === pages}
                  w="50%"
                >
                  <IconChevronRight />
                </Button>
              </Paper>
            </Group>
            {
              error ? (
                <Group w="100%" mt={20} position="center">
                  <Text fw={700} fz={20}>
                    {t('errorLoading')}
                  </Text>
                </Group>
              ) : (
                <Table className={classes.tableBody} mt={10} striped highlightOnHover withBorder withColumnBorders>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center' }}>{t('amountTablePH')}</th>
                      <th style={{ textAlign: 'center' }}>{t('dateTablePH')}</th>
                      <th style={{ textAlign: 'center' }}>{t('statusTablePH')}</th>
                      <th style={{ textAlign: 'center' }}>{t('optionsTablePH')}</th>
                    </tr>
                  </thead>
                  {
                    elements.length === 0 ? (
                      <Box
                        w="100%"
                        my={260}
                      >
                        <div
                          style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, -235%)' }}
                        >
                          <Avatar color="red" size="xl" radius="xl">
                            <IconBoxOff size="2.5rem" />
                          </Avatar>
                        </div>
                        <div
                          style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, -445%)' }}
                        >
                          <Text
                            ta="center"
                            fw={700}
                            size="sm"
                          >
                            {t('noPaymentsFound')}
                          </Text>
                        </div>
                      </Box>
                    ) : (
                      <tbody>
                        {rows}
                      </tbody>
                    )
                  }
                </Table>
              )
            }
          </>
        )
      }
    </section>
  )
}

export default PaymentsHistory