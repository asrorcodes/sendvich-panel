import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site";
import type { PanelDatasheetData } from "@/lib/content";
import { PanelCrossSection } from "@/components/PanelCrossSection";

function variantFromSlug(slug: string): "wall" | "roof" | "zlock" {
  if (slug === "tom-paneli") return "roof";
  if (slug === "z-lock") return "zlock";
  return "wall";
}

export async function PanelDatasheet({ data }: { data: PanelDatasheetData }) {
  const t = await getTranslations("datasheet");
  const tc = await getTranslations("cta");
  const variant = variantFromSlug(data.slug);
  const features = t.raw("features") as string[];
  const advList = t.raw("advList") as string[];
  const trust = t.raw("trust") as string[];

  return (
    <div className="bg-white">
      <section className="border-y border-line bg-[#e8eef8]">
        <div className="container-site -mx-0 overflow-x-auto overscroll-x-contain py-4 sm:overflow-visible sm:py-5">
          <div className="flex min-w-max gap-6 px-1 sm:grid sm:min-w-0 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {features.map((item) => (
              <p
                key={item}
                className="max-w-[7.5rem] text-center text-[10px] font-bold uppercase leading-snug tracking-[0.08em] text-steel sm:max-w-none sm:text-xs"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="space-y-10 sm:space-y-12">
            <div>
              <p className="eyebrow text-ink-muted/70">{t("structureEyebrow")}</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-steel sm:text-3xl">
                {t("structureTitle")}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">{data.profile}</p>
              <div className="mt-5 sm:mt-6">
                <PanelCrossSection variant={variant} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {data.structureNote}
              </p>
            </div>

            <div>
              <p className="eyebrow text-ink-muted/70">{t("advantagesEyebrow")}</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-steel sm:text-2xl">
                {t("advantagesTitle")}
              </h2>
              <ul className="mt-5 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                {advList.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-accent bg-surface px-3 py-3 text-sm font-medium text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-ink-muted/70">{t("ralEyebrow")}</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-steel sm:text-2xl">
                {t("ralTitle")}
              </h2>
              <div className="mt-4 grid grid-cols-5 gap-2 sm:mt-5 sm:gap-3">
                {siteConfig.ralSwatches.map((swatch) => (
                  <div key={swatch.code} className="text-center">
                    <span
                      className="mx-auto block aspect-square w-full border border-line sm:h-12 sm:aspect-auto"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="mt-1 block text-[9px] font-semibold tracking-wide text-ink-muted sm:mt-1.5 sm:text-[10px]">
                      {swatch.code.replace("RAL ", "")}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-muted">{t("ralNote")}</p>
            </div>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <div>
              <p className="eyebrow text-ink-muted/70">{t("specsEyebrow")}</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-steel sm:text-3xl">
                {data.shortTitle} — {t("specsTitle")}
              </h2>

              <div className="spec-stack mt-5 sm:mt-6">
                {data.specs.map((row) => (
                  <div key={row.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-steel sm:text-sm sm:normal-case sm:tracking-normal">
                      {row.label}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-muted">{row.value}</p>
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-2">
                {data.highlights.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-ink-muted/70">{t("appsEyebrow")}</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-wide text-steel sm:text-2xl">
                {t("appsTitle")}
              </h2>
              <ul className="mt-5 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                {data.applications.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-white px-4 py-3.5 text-sm font-semibold text-steel"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-line bg-steel px-4 py-5 text-white sm:px-6 sm:py-6">
              <p className="font-display text-lg font-semibold tracking-wide sm:text-xl">
                {t("brandBlurb")}
              </p>
              <p className="mt-2 text-sm text-white/70">{t("brandSub")}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="btn btn-primary btn-block"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-block"
                >
                  {tc("whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-steel">
        <div className="container-site grid grid-cols-2 gap-3 py-4 text-center sm:grid-cols-4 sm:gap-4 sm:py-5">
          {trust.map((item) => (
            <p
              key={item}
              className="text-[10px] font-bold uppercase leading-snug tracking-[0.08em] text-white/85 sm:text-xs sm:tracking-[0.1em]"
            >
              {item}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
