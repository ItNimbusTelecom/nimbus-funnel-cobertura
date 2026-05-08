"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NIMBUS_LOGO_URL } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dictionary } = useI18n();
  const navItems = [
    { label: dictionary.nav.solution, href: "#solucion" },
    { label: dictionary.nav.plans, href: "#tarifas" },
    { label: dictionary.nav.study, href: "#formulario" },
    { label: dictionary.nav.reviews, href: "#opiniones" },
    { label: dictionary.nav.faq, href: "#faq" },
    { label: dictionary.nav.contact, href: "#contacto" },
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-nimbus-line/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:gap-5 sm:px-5">
        <a href="#" className="flex shrink-0 items-center" aria-label="Nimbus Telecom">
          <Image
            src={NIMBUS_LOGO_URL}
            alt="Nimbus Telecom"
            className="h-auto w-[112px] object-contain sm:w-[158px]"
            width={223}
            height={70}
            unoptimized
          />
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={dictionary.nav.aria}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-nimbus-muted transition hover:bg-nimbus-soft hover:text-nimbus-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher compact />
          </div>
          <a
            href="#formulario"
            className="rounded-full bg-nimbus-orange px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-nimbus-orangeDark sm:px-4 sm:text-sm"
          >
            {dictionary.nav.primaryCta}
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center rounded-full border border-nimbus-line text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nimbus-orange lg:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
            <span aria-hidden="true" className="grid gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <div id="mobile-menu" className="border-t border-nimbus-line bg-white px-4 py-4 shadow-soft lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-2" aria-label={dictionary.nav.aria}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-black text-nimbus-ink transition hover:bg-nimbus-soft hover:text-nimbus-orange"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mx-auto mt-4 max-w-6xl">
            <LanguageSwitcher />
          </div>
        </div>
      ) : null}
    </header>
  );
}
