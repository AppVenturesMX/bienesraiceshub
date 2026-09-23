import { Award, BadgeCheck, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"

const credenciales = [
  {
    icon: Award,
    label: "25+ años de experiencia combinada",
  },
  {
    icon: BadgeCheck,
    label: "Profesionales certificados en sus áreas",
  },
  {
    icon: Users,
    label: "Equipo multidisciplinario, un mismo expediente",
  },
]

export function AboutStory() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold text-slate-800 sm:text-4xl">
            Nacimos de una frustración muy común
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-600">
            Comprar, vender o financiar una propiedad no debería sentirse como armar un
            rompecabezas con piezas que no hablan entre sí: el agente por un lado, el abogado por
            otro, el banco en otro correo y el arquitecto en otra llamada. Bienes Raíces Hub nació
            para cambiar eso — reunimos, bajo un mismo equipo, a profesionales de bienes raíces,
            derecho, servicios fiscales, banca hipotecaria y diseño arquitectónico, todos
            coordinados en cada expediente. No somos una sola persona haciendo de todo; somos un equipo de
            especialistas que se pasan la estafeta sin que tú tengas que perseguir a nadie.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-4 border-t border-emerald-100 pt-10 sm:flex-row sm:justify-center sm:gap-10">
            {credenciales.map((c) => (
              <span key={c.label} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <c.icon className="h-5 w-5 shrink-0 text-emerald-600" />
                {c.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
