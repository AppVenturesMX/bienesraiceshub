import { Award, BadgeCheck, Building2, Calculator, Landmark, Ruler, Scale, Users } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/reveal"

const equipo = [
  {
    icon: Building2,
    title: "Bienes raíces residencial y comercial",
    description:
      "Conocemos a fondo Playas de Tijuana: su plusvalía, su potencial comercial y lo que hace atractiva esta zona.",
  },
  {
    icon: Scale,
    title: "Asesoría jurídica",
    description:
      "Revisión de contrato y escrituración de esta propiedad, para que firmes con la tranquilidad de que todo está en orden.",
  },
  {
    icon: Calculator,
    title: "Servicios fiscales",
    description: "Estructura fiscal clara para tu operación, sin sorpresas después de firmar.",
  },
  {
    icon: Landmark,
    title: "Banca hipotecaria",
    description: "Precalificación y gestión de tu crédito, con acceso a múltiples instituciones financieras.",
  },
  {
    icon: Ruler,
    title: "Diseño arquitectónico",
    description:
      "Si más adelante quieres remodelar o ampliar aprovechando el potencial comercial de la zona, cuentas con arquitectos aliados.",
  },
]

const credenciales = [
  { icon: Award, label: "25+ años de experiencia combinada" },
  { icon: BadgeCheck, label: "Profesionales certificados en sus áreas" },
  { icon: Users, label: "Un mismo equipo, un mismo expediente" },
]

// Sección que sube "la fuerza del Hub" a la página de mayor tráfico del
// sitio (la propiedad): el equipo multidisciplinario coordinado, aplicado
// específicamente a esta operación — no una promesa abstracta enterrada
// en /nosotros.
export function PropertyHubStrength() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-extrabold text-slate-800 sm:text-4xl">
            No compras solo una casa: compras un cierre acompañado por un equipo completo
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Bienes Raíces Hub reúne, bajo un mismo expediente, a los especialistas que normalmente
            tendrías que buscar por tu cuenta — coordinados desde el primer contacto hasta que
            tengas las llaves de esta propiedad.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((esp, i) => (
            <Reveal key={esp.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-emerald-100 bg-slate-50 p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                  <esp.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">{esp.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{esp.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-emerald-100 pt-10 sm:flex-row sm:justify-center sm:gap-10">
            {credenciales.map((c) => (
              <span key={c.label} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <c.icon className="h-5 w-5 shrink-0 text-emerald-600" />
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center">
            <Link
              href="/nosotros"
              className="text-sm font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              Conoce al equipo completo →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
