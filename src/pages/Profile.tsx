import { Avatar, Card, Grid } from "@mantine/core"
import { initials } from "../utils/initials"
import Layout from "../Layout"
import { useUser } from "../hooks/useUser"

function Profile() {
  const { user } = useUser();

  return (
    <Layout noOverlap width="1200px">
      <Grid columns={12} mx={5}>
        <Grid.Col xs={12} md={4} mt={10}>
          <Card shadow="xs" padding="md" radius="md" style={{ height: '100%' }}>
            <Avatar size={300} radius="xl">
              {initials(user?.name ?? '')}
            </Avatar>
          </Card>
        </Grid.Col>
        <Grid.Col xs={12} md={8} mt={10}>
          <Card shadow="xs" padding="md" radius="md" style={{ height: '100%' }}>
            <h1>Profile</h1>
          </Card>
        </Grid.Col>
        <Grid.Col span={12} mt={10}>
          <Card shadow="xs" padding="md" radius="md" style={{ height: '100%' }}>
            <h1>Profile</h1>
          </Card>
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default Profile