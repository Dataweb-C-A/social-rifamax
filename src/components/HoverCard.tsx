import { Text, Card, createStyles } from "@mantine/core";

interface IHoverCard {
  image?: string;
  title?: string;
  description?: string;
  button?: string;
  onClick?: () => void;
}

const useStyles = createStyles((theme) => ({
  image: {
    width: '100%',
    height: '150px',
    overflow: 'hidden',
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  hoverCard: {
    boxShadow: theme.shadows.xs,
    marginBottom: 10,
    width: '100%',
    padding: '0!important',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    cursor: 'pointer',
    "&:hover": {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      transitionDuration: '0.6s',
      transitionProperty: 'all'
    },
    '@media (max-width: 1100px)': {
      height: '100%',
      width: '100%',
    }
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  mark: {
    width: 30,
    height: 165,
    background: theme.colors.blue[4],
    zIndex: 2
  },
  contentWrapper: {
    flexDirection: 'row',
    width: 'calc(100% - 30)'
  },
  contentSection: {
    width: '50%',
    height: '100%',
    padding: '10px 0 10px 20px'
  },
  titleContent: {
    fontSize: 13,
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[6],
    userSelect: 'none',
  },
  summaryContent: {
    fontSize: 14,
    fontWeight: 500,
    userSelect: 'none',
    marginBottom: '10px',
    ":last-child": {
      marginBottom: 0
    }
  }
}))

function HoverCard({
  // image,
  // title,
  // description,
  // button
  onClick
}: IHoverCard) {
  const { classes } = useStyles()

  return (
    <Card
      className={classes.hoverCard}
      withBorder
      onClick={onClick}
    >
      <div className={classes.wrapper}>
        <div className={classes.mark}>
        </div>
        <div className={classes.contentSection}>
          <Text className={classes.titleContent}>RIFA</Text>
          <Text className={classes.summaryContent}>4RUNNER + UNA MOTO</Text>
          <Text className={classes.titleContent}>TIPO</Text>
          <Text className={classes.summaryContent}>1000 NÚMEROS</Text>
          <Text className={classes.titleContent}>FECHA</Text>
          <Text className={classes.summaryContent}>27/03/2024</Text>
        </div>
      </div>
    </Card >
  )
}

export default HoverCard