"use client";

import Image from "next/image";
import { NIMBUS_LOGO_URL } from "@/lib/brand";
import { CONTACT_INFO, LEGAL_LINKS, SOCIAL_LINKS } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { VisualIcon } from "./VisualIcon";

export function Footer() {
  const { dictionary } = useI18n();

  return (
    <footer id="contacto" className="border-t border-nimbus-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-9 px-5 py-10 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.1fr]">
        <div>
          <Image
            src={NIMBUS_LOGO_URL}
            alt="Nimbus Telecom"
            width={223}
            height={70}
            className="h-auto w-[142px] object-contain"
            unoptimized
          />
          <p className="mt-4 text-lg font-black text-nimbus-ink">Nimbus Telecom</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-nimbus-muted">
            {dictionary.footer.claim}
          </p>
          <div className="mt-5">
            <LanguageSwitcher />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-ink">{dictionary.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm text-nimbus-muted">
            <li>
              <a
                className="inline-flex items-center gap-2 transition hover:text-nimbus-orange"
                href={CONTACT_INFO.phoneHref}
                aria-label={`Llamar a Nimbus Telecom al ${CONTACT_INFO.phoneLabel}`}
              >
                <ContactIcon icon="phone" />
                <span>{CONTACT_INFO.phoneLabel}</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 transition hover:text-nimbus-orange"
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Escribir a Nimbus Telecom por WhatsApp al ${CONTACT_INFO.whatsappLabel}`}
              >
                <ContactIcon icon="whatsapp" />
                <span>{CONTACT_INFO.whatsappLabel}</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 transition hover:text-nimbus-orange"
                href={CONTACT_INFO.emailHref}
                aria-label={`Enviar email a ${CONTACT_INFO.email}`}
              >
                <ContactIcon icon="email" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-ink">{dictionary.footer.office}</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-nimbus-muted">
            <a
              className="inline-flex items-start gap-2 transition hover:text-nimbus-orange"
              href={CONTACT_INFO.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <VisualIcon name="map-pin" className="mt-0.5 size-4 shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </a>
            <p className="flex items-start gap-2">
              <VisualIcon name="clock" className="mt-0.5 size-4 shrink-0" />
              <span>{dictionary.footer.hours}</span>
            </p>
            <p className="flex items-start gap-2">
              <VisualIcon name="clock" className="mt-0.5 size-4 shrink-0" />
              <span>{dictionary.footer.commercialHours}</span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-ink">
            {dictionary.footer.socialLegal}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Nimbus Telecom en ${link.label}`}
                className={`grid size-10 place-items-center rounded-full border border-nimbus-line text-nimbus-muted transition hover:border-current ${link.hoverClassName}`}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
          <ul className="mt-5 space-y-2 text-sm text-nimbus-muted">
            {LEGAL_LINKS.map((link, index) => (
              <li key={link.href}>
                <a className="transition hover:text-nimbus-orange" href={link.href} target="_blank" rel="noopener noreferrer">
                  {dictionary.footer.legalLinks[index]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-nimbus-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-sm text-nimbus-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Nimbus Telecom. {dictionary.footer.rights}</p>
          <p>{dictionary.footer.from}</p>
        </div>
      </div>
    </footer>
  );
}

function ContactIcon({ icon }: { icon: string }) {
  if (icon === "phone") {
    return (
      <svg className="size-4 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.64a16 16 0 0 0 6.27 6.27l1.21-1.2a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  if (icon === "whatsapp") {
    return (
      <svg className="size-4 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .23 5.31.23 11.85c0 2.09.55 4.14 1.59 5.94L.13 24l6.36-1.67a11.83 11.83 0 0 0 5.61 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.45-8.42Zm-8.41 18.27h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.22-3.77.99 1.01-3.67-.24-.38a9.86 9.86 0 0 1-1.51-5.25C2.21 6.4 6.65 1.98 12.1 1.98a9.82 9.82 0 0 1 6.99 2.9 9.84 9.84 0 0 1 2.9 7.02c0 5.43-4.43 9.85-9.88 9.85Zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.92 8.92 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    );
  }

  return (
    <svg className="size-4 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "facebook") {
    return (
      <svg className="size-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2V8.6H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className="size-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
      </svg>
    );
  }

  return (
    <svg className="size-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.8 2h8.4A5.81 5.81 0 0 1 22 7.8v8.4a5.81 5.81 0 0 1-5.8 5.8H7.8A5.81 5.81 0 0 1 2 16.2V7.8A5.81 5.81 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Z" />
    </svg>
  );
}
