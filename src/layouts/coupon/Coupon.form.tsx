import {
  Anchor,
  Avatar,
  Box,
  Button,
  Modal,
  Card,
  Checkbox,
  Group,
  Select,
  Text,
  TextInput,
  Textarea
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { motion } from 'framer-motion'
import { IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios'
import { useState, useEffect } from 'react'
import AddressForm from './address/Address.form';
import { useAddress } from '../../hooks/useAddress';
import { useClient } from '../../hooks/useClient';

interface IForm {
  name: string
  lastName: string
  email: string
  prefix: string
  phone: string
  country: string;
  direction: string;
  city: string;
  zip_code: string | number;
  termsOfService: boolean;
}

interface IUser {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  country: string;
  address: string;
  province: string;
  zip_code: string;
}

interface ICouponForm {
  nextStep(): void;
  prevStep(): void;
}

function CouponForm({ nextStep, prevStep }: ICouponForm) {
  const [isUserExists, setIsUserExists] = useState<boolean>(true)
  const [userData, setUserData] = useState<IUser | null>(null)
  const [oldPhone, setOldPhone] = useState<string>('')
  const [opened, { open, close }] = useDisclosure(false);
  const [isError, setIsError] = useState<boolean>(false)
  const { address, changeAddress } = useAddress()
  const { changeClient } = useClient()
  const { t } = useTranslation();
  const emailRegex = /^[a-zA-Z0-9_+\-.]+@[a-z\d\-.]+\.[a-z]+$/i
  const prefixRegex = /^\+\d{1,4}$/
  const phoneRegex = /^\(\d{1,4}\) \d{3}-\d{4}$/

  const changeDirection = () => {
    userData && (
      setUserData({
        ...userData,
        ...address
      })
    )
    close()
  }

  const verifyUser = (phone: string) => {
    setUserData(null)
    setIsUserExists(true)
    axios.get('http://localhost:3000/social/clients/phone', {
      params: {
        phone: phone
      }
    }).then(response => {
      console.log(response.data)
      changeClient({
        data: {
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email
        }
      })
      changeAddress({
        data: {
          address: response.data.address,
          province: response.data.province,
          country: response.data.country,
          zip_code: response.data.zip_code
        }
      })
      setUserData(response.data)
    }).catch(error => {
      console.log(error)
      setUserData(null)
    })
  }

  const submit = (values: IForm) => {
    setIsError(false)
    axios.post('http://localhost:3000/social/clients', {
      social_client: {
        name: values.name + ' ' + values.lastName,
        email: values.email,
        phone: values.prefix + ' ' + values.phone,
        address: values.direction,
        province: values.city,
        zip_code: values.zip_code,
        country: values.country
      }
    }).then((res) => {
      changeClient({
        data: {
          id: res.data.id,
          name: values.name + ' ' + values.lastName,
          phone: values.prefix + ' ' + values.phone,
          email: values.email
        }
      })
      nextStep()
    }).catch(() => {
      nextStep()
    })
  }

  const form = useForm<IForm>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      prefix: '+58',
      direction: '',
      country: 'USA',
      city: '',
      zip_code: '',
      phone: '',
      termsOfService: false
    },
    validate: {
      name: (value: string) => (value.length < 4 ? t('shortFirstName') : null),
      lastName: (value: string) => (value.length < 4 ? t('shortLastName') : null),
      email: (value: string) => (!emailRegex.test(value) ? t('invalidEmail') : null),
      prefix: (value: string) => (!prefixRegex.test(value) ? t('invalidPrefix') : null),
      direction: (value: string) => (value.length < 16 ? t('invalidAddress') : null),
      phone: (value: string) => (!phoneRegex.test(value) ? t('invalidPhoneNumber') : null),
      city: (value: string) => (value.length < 3 ? t('invalidCity') : null),
      zip_code: (value: string | number) => (value.toString().length < 4 ? t('invalidPostalCode') : null),
      termsOfService: (value: boolean) => (!value ? t('mustAcceptTerms') : null)
    }
  });

  useEffect(() => {
    let phone = form.values.phone;
    if (phone.length < oldPhone.length) {
      setOldPhone(phone);
      return;
    }
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/^0+/, '');
    phone = phone.replace(/^(\d{3})/, '($1) ');
    phone = phone.replace(/(\)) (\d{3})/, '$1 $2-');
    phone = phone.replace(/(\d{3}) (\d{4})/, '$1-$2');
    phone = phone.substring(0, 14);
    form.setFieldValue('phone', phone);
    setOldPhone(phone);
  }, [form.values.phone]);

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Text fz={18} fw={700}>

        {t('userDetailsTitle')}
      </Text>
      <Group w="100%" spacing={5}>
        <Select
          label={t('prefix')}
          placeholder={t('prefix')}
          size="xs"
          w={70}
          searchable
          data={[
            { value: '+58', label: '+58' },
            { value: '+1', label: '+1' },
            { value: '+57', label: '+57' },
          ]}
          {...form.getInputProps('prefix')}
        />

        <TextInput
          label={t('phone')}
          w='calc(100% - 130px)'
          size="xs"
          placeholder={t('phone')}
          error={form.errors.phone}
          {...form.getInputProps('phone')}
        />
        <Button
          color="green"
          w={50}
          mt={25}
          onClick={() => verifyUser(form.values.prefix + ' ' + form.values.phone)}
          disabled={!form.isValid('phone')}
          size="xs"
        >
          <IconSearch size={30} />
        </Button>
      </Group>
      {
        isUserExists && !userData && (
          <Box>
            <Group spacing={10} mt={10}>
              <TextInput
                label={t('firstName')}
                w='calc(50% - 5px)'
                size="xs"
                placeholder={t('firstName')}
                error={form.errors.name}
                {...form.getInputProps('name')}
              />
              <TextInput
                label={t('lastName')}
                w='calc(50% - 5px)'
                size="xs"
                placeholder={t('lastName')}
                error={form.errors.lastName}
                {...form.getInputProps('lastName')}
              />
            </Group>
            <TextInput
              label={t('email')}
              w='100%'
              mt={10}
              size="xs"
              placeholder={t('email')}
              error={form.errors.email}
              {...form.getInputProps('email')}
            />
            <Select
              data={[
                { value: 'USA', label: 'Estados Unidos' },
                { value: 'Venezuela', label: 'Venezuela' },
                { value: 'Colombia', label: 'Colombia' }
              ]}
              size="xs"
              mt={10}
              placeholder='Estados Unidos'
              label={t('countryOfResidence')}
              error={form.errors.country}
              {...form.getInputProps('country')}
            />
            <Textarea
              mt={10}
              label={t('address')}
              placeholder='Main Street Duluth'
              size="xs"
              error={form.errors.direction}
              {...form.getInputProps('direction')}
            />
            <Group spacing={10} mt={10}>
              <TextInput
                label={t('province')}
                w='calc(50% - 5px)'
                size="xs"
                placeholder="Georgia"
                error={form.errors.city}
                {...form.getInputProps('city')}
              />
              <TextInput
                label={t('postalCode')}
                w='calc(50% - 5px)'
                type='number'
                size="xs"
                placeholder="4005"
                error={form.errors.zip_code}
                {...form.getInputProps('zip_code')}
              />
            </Group>
            <Box mt={20}>
              <Checkbox
                label={t('termsAndConditions')}
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                size="xs"
              />
            </Box>
            <Group position='center' mt={20}>
              <Button
                color="blue"
                size="xs"
                onClick={() => prevStep()}
              >
                {t('back')}
              </Button>
              <Button
                type="submit"
                color="blue"
                size="xs"
              >
                {t('next')}
              </Button>
            </Group>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: isError ? 1 : 0,
              }}
            >
              <Card bg='red' mt={10}>
                <Text>
                  Ha ocurrido un error al crear cliente.
                </Text>
              </Card>
            </motion.div>
          </Box>
        )
      }
      {
        userData && (
          <>
            <Modal
              opened={opened}
              onClose={close}
              withCloseButton={false}
              centered
              title={t('changeAddressModalTitle')}
            >
              <AddressForm
                user_id={userData.id}
                onCancel={close}
                onAccept={changeDirection}
              />
            </Modal>
            <Card ta="center" w="100%" mt={15}>
              <Text c="dimmed" mb={-7} fz={12} fw={300}>
                {t('wrongDetails')}
              </Text>
              <Anchor fz={11} fw={300} onClick={open}>
                {t('clickToChange')}
              </Anchor>
              <Group position='center' my={10}>
                <Avatar radius="lg" size="xl" color='blue' />
              </Group>
              <Text fw={700} fz={18}>
                {userData.name}
              </Text>
              <Text c="dimmed" fz={12} fw={300}>
                {userData.email}
              </Text>
              <Text c="dimmed" fz={12} fw={300}>
                {userData.phone}
              </Text>
              <Text c="dimmed" fz={12} fw={300}>
                {address.address} {address.zip_code}, {address.province}, {address.country}.
              </Text>
            </Card>
            <Group spacing={5} mt={10} position="center">
              <Button size="xs" onClick={() => prevStep()}> {t('back')}</Button>
              <Button size="xs" onClick={() => nextStep()}> {t('next')}</Button>
            </Group>
          </>
        )
      }
    </form>
  )
}

export {
  CouponForm
}