import { getTranslations } from "next-intl/server";

export async function Factory() {
  const t = await getTranslations("factory");
  const points = t.raw("points") as { title: string; text: string }[];

  return (
    <section id="zavod" className="section-pad scroll-mt-20 bg-steel text-white sm:scroll-mt-24">
      <div className="container-site">
        <p className="eyebrow text-white/40">{t("eyebrow")}</p>
        <h2 className="mt-2 max-w-3xl font-display text-[1.75rem] font-semibold tracking-wide sm:mt-3 sm:text-4xl md:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:mt-4 sm:text-base">
          {t("lead")}
        </p>

        <div className="mt-10 grid gap-0 md:mt-16 md:grid-cols-3">
          {points.map((point, i) => (
            <div
              key={point.title}
              className={`${i > 0 ? "md:border-l md:border-white/15 md:pl-8" : ""} ${
                i < points.length - 1 ? "md:pr-8" : ""
              } border-t border-white/15 pt-6 md:border-t-0 md:pt-0`}
            >
              <p className="font-display text-sm tracking-[0.16em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-wide sm:mt-4 sm:text-2xl">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60 sm:mt-3">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
