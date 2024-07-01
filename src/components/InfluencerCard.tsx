import { useInfluencer } from "../hooks/useInfluencer";
import { Button, Group, Loader, Text, createStyles } from "@mantine/core"

const useStyles = createStyles(() => ({
  influencer: {
    background: 'linear-gradient(45deg, #3b5bdb 0%, #0c8599 100%)',
    color: '#fff',
    padding: '7px 10px',
    fontWeight: 550,
    borderRadius: '4px',
    "&:hover": {
      background: 'linear-gradient(45deg, #3b5bdb 0%, #0c8599 100%)',
      cursor: 'none'
    }
  }
}))

function InfluencerCard() {
  const { classes } = useStyles();

  const { influencer } = useInfluencer();

  return (
    <Button
      className={classes.influencer}
      mt={-12}
    >
      <Text
        fz={12}
        italic
        mt={4}
      >
        {influencer?.name || (
          <Group position="apart">
            <Loader size={20} mt={-4} color='white' />
          </Group>
        )}
      </Text>
    </Button>
  )
}

export default InfluencerCard