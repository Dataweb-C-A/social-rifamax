import { useChangeTheme } from "../hooks/useChangeTheme";
import { Switch, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

function ThemeSwitcher() {
  const { toggleTheme } = useChangeTheme();
  const theme = useMantineTheme()

  return (
    <div>
      <Switch
        size="lg"
        mt={4}
        onChange={toggleTheme}
        color={theme.colorScheme === 'dark' ? 'gray' : 'light'}
        onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
        offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
      />
    </div>
  )
}

export default ThemeSwitcher