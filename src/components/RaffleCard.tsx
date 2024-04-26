import Layout from "../Layout";
import { Card, Text, createStyles } from "@mantine/core";

interface IRaffleCard {
  data: {
    id: number;
    background?: string;
    title?: string;
    countDown?: {
      startTime: string;
      endTime: string;
    }
  }
}

function RaffleCard({ data }: IRaffleCard) {
  const useStyles = createStyles(() => ({
    raffleCard: {
      width: '100%',
      height: 600,
    },
    wrapper: {
      width: '90%'
    },
    background: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    title: {
      textAlign: 'center',
      fontWeight: 700,
      fontSize: 35,
      zIndex: 100,
    }
  }))

  const { classes } = useStyles();

  return (
    <Layout>
      <Card key={data.id} radius='md' className={classes.raffleCard}>
        <Text className={classes.title}>{data.title}</Text>
        {data.background && (
          <img
            className={classes.background}
            src={data.background}
            alt={data.title}
          />
        )}
      </Card>
    </Layout>
  )
}

export default RaffleCard