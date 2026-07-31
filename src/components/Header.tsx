"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "@/components/MobileNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  const nav = [
    { href: "/#mahsulotlar", label: t("products") },
    { href: "/#afzalliklar", label: t("advantages") },
    { href: "/#zavod", label: t("factory") },
    { href: "/#faq", label: t("faq") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[border-color] duration-300 ${
        solid ? "border-b border-white/10" : "border-b border-transparent"
      }`}
    >
      {/* Backdrop on a sibling layer so backdrop-filter does not trap position:fixed menu */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-[background-color,backdrop-filter,opacity] duration-300 ${
          solid
            ? "bg-steel/95 opacity-100 backdrop-blur-md"
            : "bg-transparent opacity-0 backdrop-blur-none"
        }`}
      />
      <div className="container-site relative z-10 flex h-16 items-center justify-between gap-3 sm:h-17">
        <Link
          href="/"
          className="min-w-0 shrink font-display text-lg font-bold tracking-[0.08em] text-white sm:text-xl md:text-2xl"
        >
          <span className="block truncate">{siteConfig.name.toUpperCase()}</span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex lg:gap-8"
          aria-label="Main"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn btn-primary px-4! py-2! text-sm"
          >
            {siteConfig.phoneDisplay}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
          <LanguageSwitcher compact />
          <MobileNav items={nav} />
        </div>
      </div>
    </header>
  );
}
