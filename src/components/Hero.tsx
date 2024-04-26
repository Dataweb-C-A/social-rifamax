import { createStyles } from "@mantine/core";

interface IHero {
  description: string;
  image: string;
  button: string
}

function Hero({ description, image, button }: IHero) {
  const useStyles = createStyles((theme) => ({
    hero: {
      backgroundImage: `url(${image})`,
      backgroundPosition: 'center center',
      backgroundAttachment: 'inherit',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%',
      height: '400px',
      width: '100%',
      borderRadius: theme.radius.md,
      border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`
    }
  }))

  const { classes } = useStyles()

  return (
    <div className={classes.hero}>
      { description }
    </div>
  )
}

export default Hero