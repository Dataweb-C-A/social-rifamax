import { useEffect, useState } from "react";
import { Avatar, Button, FileButton, Group, Image } from "@mantine/core"
import { useTranslation } from "react-i18next";
import { initials } from "../utils/initials";
import { useUser } from "../hooks/useUser";
import useAuth from "../hooks/useAuth";
import axios from "axios";

function UploadProfile() {
  const [file, setFile] = useState<File | null>(null);

  const { user, updateNoToken } = useUser();
  const { token } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (file) {
      axios.post('http://localhost:3000/shared/users/avatar', {
        shared_user: {
          avatar: file
        }
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }).then((res) => {
        updateNoToken({ user: res.data })
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [file])

  return (
    <>
      <Group position='center'>
        <Avatar size="160px" color='blue' radius="sm" style={{ borderRadius: '5px 5px 0 0' }}>
          {
            user?.avatar ? <Image src={user?.avatar} alt="profile_pic" /> : initials(user?.name || '')
          }
        </Avatar>
      </Group>
      <Group position='center' mb={10}>
        <FileButton onChange={setFile} accept="image/png,image/jpeg,image/webp">
          {
            (props) =>
              <Button style={{ borderRadius: '0 0 5px 5px' }} w="160px" size='xs' {...props}>
                {t('uploadProfilePic')}
              </Button>
          }
        </FileButton>
      </Group>
    </>
  )
}

export default UploadProfile