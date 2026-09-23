import { Reveal } from "@/components/reveal"
import { PREAPRUEBA_URL } from "@/lib/site"
import type { Property } from "@/lib/properties"

export function Facilidades({ property }: { property: Property }) {
  return (
    <section className="bg-slate-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">Facilidades de pago a tu medida</h2>
          <p className="mt-3 text-emerald-100/90">Aceptamos distintas formas de pago para que hagas tuya esta propiedad.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {property.formasDePago.map((forma) => (
              <div
                key={forma.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <forma.icon className="h-8 w-8 text-emerald-400" />
                <span className="text-lg font-semibold">{forma.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-8">
            <p className="text-balance text-xl font-bold text-emerald-300 sm:text-2xl">
              ¿No sabes cuánto te prestan? Te ayudamos a tramitar tu crédito bancario ¡SIN COSTO!
            </p>
            <a
              href={PREAPRUEBA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-emerald-600"
            >
              👉 IR A PREAPRUEBA.COM AHORA
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
