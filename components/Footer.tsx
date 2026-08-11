"use client";

import { LEGAL_LINKS } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";

const LINKTREE_URL = "https://linktr.ee/nimbustelecom";

export function Footer() {
  const { dictionary } = useI18n();

  return (
    <footer id="contacto" className="border-t border-nimbus-line bg-white pb-24 md:pb-0">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm leading-7 text-nimbus-muted">
        <nav aria-label={dictionary.footer.legalAria} className="flex flex-wrap items-center justify-center gap-x-2">
          {LEGAL_LINKS.map((link, index) => (
            <span key={link.href} className="inline-flex items-center gap-x-2">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              <a
                className="font-bold transition hover:text-nimbus-orange"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary.footer.legalLinks[index]}
              </a>
            </span>
          ))}
        </nav>

        <p className="mt-3">
          © 2026 Nimbus Telecom. {dictionary.footer.rights}
          <br />
          {dictionary.footer.officialLinksPrefix}:{" "}
          <a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-black text-nimbus-ink transition hover:text-nimbus-orange"
          >
            {dictionary.footer.officialLinksCta}
          </a>
        </p>
      </div>
    </footer>
  );
}
