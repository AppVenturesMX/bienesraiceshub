import { Handshake, UserCheck } from "lucide-react"
import { SocMark } from "./soc-mark"
import { PREAPRUEBA_URL } from "@/lib/site"

// Franja de confianza compacta justo debajo del hero: la versión "de un
// vistazo" de lo que HubWhyUs explica a detalle más abajo.
export function HubTrustBar() {
  return (
    <div className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-5 text-center text-sm text-slate-300 sm:flex-row sm:justify-center sm:gap-8 sm:px-6 sm:text-left">
        <span className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 shrink-0 text-emerald-400" />
          Todo conectado, de principio a fin
        </span>
        <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
        <a
          href={PREAPRUEBA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-white"
        >
          <SocMark className="h-4 w-4 shrink-0 text-emerald-400" />
          Precalificación de crédito sin costo
        </a>
        <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <Handshake className="h-4 w-4 shrink-0 text-emerald-400" />
          Acompañamiento hasta el cierre
        </span>
      </div>
    </div>
  )
}
