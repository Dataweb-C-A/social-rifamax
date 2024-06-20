import { Badge, Button, Loader, SegmentedControl, Table, createStyles, Group, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals'
import PaymentHistoryModal from '../layouts/payments/PaymentHistory.modal'
import { useTranslation } from 'react-i18next';

// interface IPaymentsHistory {
//   contentCode: string
// }

interface IHistory {
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

interface IBadges {
  status: 'solved' | 'rejected' | 'refund'
}

const useStyles = createStyles((theme) => ({
  tableBody: {
    height: '10px !important',
    overflowY: 'scroll'
  }
}))

function PaymentsHistory() {
  const { classes } = useStyles();
  const { t } = useTranslation()

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
    axios.get(`http://localhost:3000/social/payment_methods/history?payment=${paymentSelected}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NDQsImV4cCI6MTcxOTQ5NTU5OX0.OdoZzZqmXvGLw96_-wIRH0WQCorfgvuTCOer66TtrGw'
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

  const openModal = ({ data }: IModal) => modals.openConfirmModal({
    title: t('verifyPaymentModalTitle'),
    children: (
      <PaymentHistoryModal
        data={data}
      />
    ),
    labels: { confirm: t('acceptActionPaymentModal'), cancel: t('cancelActionPaymentModal') },
    centered: true,
  })

  const SelectBadge = ({ status }: IBadges) => {
    return (
      <Badge color={
        status === 'solved' ? 'teal' :
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
            <SegmentedControl
              mt={20}
              data={paymentsMethods}
              value={paymentSelected}
              onChange={(value) => setPaymentSelected(value)}
            />
            {
              error ? (
                <Group w="100%" mt={20} position="center">
                  <Text fw={700} fz={20}>
                    Something went wrong...  
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
                  <tbody>
                    {rows}
                  </tbody>
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