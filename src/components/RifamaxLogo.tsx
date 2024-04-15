import { Image, createStyles } from "@mantine/core";
import { RootState } from "../store";
import { useSelector } from "react-redux";

interface IRifamaxLogo {
  size?: number;
  force?: 'dark' | 'light'
}

function RifamaxLogo({ size, force }: IRifamaxLogo) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const useStyles = createStyles(() => ({
    logo: {
      width: size ? `${size}px !important` : '120px !important',
      height: size ? `${size}px !important` : '120px !important',
      marginTop: '27px',
    },
  }));

  const { classes } = useStyles();

  return (
    <Image
      className={classes.logo}
      src={`/rifamax_to_${force ? force : mode.toLowerCase()}.png`}
      alt={`logo rifamax ${force ? force : mode.toLowerCase()}`}
    />
  )
}

export default RifamaxLogo