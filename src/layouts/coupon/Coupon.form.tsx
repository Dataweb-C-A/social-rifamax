import { Anchor, Avatar, Box, Button, Card, Checkbox, Group, Select, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { motion } from 'framer-motion'
import { IconSearch } from '@tabler/icons-react'
import axios from 'axios'
import { useState, useEffect } from 'react'

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
  dni: string | null;
  email: string | null;
  phone: string;
}

interface ICouponForm {
  nextStep(): void;
  prevStep(): void;
}

function CouponForm({ nextStep, prevStep }: ICouponForm) {
  const [isUserExists, setIsUserExists] = useState<boolean>(true)
  const [userData, setUserData] = useState<IUser | null>(null)
  const [oldPhone, setOldPhone] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const emailRegex = /^[a-zA-Z0-9_+\-.]+@[a-z\d\-.]+\.[a-z]+$/i
  const prefixRegex = /^\+\d{1,4}$/
  const phoneRegex = /^\(\d{1,4}\) \d{3}-\d{4}$/

  const verifyUser = (phone: string) => {
    setUserData(null)
    setIsUserExists(true)
    axios.get('https://api.rifa-max.com/x100/clients', {
      params: {
        phone: phone
      }
    }).then(response => {
      console.log(response.data)
      setUserData(response.data)
    }).catch(error => {
      console.log(error)
      setUserData(null)
    })
  }

  const submit = (values: IForm) => {
    setIsError(false)
    axios.post('https://api.rifa-max.com/x100/clients', {
      x100_client: {
        name: values.name + ' ' + values.lastName,
        // email: values.email,
        // phone: values.prefix + ' ' + values.phone,
        // pv: false,
        // is_integration: false
      }
    }).then(() => {
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
      name: (value: string) => (value.length < 4 ? 'El nombre es demasiado corto' : null),
      lastName: (value: string) => (value.length < 4 ? 'El apellido es demasiado corto' : null),
      email: (value: string) => (!emailRegex.test(value) ? 'Correo electrónico no válido' : null),
      prefix: (value: string) => (!prefixRegex.test(value) ? 'Ingrese un prefijo válido' : null),
      direction: (value: string) => (value.length < 16 ? 'Direccion invalida' : null),
      phone: (value: string) => (!phoneRegex.test(value) ? 'Ingrese un número de teléfono válido' : null),
      city: (value: string) => (value.length < 3 ? 'Ciudad invalida' : null),
      zip_code: (value: string | number) => (value.toString().length < 4 ? 'Código postal invalido' : null),
      termsOfService: (value: boolean) => (!value ? 'Debe aceptar los términos y condiciones' : null)
    }
  })

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
        Ingrese sus datos
      </Text>
      <Group w="100%" spacing={5}>
        <Select
          label="Prefijo"
          placeholder="Prefijo"
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
          label="Teléfono"
          w='calc(100% - 130px)'
          size="xs"
          placeholder="Telefono"
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
                label="Nombre"
                w='calc(50% - 5px)'
                size="xs"
                placeholder="Nombre"
                error={form.errors.name}
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Apellido"
                w='calc(50% - 5px)'
                size="xs"
                placeholder="Apellido"
                error={form.errors.lastName}
                {...form.getInputProps('lastName')}
              />
            </Group>
            <TextInput
              label="Correo"
              w='100%'
              mt={10}
              size="xs"
              placeholder="Correo"
              error={form.errors.email}
              {...form.getInputProps('email')}
            />
            <Select
              data={[
                {
                  value: 'USA', label: 'Estados Unidos'
                },
                {
                  value: 'Venezuela', label: 'Venezuela'
                },
                {
                  value: 'Colombia', label: 'Colombia'
                }
              ]}
              size="xs"
              mt={10}
              placeholder='Estados Unidos'
              label="País de residencia"
              error={form.errors.country}
              {...form.getInputProps('country')}
            />
            <Textarea
              mt={10}
              label="Dirección"
              placeholder='Main Street Duluth'
              size="xs"
              error={form.errors.direction}
              {...form.getInputProps('direction')}
            />
            <Group spacing={10} mt={10}>
              <TextInput
                label="Provincia"
                w='calc(50% - 5px)'
                size="xs"
                placeholder="Georgia"
                error={form.errors.city}
                {...form.getInputProps('city')}
              />
              <TextInput
                label="Código postal"
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
                label="Acepto los términos y condiciones"
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
                Anterior
              </Button>
              <Button
                type="submit"
                color="blue"
                size="xs"
              >
                Siguiente
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
            <Card ta="center" w="100%" mt={15}>
              <Text c="dimmed" mb={-7} fz={10} fw={300}>
                ¿No son tus datos?
              </Text>
              <Anchor fz={10} fw={300} onClick={() => setUserData(null)}>
                Presiona aquí para cambiarlos
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
            </Card>
            <Group spacing={5} mt={10} position="center">
              <Button size="xs" onClick={() => prevStep()}>Anterior</Button>
              <Button size="xs" onClick={() => nextStep()}>Siguiente</Button>
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