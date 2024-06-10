import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/reducers/languageSlice";
import { RootState } from "@/store";
import i18n from "i18next";

export function useLanguage() {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.language);

  const currentLanguage = () => {
    return selector.language;
  }

  const currentExchange = () => {
    return `${selector.language}-${selector.country}`
  }

  const changeLanguage = (lang: "en" | "es") => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };


  return { currentLanguage, currentExchange, changeLanguage };
}
