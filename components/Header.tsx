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
        <a href="#" className="flex flex-col leading-tight">
          <span className="text-lg font-black tracking-tight text-nimbus-ink">Nimbus Telecom</span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-nimbus-muted">
            Partner tecnológico local
          </span>
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
