import { getTranslations } from "next-intl/server";

export async function FAQ() {
  const t = await getTranslations("faq");
  const faqs = (await getTranslations()).raw("faqs") as {
    question: string;
    answer: string;
  }[];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-pad scroll-mt-20 bg-surface sm:scroll-mt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-site">
        <p className="eyebrow text-ink-muted/70">{t("eyebrow")}</p>
        <h2 className="mt-2 font-display text-[1.75rem] font-semibold tracking-wide text-steel sm:mt-3 sm:text-4xl md:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-xl text-sm text-ink-muted sm:text-base">{t("lead")}</p>

        <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line sm:mt-12">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-4 sm:py-6">
              <summary className="cursor-pointer list-none font-display text-base font-semibold tracking-wide text-steel marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-3 sm:gap-6">
                  <span className="min-w-0 pr-2">{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center bg-surface text-accent transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
