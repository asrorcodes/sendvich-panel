export const siteConfig = {
  name: "Europanel",
  legalName: "EUROPANEL INDUSTRIES MChJ QK",
  url: "https://europanel.uz",
  phone: "+998950052221",
  phoneDisplay: "+998 95 005 22 21",
  email: "europanel.uz@gmail.com",
  whatsapp: "https://wa.me/998950052221",
  colors: {
    primary: "#102961",
    accent: "#EA5B2B",
    white: "#FFFFFF",
  },
  productSlugs: [
    "devor-paneli",
    "tom-paneli",
    "z-lock",
    "sovuq-ombor",
    "tovuqxona-paneli",
  ] as const,
  datasheetSlugs: ["devor-paneli", "tom-paneli", "z-lock"] as const,
  ralSwatches: [
    { code: "RAL 9003", hex: "#F4F4F4" },
    { code: "RAL 7004", hex: "#9B9B9B" },
    { code: "RAL 7024", hex: "#474A50" },
    { code: "RAL 5005", hex: "#1E5AA8" },
    { code: "RAL 5002", hex: "#00387B" },
    { code: "RAL 6005", hex: "#0F4336" },
    { code: "RAL 3005", hex: "#5E2028" },
    { code: "RAL 1015", hex: "#E6D2B5" },
    { code: "RAL 8017", hex: "#44322D" },
    { code: "RAL 9006", hex: "#A5A8A6" },
  ],
} as const;

export type ProductSlug = (typeof siteConfig.productSlugs)[number];
