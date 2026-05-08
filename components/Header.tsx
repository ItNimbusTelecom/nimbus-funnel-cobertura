import Image from "next/image";
import { NIMBUS_LOGO_URL } from "@/lib/brand";

const navItems = [
  { label: "Solución", href: "#solucion" },
  { label: "Tarifas", href: "#tarifas" },
  { label: "Estudiar mi caso", href: "#formulario" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
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
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
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
        <a
          href="#formulario"
          className="rounded-full bg-nimbus-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-nimbus-orangeDark"
        >
          Revisar cobertura
        </a>
      </div>
    </header>
  );
}
