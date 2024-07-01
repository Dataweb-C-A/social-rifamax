import { useUser } from '../../hooks/useUser';
import UploadProfile from '../../components/UploadProfile';
import { Button, Card, PasswordInput, Text, TextInput } from '@mantine/core';
import axios from 'axios';
import { t } from 'i18next';
import { useEffect, useState } from 'react'
import { useDebouncedState } from '@mantine/hooks';
import { IconAt, IconLock, IconLockCheck, IconX } from '@tabler/icons-react';
import useAuth from '../../hooks/useAuth';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

interface IEditProfileModal {
  onClose: () => void;
  onEdit: () => void;
}

interface IUpdateForm {
  password: string;
  password_confirmation: string;
  content_code: string;
}

function EditProfileModal({
  onClose,
  onEdit
}: IEditProfileModal) {
  const { updateNoToken, user } = useUser();
  const { token } = useAuth();

  const [firstContentCode, setFirstContentCode] = useDebouncedState<string>(user?.content_code || '', 700);
  const [isValidContentCode, setIsValidContentCode] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(true)
  const [submitClick, setSubmitClicked] = useState<boolean>(false)

  const form: any = useForm<IUpdateForm>({
    initialValues: {
      password: '',
      password_confirmation: '',
      content_code: firstContentCode
    },
    validate: {
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters long' : null),
      password_confirmation: (value) => (value !== form.values.password ? 'Passwords do not match' : null),
      content_code: () => (firstContentCode.length < 3 ? 'Invalid content code' : null)
    }
  })

  const submit = () => {
    setSubmitClicked(true)
    axios.put('http://localhost:3000/shared/users/welcome', {
      shared_user: {
        password: form.values.password,
        password_confirmation: form.values.password_confirmation,
        content_code: form.values.content_code
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      updateNoToken({ user: res.data })
    }).catch(() => {
      setSubmitClicked(false)
      notifications.show({
        autoClose: 5000,
        title: <Text c="white" fw={700} fz={17} italic>{t('alert')}</Text>,
        message: <Text c="white" fz={15}>{t('errorInfluencer')}</Text>,
        icon: <IconX size={20} />,
        color: "red",
        loading: false,
        withCloseButton: true,
        className: "my-notification-class",
        style: { backgroundColor: "red", height: '100px' },
        sx: { backgroundColor: "red" },
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.blue[6],

            '&::before': { backgroundColor: theme.white },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
    })
  }

  useEffect(() => {
    if (firstContentCode.length > 3) {
      setIsValidContentCode(false)
      axios.get(`http://localhost:3000/social/influencers?content_code=${firstContentCode}`)
        .then((res) => {
          if (res.data.id === user?.id) {
            setIsValidContentCode(true)
          } else {
            setIsValidContentCode(false)
          }
          setIsValidating(false)
        })
        .catch(() => {
          setIsValidContentCode(true)
          setIsValidating(false)
        })
    }
  }, [firstContentCode])

  return (
    <>
      <Card
        pb={5}
        mt={10}
      >
        <UploadProfile />
        <form>
          <PasswordInput
            mb={5}
            label={t('password')}
            placeholder={t('password')}
            error={form.errors.password}
            icon={<IconLock size='1.5rem' />}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mb={5}
            label={t('passwordConfirmation')}
            placeholder={t('passwordConfirmation')}
            icon={<IconLockCheck size='1.5rem' />}
            error={form.errors.password_confirmation}
            {...form.getInputProps('password_confirmation')}
          />
          <TextInput
            label={t('contentCode')}
            placeholder={t('contentCode')}
            value={firstContentCode}
            icon={<IconAt size="1.3rem" />}
            onChange={(event) => setFirstContentCode(event.currentTarget.value)}
          />
          {
            firstContentCode.length > 2 && (
              <Text
                mt={5}
                mb={10}
                fz={14}
                ta="center"
                color={isValidContentCode ? 'green' : isValidating ? 'blue' : 'red'}
              >
                {
                  isValidating ? t('validating') : isValidContentCode ? t('contentCodeValid') : t('contentCodeInvalid')
                }
              </Text>
            )
          }
          <Button
            mt={10}
            variant="light"
            size="xs"
            onClick={submit}
            disabled={!form.isValid() || !isValidContentCode || submitClick}
            fullWidth
          >
            {t('finish')}
          </Button>
        </form>
      </Card>
    </>
  )
}

export default EditProfileModal