import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProducts } from "@/lib/content";

export async function Products() {
  const t = await getTranslations("products");
  const products = await getProducts();

  return (
    <section id="mahsulotlar" className="panel-ribs section-pad scroll-mt-20 sm:scroll-mt-24">
      <div className="container-site">
        <p className="eyebrow text-ink-muted/70">{t("eyebrow")}</p>
        <h2 className="mt-2 font-display text-[1.75rem] font-semibold tracking-wide text-steel sm:mt-3 sm:text-4xl md:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-xl text-sm text-ink-muted sm:text-base">{t("lead")}</p>

        <ul className="mt-8 divide-y divide-line border-y border-line sm:mt-14">
          {products.map((product, index) => (
            <li key={product.slug}>
              <Link
                href={`/${product.slug}`}
                className="group grid gap-3 py-6 sm:grid-cols-[auto_1.3fr_1fr_auto] sm:items-center sm:gap-5 sm:py-9"
              >
                <div className="flex items-baseline justify-between gap-3 sm:contents">
                  <span className="font-display text-sm font-semibold tracking-[0.14em] text-ink-muted/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-accent sm:hidden">
                    {t("details")}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold tracking-wide text-steel transition-colors group-hover:text-accent sm:text-3xl">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:max-w-md sm:text-base">
                    {product.description}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm sm:border-0 sm:pt-0 sm:gap-4">
                  <div>
                    <dt className="eyebrow text-ink-muted/55">{t("thickness")}</dt>
                    <dd className="mt-1 font-medium text-ink sm:mt-1.5">{product.thickness}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-muted/55">{t("core")}</dt>
                    <dd className="mt-1 font-medium text-ink sm:mt-1.5">{product.core}</dd>
                  </div>
                </dl>

                <span className="hidden text-sm font-semibold text-accent transition-transform group-hover:translate-x-1 sm:inline">
                  {t("details")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
