"use client";

import { LOCALES, useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, dictionary } = useI18n();

  return (
    <div
      className="inline-flex w-fit items-center gap-1 rounded-full border border-nimbus-line bg-white p-1"
      aria-label={dictionary.language.ariaLabel}
    >
      {LOCALES.map((item) => {
        const isActive = item.code === locale;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            className={`rounded-full px-2.5 py-1.5 text-xs font-black transition ${
              isActive
                ? "bg-nimbus-orange text-white"
                : "text-nimbus-muted hover:bg-nimbus-soft hover:text-nimbus-ink"
            }`}
            title={item.label}
          >
            <span aria-hidden="true" className={compact ? "hidden" : "mr-1 inline"}>
              {item.flag}
            </span>
            {item.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
