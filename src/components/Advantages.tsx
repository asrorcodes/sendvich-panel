import { getTranslations } from "next-intl/server";

export async function Advantages() {
  const t = await getTranslations("advantages");
  const list = (await getTranslations()).raw("advantageItems") as string[];

  return (
    <section id="afzalliklar" className="section-pad scroll-mt-20 bg-surface sm:scroll-mt-24">
      <div className="container-site">
        <p className="eyebrow text-ink-muted/70">{t("eyebrow")}</p>
        <h2 className="mt-2 max-w-2xl font-display text-[1.75rem] font-semibold tracking-wide text-steel sm:mt-3 sm:text-4xl md:text-[2.75rem]">
          {t("title")}
        </h2>
        <ul className="mt-8 grid gap-0 sm:mt-12 sm:grid-cols-2">
          {list.map((item, i) => (
            <li
              key={item}
              className="flex gap-3 border-t border-line py-4 sm:gap-4 sm:px-2 sm:py-5"
            >
              <span className="font-display text-sm font-semibold tracking-[0.14em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink sm:text-base">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
