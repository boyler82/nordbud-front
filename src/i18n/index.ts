import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./pl.json";
import en from "./en.json";
import no from "./no.json";

const saved = localStorage.getItem("lang");
const browser = navigator.language?.slice(0,2).toLowerCase();
const initial = (saved || (["pl","en","no"].includes(browser) ? browser : "pl")) as "pl"|"en"|"no";

i18n
  .use(initReactI18next)
  .init({
    resources: { pl: { translation: pl }, en: { translation: en }, no: { translation: no } },
    lng: initial,
    fallbackLng: "no",
    interpolation: { escapeValue: false }
  });

export default i18n;
export function setLang(lng: "pl"|"en"|"no") {
  i18n.changeLanguage(lng);
  localStorage.setItem("lang", lng);
}
