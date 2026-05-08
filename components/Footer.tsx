import Image from "next/image";
import { NIMBUS_LOGO_URL } from "@/lib/brand";
import { CONTACT_INFO, LEGAL_LINKS, SOCIAL_LINKS } from "@/lib/contact";

export function Footer() {
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
            Partner tecnológico local para hogares y negocios.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-ink">Contacto</h2>
          <ul className="mt-4 space-y-2 text-sm text-nimbus-muted">
            <li>
              <a className="transition hover:text-nimbus-orange" href={CONTACT_INFO.phoneHref}>
                Teléfono: {CONTACT_INFO.phoneLabel}
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-nimbus-orange"
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {CONTACT_INFO.whatsappLabel}
              </a>
            </li>
            <li>
              <a className="transition hover:text-nimbus-orange" href={CONTACT_INFO.emailHref}>
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-ink">Oficina</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-nimbus-muted">
            <a
              className="block transition hover:text-nimbus-orange"
              href={CONTACT_INFO.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT_INFO.address}
            </a>
            <p>{CONTACT_INFO.hours}</p>
            <p>{CONTACT_INFO.commercialHours}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-ink">Redes y legal</h2>
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
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a className="transition hover:text-nimbus-orange" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-nimbus-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-sm text-nimbus-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Nimbus Telecom. Todos los derechos reservados.</p>
          <p>Atención desde Sils</p>
        </div>
      </div>
    </footer>
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
