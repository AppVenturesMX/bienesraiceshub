import { Eye, Target } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function AboutMissionVision() {
  return (
    <section id="mision-vision" className="scroll-mt-20 bg-slate-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-white">Misión</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                Conectar cada etapa de comprar, vender o financiar una propiedad — desde el primer
                contacto hasta la entrega de llaves — bajo un mismo equipo de especialistas, para
                que nuestros clientes avancen con tranquilidad y sin fricciones innecesarias.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-white">Visión</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                Ser la red de especialistas inmobiliarios de referencia en Baja California,
                reconocida porque cada propiedad que pasa por nuestras manos llega a un cierre bien
                hecho — no solo a una firma.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
