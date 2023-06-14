import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en, vi } from "./languages";
import languageKeys from "./languageKeys";

const languages = {
  tieng_viet: "vi",
  tieng_anh: "en",
};

const resources = {
  [languages.tieng_anh]: {
    translation: en,
  },
  [languages.tieng_viet]: {
    translation: vi,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: resources,
    fallbackLng: languages.tieng_viet,
    detection: {
      order: ["localStorage"],
    },
  });

export { languages, languageKeys, i18n as default };
