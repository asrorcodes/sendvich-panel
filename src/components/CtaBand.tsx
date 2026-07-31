import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";

export async function CtaBand() {
  const t = await getTranslations("cta");

  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="border-y border-line py-10 sm:py-16">
          <p className="eyebrow text-ink-muted/70">{t("eyebrow")}</p>
          <h2 className="mt-2 max-w-2xl font-display text-[1.75rem] font-semibold tracking-wide text-steel sm:mt-3 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-ink-muted sm:text-base">{t("lead")}</p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a href={`tel:${siteConfig.phone}`} className="btn btn-primary btn-block">
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-block"
            >
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
