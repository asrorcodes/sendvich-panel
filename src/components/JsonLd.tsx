import { getTranslations, getLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site";
import { getProducts } from "@/lib/content";

export async function JsonLd() {
  const locale = await getLocale();
  const ts = await getTranslations("site");
  const products = await getProducts();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: `${siteConfig.url}/${locale}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ts("street"),
      addressLocality: ts("city"),
      addressRegion: ts("region"),
      addressCountry: "UZ",
    },
    description: ts("description"),
    slogan: ts("tagline"),
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}/og.svg`,
    url: `${siteConfig.url}/${locale}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    openingHours: "Mo-Sa 08:00-18:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: ts("street"),
      addressLocality: ts("city"),
      addressRegion: ts("region"),
      addressCountry: "UZ",
    },
    areaServed: (ts.raw("deliveryRegions") as string[]).map((name) => ({
      "@type": "Place",
      name,
    })),
    description: ts("description"),
  };

  const productList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        description: product.description,
        url: `${siteConfig.url}/${locale}/${product.slug}`,
        brand: { "@type": "Brand", name: siteConfig.name },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productList) }}
      />
    </>
  );
}
