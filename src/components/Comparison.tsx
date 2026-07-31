import { getTranslations } from "next-intl/server";

export async function Comparison() {
  const t = await getTranslations("comparison");
  const rows = (await getTranslations()).raw("coreComparison") as {
    type: string;
    status: string;
    density: string;
    best: string;
  }[];

  return (
    <section className="section-pad">
      <div className="container-site">
        <p className="eyebrow text-ink-muted/70">{t("eyebrow")}</p>
        <h2 className="mt-2 font-display text-[1.75rem] font-semibold tracking-wide text-steel sm:mt-3 sm:text-4xl md:text-[2.75rem]">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-xl text-sm text-ink-muted sm:text-base">{t("lead")}</p>

        {/* Mobile cards */}
        <ul className="mt-8 space-y-3 sm:hidden">
          {rows.map((row) => (
            <li key={row.type} className="border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-wide text-steel">
                  {row.type}
                </h3>
                <span className="shrink-0 bg-surface px-2 py-1 text-xs font-semibold text-ink">
                  {row.status}
                </span>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="eyebrow text-ink-muted/55">{t("headers.density")}</dt>
                  <dd className="mt-1 text-ink-muted">{row.density}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted/55">{t("headers.best")}</dt>
                  <dd className="mt-1 text-ink-muted">{row.best}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="eyebrow py-4 pr-4 text-ink-muted/70">
                  {t("headers.core")}
                </th>
                <th className="eyebrow py-4 pr-4 text-ink-muted/70">
                  {t("headers.status")}
                </th>
                <th className="eyebrow py-4 pr-4 text-ink-muted/70">
                  {t("headers.density")}
                </th>
                <th className="eyebrow py-4 text-ink-muted/70">{t("headers.best")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.type}
                  className="border-b border-line/80 transition-colors hover:bg-white/40"
                >
                  <td className="py-5 pr-4 font-display text-lg font-semibold tracking-wide text-steel">
                    {row.type}
                  </td>
                  <td className="py-5 pr-4 text-sm font-medium text-ink">
                    {row.status}
                  </td>
                  <td className="py-5 pr-4 text-sm text-ink-muted">{row.density}</td>
                  <td className="py-5 text-sm text-ink-muted">{row.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
