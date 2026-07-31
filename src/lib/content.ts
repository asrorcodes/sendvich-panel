import { getTranslations } from "next-intl/server";
import { siteConfig, type ProductSlug } from "@/lib/site";

export type Product = {
  slug: ProductSlug;
  title: string;
  shortTitle: string;
  description: string;
  thickness: string;
  width: string;
  core: string;
  use: string;
};

export type SpecRow = { label: string; value: string };

export type PanelDatasheetData = {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  profile: string;
  structureNote: string;
  specs: SpecRow[];
  applications: string[];
  highlights: string[];
};

export async function getProducts(locale?: string): Promise<Product[]> {
  const t = locale
    ? await getTranslations({ locale, namespace: "productItems" })
    : await getTranslations("productItems");

  return siteConfig.productSlugs.map((slug) => ({
    slug,
    title: t(`${slug}.title`),
    shortTitle: t(`${slug}.shortTitle`),
    description: t(`${slug}.description`),
    thickness: t(`${slug}.thickness`),
    width: t(`${slug}.width`),
    core: t(`${slug}.core`),
    use: t(`${slug}.use`),
  }));
}

export async function getProduct(
  slug: string,
  locale?: string,
): Promise<Product | undefined> {
  if (!siteConfig.productSlugs.includes(slug as ProductSlug)) return undefined;
  const products = await getProducts(locale);
  return products.find((p) => p.slug === slug);
}

export async function getDatasheet(
  slug: string,
  locale?: string,
): Promise<PanelDatasheetData | undefined> {
  if (
    !siteConfig.datasheetSlugs.includes(
      slug as (typeof siteConfig.datasheetSlugs)[number],
    )
  ) {
    return undefined;
  }

  const t = locale
    ? await getTranslations({ locale, namespace: `datasheets.${slug}` })
    : await getTranslations(`datasheets.${slug}`);

  return {
    slug,
    title: t("title"),
    shortTitle: t("shortTitle"),
    subtitle: t("subtitle"),
    profile: t("profile"),
    structureNote: t("structureNote"),
    specs: t.raw("specs") as SpecRow[],
    applications: t.raw("applications") as string[],
    highlights: t.raw("highlights") as string[],
  };
}
