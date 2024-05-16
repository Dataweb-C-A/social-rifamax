import { Card, createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  raffleHero: {
    width: '100%',
    height: 400,
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]}`,
    borderRadius: theme.radius.xs,
    padding: "0 !important"
  },
  raffleImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.radius.xs,
    opacity: 0.8,
    backgroundImage: 'linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.5) 50%, rgb(0, 0, 0) 95%)',
  }
}))

interface IRaffleHero {
  image?: string
}

function RaffleHero() {
  const { classes } = useStyles();
  return (
    <Card className={classes.raffleHero}>
      <img 
        className={classes.raffleImage}
        src="https://www.motortrend.com/uploads/2022/05/2023-Toyota-4Runner-40th-Anniversary-Edition-1.jpg?fit=around%7C875:492" 
        alt="4runner" 
      />
    </Card>
  )
}

export default RaffleHero