const TESTIMONIALS = [
  // Testimonios provisionales para validar diseño. Sustituir por testimonios reales antes de publicar en producción.
  {
    text: "Me explicaron por qué fallaba la cobertura en casa y me dieron una alternativa clara, sin intentar venderme cualquier cosa.",
    name: "Cliente particular",
    location: "Sils",
  },
  {
    text: "Por fin pude hablar con alguien que entendía el problema. No era solo cambiar de tarifa, era saber qué red me convenía.",
    name: "Cliente particular",
    location: "Zona Girona",
  },
  {
    text: "Me ayudaron a elegir la línea según dónde uso realmente el móvil, no solo por precio.",
    name: "Cliente particular",
    location: "La Selva",
  },
  {
    text: "Venía cansado de llamar y que me ofrecieran más datos. En Nimbus primero me preguntaron qué me pasaba.",
    name: "Cliente particular",
    location: "Girona",
  },
];

export function TestimonialsSection() {
  return (
    <section id="opiniones" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Opiniones</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            Clientes que querían dejar de pelearse con la cobertura
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">
            Cuando alguien llega a Nimbus con un problema de cobertura, muchas veces no busca solo una tarifa. Busca que
            alguien escuche, entienda qué está pasando y le recomiende con criterio.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.location}-${testimonial.text}`}
              className="flex min-h-[260px] flex-col rounded-lg border border-nimbus-line bg-nimbus-soft p-6"
            >
              <div className="grid size-11 place-items-center rounded-full bg-white text-3xl font-black leading-none text-nimbus-orange">
                “
              </div>
              <p className="mt-5 flex-1 text-lg font-bold leading-8 text-nimbus-ink">“{testimonial.text}”</p>
              <div className="mt-6 border-t border-nimbus-line pt-4">
                <p className="font-black text-nimbus-ink">{testimonial.name}</p>
                <p className="mt-1 text-sm font-bold text-nimbus-muted">{testimonial.location}</p>
                <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-nimbus-orange">
                  Caso habitual
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-nimbus-line bg-orange-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-xl font-black text-nimbus-ink">¿Tienes un problema parecido?</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulario"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              Quiero que estudiéis mi caso
            </a>
            <a
              href="#tarifas"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              Ver tarifas móviles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
