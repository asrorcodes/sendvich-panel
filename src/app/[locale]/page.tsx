import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ogLocale } from "@/i18n/config";
import { siteConfig, ogImage } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Advantages } from "@/components/Advantages";
import { Factory } from "@/components/Factory";
import { Comparison } from "@/components/Comparison";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const canonical = `${siteConfig.url}/${locale}`;

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        uz: `${siteConfig.url}/uz`,
        ru: `${siteConfig.url}/ru`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/uz`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale as keyof typeof ogLocale],
      url: canonical,
      siteName: siteConfig.name,
      title: t("titleDefault"),
      description: t("description"),
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
          type: ogImage.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("description"),
      images: [ogImage.url],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Products />
      <Advantages />
      <Factory />
      <Comparison />
      <FAQ />
      <CtaBand />
    </>
  );
}
