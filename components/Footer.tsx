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
                className="rounded-full border border-nimbus-line px-3 py-1.5 text-sm font-bold text-nimbus-muted transition hover:border-nimbus-orange hover:text-nimbus-orange"
              >
                {link.label}
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
