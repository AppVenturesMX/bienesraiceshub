import { Reveal } from "@/components/reveal"
import { WhatsAppIcon } from "./whatsapp-icon"
import { SocMark } from "./soc-mark"
import { GENERAL_WHATSAPP_URL, PREAPRUEBA_URL } from "@/lib/site"

const ctaClass =
  "inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/40 ring-1 ring-white/30 transition-all hover:-translate-y-0.5 hover:from-emerald-300 hover:to-emerald-400 hover:shadow-emerald-400/50 sm:w-auto sm:min-w-[270px]"

export function HubCtaBand() {
  return (
    <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 py-20 text-center text-white sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">
            ¿Listo para encontrar tu próxima propiedad?
          </h2>
          <p className="mt-3 text-slate-300">
            Habla con tu asesor o precalifícate sin costo — sin compromiso.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            <a href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={ctaClass}>
              <WhatsAppIcon className="h-5 w-5" />
              Hablar con un asesor
            </a>
            <a href={PREAPRUEBA_URL} target="_blank" rel="noopener noreferrer" className={ctaClass}>
              <SocMark className="h-6 w-auto" />
              Precalifícate gratis
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
