import { Badge, Button, SegmentedControl, Table, createStyles } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface IPaymentsHistory {
  contentCode: string
}

interface IRows {
  id: number;
  amount: number;
  money: 'USD' | 'VES' | 'COP'
  payed_at: string;
  payment_method: 'Pago Móvil' | 'Zelle' | 'Stripe'
  status: 'solved' | 'rejected' | 'refund'
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

function PaymentsHistory({ contentCode }: IPaymentsHistory) {
  const { classes } = useStyles(); 
  const { t } = useTranslation()

  const elements = [
    {
      id: 1,
      amount: 100.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'solved'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 2,
      amount: 21.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'rejected'
    },
    {
      id: 3,
      amount: 10.00,
      money: 'USD',
      payment_method: 'Zelle',
      payed_at: '2021-08-01',
      status: 'refund'
    }
  ] satisfies IRows[]

  const paymentsMethods = ['Pago Móvil', 'Zelle', 'Stripe']

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
      <td>{row.money} {row.amount}</td>
      <td>{row.payed_at}</td>
      <td><SelectBadge status={row.status} /></td>
      <td><Button size='xs' px={5}><IconInfoCircle /></Button></td>
    </tr>
  ))

  return (
    <section style={{ padding: '0 5px' }}>
      <SegmentedControl
        mt={20}
        data={paymentsMethods}
      />
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
    </section>
  )
}

export default PaymentsHistory