import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { getDatasheet, getProducts, type Product } from "@/lib/content";
import { PanelWall } from "@/components/PanelWall";
import { PanelDatasheet } from "@/components/PanelDatasheet";

export async function ProductView({ product }: { product: Product }) {
  const t = await getTranslations("productPage");
  const tp = await getTranslations("products");
  const products = await getProducts();
  const others = products.filter((p) => p.slug !== product.slug);
  const datasheet = await getDatasheet(product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: datasheet?.subtitle ?? product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "thickness", value: product.thickness },
      { "@type": "PropertyValue", name: "width", value: product.width },
      { "@type": "PropertyValue", name: "core", value: product.core },
      { "@type": "PropertyValue", name: "use", value: product.use },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <section className="relative overflow-hidden pt-20 pb-10 text-white sm:pt-28 sm:pb-20">
        <PanelWall className="opacity-90" />
        <div className="container-site relative">
          <p className="eyebrow text-white/45">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] font-semibold leading-tight tracking-wide sm:text-5xl md:text-6xl">
            {datasheet?.title ?? product.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-lg">
            {datasheet?.subtitle ?? product.description}
          </p>
          {datasheet && (
            <p className="mt-3 text-sm font-medium text-accent">{datasheet.profile}</p>
          )}
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn btn-primary btn-block mt-7 sm:mt-8"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </section>

      {datasheet ? (
        <PanelDatasheet data={datasheet} />
      ) : (
        <section className="section-pad">
          <div className="container-site">
            <dl className="spec-stack">
              <div>
                <dt className="eyebrow text-ink-muted/55">{tp("thickness")}</dt>
                <dd className="font-display text-xl font-semibold text-ink">
                  {product.thickness}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-muted/55">Width</dt>
                <dd className="font-display text-xl font-semibold text-ink">
                  {product.width}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-muted/55">{tp("core")}</dt>
                <dd className="font-display text-xl font-semibold text-ink">
                  {product.core}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-ink-muted/55">Use</dt>
                <dd className="font-display text-xl font-semibold text-ink">
                  {product.use}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-surface py-10 sm:py-14">
        <div className="container-site">
          <p className="eyebrow text-ink-muted/70">{t("continue")}</p>
          <h2 className="mt-3 font-display text-lg font-semibold tracking-wide text-steel sm:text-xl">
            {t("otherProducts")}
          </h2>
          <ul className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="text-sm font-semibold text-accent"
                >
                  {p.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
