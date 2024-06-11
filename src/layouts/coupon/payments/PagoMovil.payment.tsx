import { Button, Group, Text, Card, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCash, IconHash } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

interface IPayment {
  children: React.ReactNode;
  onPay: () => void;
}

interface IPaymentForm {
  reference: string;
  bank: string
}

function PagoMovilPayment({ children, onPay}: IPayment) {
  const [isNext, setIsNext] = useState<boolean>(false)

  const form = useForm<IPaymentForm>({
    initialValues: {
      reference: '',
      bank: 'Mercantil'
    },
    validate: {
      reference: (value) => (value.length < 1 ? 'Ingrese un número de referencia' : null),
      bank: (value) => (value.length < 1 ? 'Seleccione un banco' : null)
    }
  })

  useEffect(() => {
    let reference = form.values.reference;
    reference = reference.replace(/\D/g, '');
    form.setFieldValue('reference', reference);
  }, [form.values.reference]);

  const { t } = useTranslation();
  const PayInfo = () => {
    return (
      <>
        <Text fw={300} fz={14} ta="center" mb={10}>

        {t('beneficiaryDetails')}
        </Text>
        <Group position="center">
          <Text fw={700} fz={12}>
            Javier Diaz
          </Text>
        </Group>
        <Group position="center">
          <Text fw={700} fz={12}>
            V-29.543.140
          </Text>
        </Group>
        <Group position="center">
          <Text fw={700} fz={12}>
            0412-1688466
          </Text>
        </Group>
        <Group position="center" mb={7}>
          <Text fw={700} fz={12}>
            Banco Mercantil
          </Text>
        </Group>
      </>
    )
  }

  return (
    <div>
      <Card withBorder my={10}>
        {
          isNext ? (
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
              
                w="100%"
                label={t('referenceNumber') }
                placeholder={t('referenceNumber') }
                mb={20}
                size="xs"
                icon={<IconHash size='1rem' />}
                error={form.errors.reference}
                {...form.getInputProps('reference')}
              />
              <Select
                label={t('bank') }
                placeholder="Seleccione un banco"
                size="xs"
                searchable
                mb={10}
                icon={<IconCash size="1rem" />}
                data={[
                  { value: 'Mercantil', label: 'Mercantil' },
                  { value: 'Banesco', label: 'Banesco' },
                  { value: 'Banco de Venezuela', label: 'Banco de Venezuela' },
                  { value: 'Banco Provincial', label: 'Banco Provincial' },
                  { value: 'Banco del Caribe', label: 'Bancaribe' },
                  { value: 'Banco Activo', label: 'Banco Activo' },
                  { value: 'BNC', label: 'Banco Nacional de Credito' }
                ]}
                dropdownPosition="top"
                error={form.errors.bank}
                {...form.getInputProps('bank')}
              />
            </form>
          ) : <PayInfo />
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
              onClick={onPay}
            >
                 {t('dopay')}
            </Button>
          ) : (
            <Button
              p={5}
              size="xs"
              onClick={() => setIsNext(true)}
            >
            {t('verifyPayment')}
              
            </Button>
          )
        }
        <div>
          {children}
        </div>
      </Group>
    </div>
  )
}

export default PagoMovilPayment