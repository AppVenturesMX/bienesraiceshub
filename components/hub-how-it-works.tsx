import { Reveal } from "@/components/reveal"

const pasos = [
  {
    numero: "1",
    title: "Explora el directorio",
    description: "Revisa las propiedades disponibles y elige la que te interesa.",
  },
  {
    numero: "2",
    title: "Precalifícate sin costo",
    description: "Antes de agendar, confirma cuánto te prestan vía preaprueba.com — sin compromiso.",
  },
  {
    numero: "3",
    title: "Agenda tu visita",
    description: "Coordina una cita directo con tu asesor por WhatsApp.",
  },
  {
    numero: "4",
    title: "Cierra con acompañamiento",
    description: "Te apoyamos en el trámite de crédito y cierre hasta que tengas las llaves.",
  },
]

export function HubHowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-slate-900 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-extrabold sm:text-4xl">Cómo funciona</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-emerald-100/90">
            De ver una propiedad a tener las llaves, en cuatro pasos.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, i) => (
            <Reveal key={paso.numero} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 text-lg font-extrabold text-white shadow-md shadow-emerald-500/30 ring-1 ring-white/20">
                  {paso.numero}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{paso.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{paso.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
