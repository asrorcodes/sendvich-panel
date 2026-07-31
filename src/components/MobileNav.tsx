"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const languageLabel: Record<Locale, string> = {
    uz: "Til",
    ru: "Язык",
    en: "Language",
  };

  function selectLocale(code: Locale) {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[80] flex h-10 w-10 items-center justify-center text-white"
      >
        <span className="sr-only">Menu</span>
        <span className="flex w-5 flex-col gap-1.5">
          <span
            className={`h-0.5 w-full bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-full bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-full bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-steel px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5rem,calc(env(safe-area-inset-top)+4.5rem))] sm:px-6">
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-2xl font-semibold tracking-wide text-white sm:text-3xl"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                {languageLabel[locale]}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {locales.map((code) => {
                  const active = code === locale;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => selectLocale(code)}
                      className={`flex min-h-12 flex-col items-center justify-center gap-0.5 px-2 py-2 text-center transition-colors ${
                        active
                          ? "bg-white text-steel"
                          : "bg-white/10 text-white active:bg-white/20"
                      }`}
                    >
                      <span className="font-display text-xs font-bold uppercase tracking-[0.14em]">
                        {code}
                      </span>
                      <span className="text-[11px] font-medium leading-tight opacity-80">
                        {localeNames[code]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5">
            <a
              href={`tel:${siteConfig.phone}`}
              className="btn btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
