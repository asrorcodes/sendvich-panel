"use client";

import { useCallback, useState } from "react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { TypewriterWave } from "@/components/TypewriterWave";

type Props = {
  tagline: string;
  lead: string;
  ctaProducts: string;
};

export function HeroCopy({ tagline, lead, ctaProducts }: Props) {
  const brand = siteConfig.name.toUpperCase();
  const [phase, setPhase] = useState(0);
  const [ctaProductsStart, setCtaProductsStart] = useState(false);

  const onBrandDone = useCallback(() => setPhase(1), []);
  const onTaglineDone = useCallback(() => setPhase(2), []);
  const onLeadDone = useCallback(() => setPhase(3), []);
  const onPhoneDone = useCallback(() => setCtaProductsStart(true), []);

  return (
    <div className="hero-copy relative z-10">
      <TypewriterWave
        as="p"
        text={brand}
        start
        showCursor
        charMs={48}
        onDone={onBrandDone}
        className="font-display text-[2.35rem] font-bold leading-none tracking-[0.1em] text-white md:text-[clamp(3rem,7vw,5.25rem)] md:leading-[0.95]"
      />

      <span
        className={
          phase >= 1
            ? "hero-accent-line mt-3 block h-0.5 w-16 animate-line md:mt-5 md:w-36"
            : "mt-3 block h-0.5 w-0 bg-accent md:mt-5"
        }
        aria-hidden="true"
      />

      <TypewriterWave
        as="h1"
        text={tagline}
        start={phase >= 1}
        showCursor
        charMs={26}
        onDone={onTaglineDone}
        className="mt-4 font-display text-[1.55rem] font-semibold leading-snug tracking-wide text-white md:mt-6 md:max-w-2xl md:text-[clamp(1.85rem,3.5vw,2.85rem)] md:leading-[1.15]"
      />

      <TypewriterWave
        as="p"
        text={lead}
        start={phase >= 2}
        charMs={14}
        waveMuted
        onDone={onLeadDone}
        className="mt-3 text-[0.95rem] leading-relaxed text-white/78 md:mt-4 md:max-w-lg md:text-lg"
      />

      <div
        className={`mt-6 flex w-full flex-col gap-2.5 md:mt-9 md:w-auto md:flex-row md:items-stretch md:gap-3 ${
          phase >= 3 ? "hero-cta-enter" : "pointer-events-none opacity-0"
        }`}
      >
        <a
          href={`tel:${siteConfig.phone}`}
          className="btn btn-primary hero-btn-live w-full md:w-auto"
          aria-label={siteConfig.phoneDisplay}
        >
          <TypewriterWave
            as="span"
            text={siteConfig.phoneDisplay}
            start={phase >= 3}
            showCursor
            charMs={36}
            waveVariant="onAccent"
            onDone={onPhoneDone}
          />
        </a>
        <Link
          href="/#mahsulotlar"
          className="btn btn-ghost hero-btn-live w-full md:w-auto"
          aria-label={ctaProducts}
        >
          <TypewriterWave
            as="span"
            text={ctaProducts}
            start={ctaProductsStart}
            showCursor
            charMs={24}
            waveVariant="ghost"
          />
        </Link>
      </div>
    </div>
  );
}
