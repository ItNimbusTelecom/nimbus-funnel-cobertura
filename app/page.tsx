import { CoverageStudyFunnel } from "@/components/CoverageStudyFunnel";
import { DirectContractBlock } from "@/components/DirectContractBlock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroActions } from "@/components/HeroActions";
import { LandingTracker } from "@/components/LandingTracker";
import { LocalServiceSection } from "@/components/LocalServiceSection";
import { MobilePlans } from "@/components/MobilePlans";
import { VideoSection } from "@/components/VideoSection";

const problemBullets = [
  "¿Te quedas sin cobertura en casa?",
  "¿Se cortan las llamadas?",
  "¿Los datos van lentos en algunas zonas?",
  "¿Te mueves mucho y la cobertura cambia según el lugar?",
  "¿Tu operador actual no te da una solución clara?",
];

const solutionChecks = [
  "Triple cobertura",
  "Llamadas ilimitadas",
  "5G si tu terminal es compatible",
  "VoLTE si tu terminal es compatible",
  "Llamadas WiFi si tu terminal es compatible",
  "Roaming",
  "eSIM disponible",
  "Sin venderte más de lo que necesitas",
];

export default function Home() {
  return (
    <>
      <LandingTracker />
      <Header />
      <main>
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange shadow-sm">
                Líneas móviles con triple cobertura
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-nimbus-ink md:text-6xl">
                ¿Tienes problemas de cobertura móvil?
              </h1>
              <p className="mt-6 text-xl leading-9 text-nimbus-muted">
                No siempre es culpa de tu teléfono ni de tu tarifa. A veces el problema es que tu operador trabaja con
                una sola red y esa red no funciona bien donde tú vives, trabajas o te mueves.
              </p>
              <p className="mt-5 text-lg leading-8 text-nimbus-muted">
                En Nimbus trabajamos con líneas móviles con triple cobertura para darte más opciones reales de conexión
                y ayudarte a encontrar una solución que encaje mejor con tu caso.
              </p>
              <HeroActions />
            </div>

            <div className="rounded-lg border border-nimbus-line bg-white p-6 shadow-soft">
              <div className="grid gap-4">
                {[
                  ["Casa", "Poca señal en interiores"],
                  ["Trabajo", "Llamadas que se cortan"],
                  ["Movimiento", "Datos lentos por zonas"],
                ].map(([label, text]) => (
                  <div key={label} className="flex items-center gap-4 rounded-lg bg-nimbus-soft p-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-full bg-nimbus-orange text-lg font-black text-white">
                      {label.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-black text-nimbus-ink">{label}</p>
                      <p className="text-sm text-nimbus-muted">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-orange-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-nimbus-orange">Enfoque Nimbus</p>
                <p className="mt-2 text-lg font-black text-nimbus-ink">Revisamos dónde te falla antes de orientarte.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">El problema</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                Cambiar de tarifa no siempre arregla la cobertura
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-nimbus-muted">
                Si el problema está en la red que usa tu operador, cambiar a otra tarifa de la misma red puede dejarte
                igual. Por eso antes de venderte una línea, nos interesa entender dónde te falla, cuándo te falla y cómo
                usas el móvil.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {problemBullets.map((item) => (
                  <li key={item} className="rounded-lg border border-nimbus-line bg-white p-4 font-bold text-nimbus-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="solucion" className="scroll-mt-24 bg-nimbus-soft py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-nimbus-orange">Solución Nimbus</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-nimbus-ink md:text-4xl">
                La diferencia: más de una red para buscar mejor cobertura
              </h2>
              <p className="mt-4 text-lg leading-8 text-nimbus-muted">
                Muchas compañías trabajan con una única red móvil. En Nimbus trabajamos con líneas móviles con triple
                cobertura: Movistar, Orange y MásMóvil/Yoigo. Esto nos permite orientarte mejor según tu caso y buscar
                una opción con más posibilidades reales de funcionar bien donde la necesitas.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {solutionChecks.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange-100 text-sm font-black text-nimbus-orange">
                    ✓
                  </span>
                  <span className="font-bold text-nimbus-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <VideoSection />

        <LocalServiceSection />

        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ["Sin permanencia", "Opciones móviles pensadas para contratar sin atarte más de lo necesario."],
                ["Atención cercana", "Teléfono, WhatsApp y oficina física en Sils para revisar dudas reales."],
                ["Tecnología útil", "5G, VoLTE, llamadas WiFi y eSIM cuando tu terminal y la línea lo permiten."],
              ].map(([title, text]) => (
                <article key={title} className="rounded-lg border border-nimbus-line bg-white p-6">
                  <h3 className="text-xl font-black text-nimbus-ink">{title}</h3>
                  <p className="mt-3 leading-7 text-nimbus-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MobilePlans />
        <DirectContractBlock />
        <CoverageStudyFunnel />
      </main>
      <Footer />
    </>
  );
}
