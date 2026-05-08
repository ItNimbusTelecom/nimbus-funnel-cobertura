"use client";

import Image from "next/image";
import { NIMBUS_LOGO_URL } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { dictionary } = useI18n();
  const navItems = [
    { label: dictionary.nav.solution, href: "#solucion" },
    { label: dictionary.nav.plans, href: "#tarifas" },
    { label: dictionary.nav.study, href: "#formulario" },
    { label: dictionary.nav.reviews, href: "#opiniones" },
    { label: dictionary.nav.faq, href: "#faq" },
    { label: dictionary.nav.contact, href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-nimbus-line/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-4">
        <a href="#" className="flex shrink-0 items-center" aria-label="Nimbus Telecom">
          <Image
            src={NIMBUS_LOGO_URL}
            alt="Nimbus Telecom"
            className="h-auto w-[136px] object-contain sm:w-[158px]"
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
          <LanguageSwitcher compact />
          <a
            href="#formulario"
            className="rounded-full bg-nimbus-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-nimbus-orangeDark"
          >
            {dictionary.nav.primaryCta}
          </a>
        </div>
      </div>
    </header>
  );
}
