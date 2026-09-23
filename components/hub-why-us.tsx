import { Handshake, ShieldCheck, UserCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"

const razones = [
  {
    icon: UserCheck,
    title: "Un asesor real, no un formulario",
    description:
      "Hablas directo con la misma persona que conoce cada propiedad del directorio, de principio a fin.",
  },
  {
    icon: ShieldCheck,
    title: "Precalificación de crédito sin costo",
    description:
      "Antes de agendar tu visita, confirma cuánto te prestan — sin compromiso, vía preaprueba.com.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento hasta el cierre",
    description:
      "No te dejamos solo después de la visita: te apoyamos en el proceso de crédito y cierre.",
  },
]

export function HubWhyUs() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-extrabold text-slate-800 sm:text-4xl">
            ¿Por qué buscar tu propiedad aquí?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Cada propiedad de este directorio pasa por el mismo asesor y el mismo proceso de
            crédito — no es un portal abierto a cualquiera.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {razones.map((razon, i) => (
            <Reveal key={razon.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                  <razon.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">{razon.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{razon.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
