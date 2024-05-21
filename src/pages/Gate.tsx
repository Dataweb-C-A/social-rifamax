import { Anchor, createStyles, Button, Card, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Layout from "../Layout"
import PublicNavbar from "../components/PublicNavbar"
import GateTicket from '../components/GateTicket';

const useStyles = createStyles((theme) => ({
  returnButton: {
    marginTop: 5,
    padding: 10
  },
  mainCard: {
    margin: '5px 5px 0 5px',
    height: 'calc(100vh - 85px)',
    boxShadow: `0 1px 0 0 ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    background: `${theme.colorScheme === 'dark' ? '#1A1B1E' : '#fff'}`,
    border: `0.0625rem solid ${theme.colorScheme === 'dark' ? 'transparent' : '#dee2e6'}`,
  },
  wrapper: {
    display: 'flex',
    height: '100%'
  },
  gateGroup: {
    width: '70%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '5px'
  }
}))

function Gate() {
  const { classes } = useStyles()

  const navigate = useNavigate()

  return (
    <>
      <PublicNavbar />
      <Layout noOverlap>
        <Card className={classes.mainCard} radius="xs">
          <div className={classes.wrapper}>
            <div className={classes.gateGroup}>
              {
                Array(100).fill(0).map((item: number) => {
                  return (
                    <GateTicket status="sold" value={1} />
                  )
                })
              }
            </div>
          </div>
        </Card>
      </Layout>
    </>
  )
}

export default Gate