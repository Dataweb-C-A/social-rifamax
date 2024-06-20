import {
  Group,
  Select,
  TextInput,
  Textarea,
  Button
} from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useForm } from "@mantine/form"
import axios from 'axios'
import { useState } from "react";
import { useAddress } from "../../../hooks/useAddress";

interface IAddressFrom {
  user_id: number;
  onCancel: () => void;
  onAccept: () => void;
}

interface IForm {
  country: string;
  address: string;
  province: string;
  zip_code: string;
}

function AddressForm({ onCancel, onAccept, user_id }: IAddressFrom) {
  const [isBlocked, setIsBlocked] = useState<boolean>(false)

  const { changeAddress } = useAddress()

  const { t } = useTranslation()

  const form = useForm<IForm>({
    initialValues: {
      country: 'USA',
      address: '',
      province: '',
      zip_code: ''
    },
    validate: {
      address: (value: string) => (value.length < 16 ? t('invalidAddress') : null),
      province: (value: string) => (value.length < 3 ? t('invalidCity') : null),
      zip_code: (value: string | number) => (value.toString().length < 4 ? t('invalidPostalCode') : null),
    }
  })

  const onSubmit = () => {
    setIsBlocked(true)
    axios.put('http://localhost:3000/social/clients/change_address', {
      social_client: {
        id: user_id,
        address: form.values.address,
        province: form.values.province,
        zip_code: form.values.zip_code,
        country: form.values.country
      }
    }).then(() => {
      changeAddress({ data: form.values })
      onAccept()
      setIsBlocked(false)
    }).catch(() => {
      setIsBlocked(false)
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Select
        data={[
          { value: 'USA', label: 'Estados Unidos' },
          { value: 'Venezuela', label: 'Venezuela' },
          { value: 'Colombia', label: 'Colombia' }
        ]}
        size="xs"
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
        error={form.errors.address}
        {...form.getInputProps('address')}
      />
      <Group spacing={10} mt={10}>
        <TextInput
          label={t('province')}
          w='calc(50% - 5px)'
          size="xs"
          placeholder="Georgia"
          error={form.errors.province}
          {...form.getInputProps('province')}
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
      <Group mt={15} position='center'>
        <Button
          color="red"
          size="xs"
          onClick={onCancel}
          disabled={isBlocked}
        >
          {t('back')}
        </Button>
        <Button
          color="blue"
          size="xs"
          disabled={!form.isValid() || isBlocked}
          type="submit"
        >
          {t('finish')}
        </Button>
      </Group>
    </form>
  )
}

export default AddressForm