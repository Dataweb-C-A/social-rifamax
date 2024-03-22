import { useChangeTheme } from "../hooks/useChangeTheme"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Switch } from "@mantine/core";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  switch: {
    marginTop: theme.spacing.xl,
    '&:checked': {
      background: 'red'
    }
  },
}));

function ThemeSwitcher() {
  const { toggleTheme } = useChangeTheme();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const { classes } = useStyles();

  return (
    <div>
      <Switch
        className={classes.switch}
        checked={mode === "light"}
        onChange={toggleTheme}
        size="xl"
      />
    </div>
  )
}

export default ThemeSwitcher