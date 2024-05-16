import RaffleHero from "../components/RaffleHero"
import Layout from "../Layout"
import PublicNavbar from "../components/PublicNavbar"
import { Grid } from "@mantine/core"

function Raffles() {
  return (
    <>
      <PublicNavbar />
      <Layout noOverlap>
        <Grid w="100%" justify="center" gutter={7} my={5} pl={5}>
          <Grid.Col xs={6} lg={4} xl={3}>
            <RaffleHero />
          </Grid.Col>
          <Grid.Col xs={6} lg={4} xl={3}>
            <RaffleHero />
          </Grid.Col>
        </Grid>
      </Layout>
    </>
  )
}

export default Raffles