import { Avatar, Card, Group, Text, createStyles } from "@mantine/core"
import { IconStarsOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next"

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    padding: '0 15px'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    padding: '0 10px'
  }
}))

function influencerError() {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Card shadow='xl' w="100%" radius='sm' withBorder py={30}>
            <Group position="center" mb={20}>
              <Avatar size="xl" radius="xl" color="yellow">
                <IconStarsOff size={40} stroke={1.1} />
              </Avatar>
            </Group>
            <Text
              italic
              fw={700}
              ta="center"
              fz={16}
            >
              {t('errorInfluencer')}
            </Text>
            <Text
              mt={10}
              fz={13}
              ta="center"
            >
              {t('errorInfluencerDesc')}
            </Text>
          </Card>
        </div>
      </div>
    </>
  )
}

export default influencerError