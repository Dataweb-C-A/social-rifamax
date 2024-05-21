import RaffleHero from "../components/RaffleHero"
import Layout from "../Layout"
import PublicNavbar from "../components/PublicNavbar"
import { Grid } from "@mantine/core"

function Raffles() {
  return (
    <>
      <PublicNavbar />
      <Layout noOverlap>
        <RaffleHero 
          data={[
            {
              id: 1,
              image: 'https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492',
              title: 'Toyota 4Runner 2023',
              tickets_count: 100,
              draw_type: 'Fecha limite',
              init_date: '2022-10-10'
            },
            {
              id: 2,
              image: 'https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492',
              title: 'Toyota 4Runner 2023',
              tickets_count: 1000,
              draw_type: 'Fecha limite',
              init_date: '2022-10-10'
            },
          ]}
        />
      </Layout>
    </>
  )
}

export default Raffles