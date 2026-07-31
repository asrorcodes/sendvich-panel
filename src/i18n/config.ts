export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";
export const localeNames: Record<Locale, string> = {
  uz: "O‘zbek",
  ru: "Русский",
  en: "English",
};
export const htmlLang: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "en",
};
export const ogLocale: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};
