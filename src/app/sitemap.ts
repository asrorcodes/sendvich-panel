import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          uz: `${siteConfig.url}/uz`,
          ru: `${siteConfig.url}/ru`,
          en: `${siteConfig.url}/en`,
        },
      },
    });

    for (const slug of siteConfig.productSlugs) {
      entries.push({
        url: `${siteConfig.url}/${locale}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            uz: `${siteConfig.url}/uz/${slug}`,
            ru: `${siteConfig.url}/ru/${slug}`,
            en: `${siteConfig.url}/en/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
