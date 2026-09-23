import { Building2, Calculator, Landmark, Ruler, Scale, Store } from "lucide-react"
import { Reveal } from "@/components/reveal"

const especialidades = [
  {
    icon: Building2,
    title: "Bienes raíces residencial",
    description: "Compra, venta y renta de casas y departamentos, con conocimiento a fondo de cada zona.",
  },
  {
    icon: Store,
    title: "Bienes raíces comercial",
    description: "Locales, oficinas y terrenos con potencial de uso comercial, evaluados con visión de negocio.",
  },
  {
    icon: Scale,
    title: "Asesoría jurídica",
    description: "Revisión de contratos, escrituración y cumplimiento legal en cada etapa del cierre.",
  },
  {
    icon: Calculator,
    title: "Contabilidad y fiscal",
    description: "Estructura fiscal clara para tu operación, sin sorpresas después de firmar.",
  },
  {
    icon: Landmark,
    title: "Banca hipotecaria",
    description: "Precalificación y gestión de crédito, con acceso a múltiples instituciones financieras.",
  },
  {
    icon: Ruler,
    title: "Diseño arquitectónico",
    description: "Remodelación, ampliación y proyectos a la medida, de la mano de arquitectos aliados.",
  },
]

export function AboutSpecialties() {
  return (
    <section id="especialidades" className="scroll-mt-20 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-extrabold text-slate-800 sm:text-4xl">
            Especialistas conectados, no áreas aisladas
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Cada etapa de tu operación pasa por manos expertas — coordinadas entre sí, no
            trabajando por separado.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {especialidades.map((esp, i) => (
            <Reveal key={esp.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                  <esp.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">{esp.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{esp.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
