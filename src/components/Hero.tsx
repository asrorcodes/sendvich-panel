import { getTranslations } from "next-intl/server";
import { PanelWall } from "@/components/PanelWall";
import { HeroCopy } from "@/components/HeroCopy";

export async function Hero() {
  const t = await getTranslations("hero");
  const ts = await getTranslations("site");

  return (
    <section className="relative overflow-hidden md:min-h-[100svh]">
      <PanelWall />

      <div className="container-site relative flex flex-col justify-center pt-[5.25rem] pb-10 md:min-h-[100svh] md:pb-24 md:pt-24">
        <HeroCopy
          tagline={ts("tagline")}
          lead={t("lead")}
          ctaProducts={t("ctaProducts")}
        />
      </div>
    </section>
  );
}
