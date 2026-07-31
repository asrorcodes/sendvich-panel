import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { PanelWall } from "@/components/PanelWall";

export async function Hero() {
  const t = await getTranslations("hero");
  const ts = await getTranslations("site");

  return (
    <section className="relative overflow-hidden md:min-h-[100svh]">
      <PanelWall />

      {/* Mobile: content starts under header, no giant empty gap */}
      <div className="container-site relative flex flex-col pt-[5.25rem] pb-10 md:hidden">
        <p className="animate-rise font-display text-[2.35rem] font-bold leading-none tracking-[0.1em] text-white">
          {siteConfig.name.toUpperCase()}
        </p>
        <span
          className="animate-line mt-3 block h-0.5 w-16 bg-accent"
          aria-hidden="true"
        />
        <h1 className="animate-rise-1 mt-4 font-display text-[1.55rem] font-semibold leading-snug tracking-wide text-white">
          {ts("tagline")}
        </h1>
        <p className="animate-rise-2 mt-3 text-[0.95rem] leading-relaxed text-white/78">
          {t("lead")}
        </p>
        <div className="animate-rise-3 mt-6 flex w-full flex-col gap-2.5">
          <a href={`tel:${siteConfig.phone}`} className="btn btn-primary w-full">
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/#mahsulotlar" className="btn btn-ghost w-full">
            {t("ctaProducts")}
          </Link>
        </div>
      </div>

      {/* Desktop / tablet: full-viewport composition */}
      <div className="container-site relative hidden min-h-[100svh] flex-col justify-center pb-24 pt-24 md:flex">
        <p className="animate-rise font-display text-[clamp(3rem,7vw,5.25rem)] font-bold leading-[0.95] tracking-[0.1em] text-white">
          {siteConfig.name.toUpperCase()}
        </p>
        <span
          className="animate-line mt-5 block h-0.5 w-36 bg-accent"
          aria-hidden="true"
        />
        <h1 className="animate-rise-1 mt-6 max-w-2xl font-display text-[clamp(1.85rem,3.5vw,2.85rem)] font-semibold leading-[1.15] tracking-wide text-white">
          {ts("tagline")}
        </h1>
        <p className="animate-rise-2 mt-4 max-w-lg text-lg leading-relaxed text-white/78">
          {t("lead")}
        </p>
        <div className="animate-rise-3 mt-9 flex flex-row items-center gap-3">
          <a href={`tel:${siteConfig.phone}`} className="btn btn-primary">
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/#mahsulotlar" className="btn btn-ghost">
            {t("ctaProducts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
