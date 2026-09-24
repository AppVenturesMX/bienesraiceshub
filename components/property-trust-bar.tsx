import { Award, Handshake, Users } from "lucide-react"

// Franja de confianza justo debajo del hero de propiedad: sube la prueba
// social (años de experiencia, equipo multidisciplinario) al punto de
// mayor tráfico del sitio, en vez de dejarla enterrada en /nosotros.
export function PropertyTrustBar() {
  return (
    <div className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-5 text-center text-sm text-slate-300 sm:flex-row sm:justify-center sm:gap-8 sm:px-6 sm:text-left">
        <span className="flex items-center gap-2">
          <Award className="h-4 w-4 shrink-0 text-emerald-400" />
          25+ años de experiencia combinada
        </span>
        <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0 text-emerald-400" />
          Equipo multidisciplinario: legal, fiscal e hipotecario
        </span>
        <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <Handshake className="h-4 w-4 shrink-0 text-emerald-400" />
          Acompañamiento hasta el cierre
        </span>
      </div>
    </div>
  )
}
