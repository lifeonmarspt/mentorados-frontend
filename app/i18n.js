import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";

import pt from "translations/pt.yml";
import en from "translations/en.yml";

i18n
  .use(LngDetector)
  .init({
    fallbackLng: "pt",
    resources: {
      pt,
      en,
    },
    interpolation: {
      escapeValue: false, // React takes care of that for us
    },
    detection: {
      order: [ "querystring", "localStorage", "navigator" ],
      lookupQuerystring: "lng",
      lookupLocalStorage: "i18nLng",
      caches: ["localStorage"],
    },
  });

export default i18n;
