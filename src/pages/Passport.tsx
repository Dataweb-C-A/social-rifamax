import { Loader } from "@mantine/core"
import Layout from "../Layout"

function Passport() {
  return (
    <Layout full>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <Loader size="xl" />
      </div>
    </Layout>
  )
}

export default Passport