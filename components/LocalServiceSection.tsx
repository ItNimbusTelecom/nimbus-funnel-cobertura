import { VisualIcon } from "./VisualIcon";

const serviceCards = [
  {
    icon: "headphones",
    title: "Atención humana",
    text: "Hablas con personas que escuchan tu problema, no con un proceso automático pensado solo para venderte otra tarifa.",
  },
  {
    icon: "map-pin",
    title: "Conocimiento del territorio",
    text: "Trabajamos en la zona y conocemos muchos de los problemas reales de cobertura, instalación y uso que se encuentran hogares y negocios.",
  },
  {
    icon: "lightbulb",
    title: "Te ayudamos a entender",
    text: "No tienes por qué saber si el problema es de la red, del móvil, de la configuración o de la tarifa. Te lo explicamos de forma clara.",
  },
  {
    icon: "life-buoy",
    title: "Seguimos después de contratar",
    text: "Nuestro trabajo no termina cuando activas la línea. Si necesitas ayuda, seguimos cerca para revisar, configurar y resolver.",
  },
] as const;

export function LocalServiceSection() {
  return (
    <section id="cercania" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Servicio cercano</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
              Cerca de ti cuando necesitas una respuesta
            </h2>
            <p className="mt-4 text-lg font-bold leading-8 text-nimbus-ink">
              Nimbus no es solo una línea móvil. Somos un equipo local, en Sils, que escucha tu caso y te ayuda a
              entender qué está pasando antes de recomendarte una solución.
            </p>
            <p className="mt-4 text-lg leading-8 text-nimbus-muted">
              Si tienes problemas de cobertura, no queremos venderte más datos ni una tarifa cualquiera. Queremos saber
              dónde te falla, cuándo te falla y cómo te afecta. A partir de ahí, te orientamos con criterio y buscamos
              la opción que tenga más sentido para tu día a día.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((card) => (
              <article key={card.title} className="rounded-lg border border-nimbus-line bg-nimbus-soft p-5">
                <div className="grid size-10 place-items-center rounded-full bg-white text-nimbus-orange">
                  <VisualIcon name={card.icon} className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-black text-nimbus-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-nimbus-muted">{card.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-nimbus-line bg-orange-50 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <p className="text-lg font-bold leading-8 text-nimbus-ink">
            Por eso hablamos de estudiar tu caso: porque la mejor tarifa no siempre es la más grande ni la más barata,
            sino la que encaja contigo.
          </p>
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
