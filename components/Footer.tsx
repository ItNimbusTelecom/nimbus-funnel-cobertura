export function Footer() {
  return (
    <footer id="contacto" className="border-t border-nimbus-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-xl font-black text-nimbus-ink">Nimbus Telecom</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-nimbus-muted">
            Internet y telefonía con trato cercano, transparencia y soluciones pensadas para cada caso.
          </p>
        </div>
        <div className="text-sm leading-7 text-nimbus-muted">
          <p className="font-bold text-nimbus-ink">Contacto</p>
          <p>Teléfono: 972 85 01 55</p>
          <p>WhatsApp: 622 81 26 04</p>
        </div>
        <div className="text-sm leading-7 text-nimbus-muted">
          <p className="font-bold text-nimbus-ink">Oficina</p>
          <p>C/Major, 42 - Sils</p>
          <p>Atención local y cercana</p>
        </div>
      </div>
    </footer>
  );
}
