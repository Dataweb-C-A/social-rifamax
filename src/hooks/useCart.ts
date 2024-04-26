import { useDispatch } from "react-redux";
import { setThemeMode } from "../store/reducers/themeSlice";

export function useChangeTheme() {
  const dispatch = useDispatch();

  const setTheme = (theme: "light" | "dark") => {
    dispatch(setThemeMode(theme));
  };

  const toggleTheme = () => {
    setTheme(
      (localStorage.getItem("theme") as "light" | "dark") === "light"
        ? "dark"
        : "light"
    );
  };

  return { setTheme, toggleTheme };
}