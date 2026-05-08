"use client";

import { useI18n } from "@/lib/i18n";

export function TestimonialsSection() {
  const { dictionary } = useI18n();

  return (
    <section id="opiniones" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">
            {dictionary.testimonials.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
            {dictionary.testimonials.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-nimbus-muted">{dictionary.testimonials.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* Testimonios provisionales para validar diseño. Sustituir por testimonios reales antes de publicar en producción. */}
          {dictionary.testimonials.items.map(([text, name, location]) => (
            <article
              key={`${name}-${location}-${text}`}
              className="flex min-h-[260px] flex-col rounded-lg border border-nimbus-line bg-nimbus-soft p-6"
            >
              <div className="grid size-11 place-items-center rounded-full bg-white text-3xl font-black leading-none text-nimbus-orange">
                “
              </div>
              <p className="mt-5 flex-1 text-lg font-bold leading-8 text-nimbus-ink">“{text}”</p>
              <div className="mt-6 border-t border-nimbus-line pt-4">
                <p className="font-black text-nimbus-ink">{name}</p>
                <p className="mt-1 text-sm font-bold text-nimbus-muted">{location}</p>
                <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-nimbus-orange">
                  {dictionary.testimonials.badge}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-nimbus-line bg-orange-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-xl font-black text-nimbus-ink">{dictionary.testimonials.ctaText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <a
              href="#formulario"
              className="rounded-full bg-nimbus-orange px-5 py-3 text-center text-sm font-black text-white transition hover:bg-nimbus-orangeDark"
            >
              {dictionary.testimonials.studyCta}
            </a>
            <a
              href="#tarifas"
              className="rounded-full border border-nimbus-line bg-white px-5 py-3 text-center text-sm font-black text-nimbus-ink transition hover:border-nimbus-orange hover:text-nimbus-orange"
            >
              {dictionary.testimonials.plansCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
