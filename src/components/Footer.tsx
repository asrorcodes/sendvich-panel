import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { getProducts } from "@/lib/content";

export async function Footer() {
  const t = await getTranslations("footer");
  const ts = await getTranslations("site");
  const products = await getProducts();

  return (
    <footer className="bg-steel pb-[env(safe-area-inset-bottom)] text-white">
      <div className="container-site grid gap-10 py-12 sm:gap-12 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold tracking-[0.1em] sm:text-2xl">
            {siteConfig.name.toUpperCase()}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60 sm:mt-4">
            {ts("tagline")} {siteConfig.legalName}.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
            {ts("addressFull")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          <div>
            <p className="eyebrow text-white/35">{t("products")}</p>
            <ul className="mt-4 space-y-2.5 sm:mt-5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {p.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/35">{t("contact")}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75 sm:mt-5">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="break-all">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>{ts("workHours")}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {t("rights")}
          </p>
          <p>{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
