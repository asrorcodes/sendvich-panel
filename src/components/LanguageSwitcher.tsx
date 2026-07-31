"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

type Props = {
  compact?: boolean;
};

export function LanguageSwitcher({ compact = false }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(code: Locale) {
    if (code !== locale) {
      router.replace(pathname, { locale: code });
    }
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={localeNames[locale]}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex shrink-0 items-center whitespace-nowrap transition-colors ${
          compact
            ? `h-8 gap-1 px-2 text-xs ${
                open ? "bg-white text-steel" : "bg-white/10 text-white active:bg-white/20"
              }`
            : `h-9 gap-1.5 px-2.5 text-sm ${
                open ? "bg-white text-steel" : "bg-white/10 text-white hover:bg-white/15"
              }`
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 shrink-0 opacity-80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9s1.3-6.2 3.8-9Z" />
        </svg>

        {compact ? (
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em]">
            {locale}
          </span>
        ) : (
          <span className="text-sm font-semibold tracking-wide">{localeNames[locale]}</span>
        )}

        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 shrink-0 opacity-60 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[80] w-[9.5rem] border border-line bg-white py-0.5 shadow-[0_8px_24px_rgba(16,41,97,0.14)]"
        >
          {locales.map((code) => {
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => selectLocale(code)}
                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left transition-colors ${
                  active
                    ? "bg-[#eef2f8] text-steel"
                    : "text-ink-muted hover:bg-[#f5f7fb] hover:text-steel active:bg-[#f5f7fb]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center font-display text-[9px] font-bold uppercase tracking-wider ${
                    active
                      ? "bg-steel text-white"
                      : "bg-[#e8edf5] text-steel/70"
                  }`}
                >
                  {code}
                </span>
                <span className="flex-1 text-xs font-medium">{localeNames[code]}</span>
                {active && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3 w-3 shrink-0 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      d="M3 8.5 6.5 12 13 4.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
