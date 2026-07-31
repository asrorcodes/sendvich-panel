import { getTranslations } from "next-intl/server";

type Variant = "wall" | "roof" | "zlock";

export async function PanelCrossSection({
  variant = "wall",
}: {
  variant?: Variant;
}) {
  const t = await getTranslations("datasheet.layers");

  const topClass =
    variant === "roof"
      ? "h-10 bg-gradient-to-b from-[#dce3eb] via-[#9aa8b8] to-[#6f7d8f] [clip-path:polygon(0_40%,8%_0,16%_40%,24%_0,32%_40%,40%_0,48%_40%,56%_0,64%_40%,72%_0,80%_40%,88%_0,100%_40%,100%_100%,0_100%)]"
      : "h-4 metal-face";

  return (
    <div
      className="relative overflow-hidden rounded-sm border border-line bg-white shadow-[0_12px_40px_rgba(16,41,97,0.08)]"
      aria-hidden="true"
    >
      <div className="flex flex-col p-4 sm:p-5">
        <div className={`relative w-full overflow-hidden ${topClass}`}>
          {variant !== "roof" && (
            <span className="absolute inset-y-0 left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          )}
        </div>

        <div className="foam-core relative flex min-h-28 items-center justify-center px-3 py-6 sm:min-h-36">
          {variant === "zlock" && (
            <div className="absolute right-2 top-1/2 flex h-16 w-5 -translate-y-1/2 flex-col justify-between">
              <span className="h-2 w-full bg-steel" />
              <span className="ml-auto h-8 w-3 bg-accent" />
              <span className="h-2 w-full bg-steel" />
            </div>
          )}
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
            {variant === "zlock" ? t("zlockCoreLabel") : t("coreLabel")}
          </p>
        </div>

        <div className="metal-face relative h-4 w-full overflow-hidden">
          <span className="absolute inset-y-0 left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        </div>
      </div>

      <dl className="space-y-3 border-t border-line bg-surface px-4 py-4 text-sm sm:px-5">
        <div>
          <dt className="font-semibold text-accent">{t("outerTitle")}</dt>
          <dd className="text-ink-muted">{t("outerText")}</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent">{t("coreTitle")}</dt>
          <dd className="text-ink-muted">{t("coreText")}</dd>
        </div>
        <div>
          <dt className="font-semibold text-accent">{t("innerTitle")}</dt>
          <dd className="text-ink-muted">{t("innerText")}</dd>
        </div>
      </dl>
    </div>
  );
}
