import { createI18n } from "vue-i18n";

import en from "../locales/en.json";

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: "en",
  messages: {
    en,
  },
});
