import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import { getProduct } from "@/lib/content";
import { ProductView } from "@/components/ProductView";

type Props = {
  params: Promise<{ locale: string }>;
  slug: string;
};

export async function generateProductMetadata({
  params,
  slug,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const product = await getProduct(slug, locale);
  if (!product) return {};

  const canonical = `${siteConfig.url}/${locale}/${slug}`;
  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical,
      languages: {
        uz: `${siteConfig.url}/uz/${slug}`,
        ru: `${siteConfig.url}/ru/${slug}`,
        en: `${siteConfig.url}/en/${slug}`,
        "x-default": `${siteConfig.url}/uz/${slug}`,
      },
    },
  };
}

export async function ProductPage({ params, slug }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const product = await getProduct(slug, locale);
  if (!product) notFound();

  return <ProductView product={product} />;
}
