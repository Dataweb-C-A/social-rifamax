import { Anchor, Box, Button, Card, Group, Radio, Text } from "@mantine/core";
import { useState, useEffect } from "react";

const allPayments = ['Pago Móvil', 'Zelle']

const parseToFile: Record<IPaymentType, string> = {
  'Pago Móvil': 'PagoMovil',
  'Zelle': 'Zelle'
}

interface ICheckout {
  paymentMethods: ('Pago Móvil' | 'Zelle')[];
  quantity: number;
  onComplete: () => void;
}

type IPaymentType = typeof allPayments[number];

interface IPaymentModuleProps {
  onPay: () => void;
  children: React.ReactNode;
}

function Checkout({ quantity, onComplete }: ICheckout) {
  const [paymentSelected, setPaymentSelected] = useState<IPaymentType | ''>('')
  const [PaymentModule, setPaymentModule] = useState<React.FC<IPaymentModuleProps> | null>(null);
  const [isProceed, setIsProceed] = useState<boolean>(false)

  const dynamicTitle = paymentSelected ? 'Proceda con el pago' : 'Seleccione un método de pago'

  useEffect(() => {
    if (paymentSelected !== '') {
      import(`../layouts/coupon/payments/${parseToFile[paymentSelected]}.payment.tsx`)
        .then(module => {
          setPaymentModule(() => module.default);
        });
    }
  }, [paymentSelected]);

  const PaymentWall = () => {
    return (
      <>
        <Radio.Group
          value={paymentSelected}
          onChange={setPaymentSelected}
        >
          {
            allPayments.map((payment: IPaymentType) => {
              return(
                <Box py={5}>
                  <Radio 
                    value={payment} 
                    label={payment}
                  />
                </Box>
              )
            })
          }
        </Radio.Group>
        <Group position="right">
          <Button 
            mt={10} 
            size="xs" 
            disabled={paymentSelected === ''}
            onClick={() => setIsProceed(true)}
          >
            Proceder
          </Button>
        </Group>
      </>
    )
  }

  return (
    <>
      <Text fz={18} mb={5} fw={700}>
        {dynamicTitle}
      </Text>
      <Card>
        {
          isProceed && PaymentModule ? (
            <>
              <Group position="apart">
                <Text>{paymentSelected}</Text>
                <Anchor
                  size={11}
                  italic
                  onClick={() => {
                    setIsProceed(false)
                  }}
                >
                  Cambiar método de pago
                </Anchor>
              </Group>
              <PaymentModule 
                onPay={onComplete}
                children={
                  <>
                    <Text fw={300} fz={15} ta="end">
                      {
                        paymentSelected === 'Zelle' ? `$${quantity * 21}` : `VES ${((quantity * 21) * 36.7).toFixed(2)}`
                      }
                    </Text>
                    <Text italic fw={300} c="dimmed" fz={10} ta="end">
                      Total a pagar
                    </Text>
                  </>
                }
              />
            </>
          ) : <PaymentWall />
        }
      </Card>
    </>
  )
}

export default Checkout