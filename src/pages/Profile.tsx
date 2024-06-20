import { Avatar, Card, Grid, Group, Divider, Checkbox, Title } from "@mantine/core"
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
            <Group position="center">

              <Avatar size={300} radius="xl">
                {initials(user?.name ?? '')}
              </Avatar>
              <div>
                <Title order={2}>Angela Zambrano</Title>

              </div>
            </Group>
            <Group position="center" >

              <Title order={5}>Influencer </Title>

            </Group>
            <Divider my="sm" variant="dashed" />
            <Group position="center" >

              <Title order={3} mb={15}>Mis metodos de pago</Title>
            </Group>

            <Group position="center" mb={10} >


              <Title order={5}>Zelle</Title>
              <Checkbox
                labelPosition="left"
                color="cyan"
                size="lg"
              />
            </Group>

            <Group position="center" mb={10} ml={-47}>


              <Title order={5}>Pago movil</Title>
              <Checkbox
                labelPosition="left"
                color="cyan"
                size="lg"
              />
            </Group>
            <Group position="center" ml={-5}>


              <Title order={5}>Stripe</Title>
              <Checkbox
                labelPosition="left"
                color="cyan"
                size="lg"
              />
            </Group>
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