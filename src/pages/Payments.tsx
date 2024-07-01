import { useTranslation } from 'react-i18next';
import { Group, SegmentedControl, Title, createStyles } from "@mantine/core"
import Layout from "../Layout"
import { motion } from 'framer-motion'
import { useState } from "react"
import PaymentsHistory from "../components/PaymentsHistory"
import PaymentsPendings from "../components/PaymentsPendings"
 
function Payments() {
  const { t } = useTranslation();
  const [Tab, setTab] = useState<string>('pendings')

  const useStyles = createStyles((theme) => ({
    spaceContainer: {
      display: 'flex',
      width: 'calc(100% - 10px)',
      height: 'calc(100vh - 85px)',
      margin: '5px',
      overflow: 'hidden'
    },
    spaceCard: {
      width: '100%',
      borderRadius: '25px 25px 0 0',
      border: `0.0625rem solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : '#dee2e6'}`,
      borderBottom: 'none',
      marginTop: '12px',
      height: '100%',
      bottom: 0,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    }
  }))

  const { classes } = useStyles();

  return (
    <Layout noOverlap>
      <div className={classes.spaceContainer}>
        <motion.div
          className={classes.spaceCard}
        >
          <Title
            order={3}
            w="100%"
            m={10}
          >
            {t('paymentsTitle')}
          </Title>
          <Group position="center" mt={10}>
            <SegmentedControl
              value={Tab}
              onChange={(value) => setTab(value)}
              data={[
                {
                  label: t('pendingSegment'),
                  value: 'pendings'
                },
                {
                  label: t('historySegment'),
                  value: 'history'
                }
              ]}
            />
          </Group>
          {
            Tab === 'history' 
              ? <PaymentsHistory /> 
              : <PaymentsPendings /> 
          }
        </motion.div>
      </div>
    </Layout>
  )
}

export default Payments