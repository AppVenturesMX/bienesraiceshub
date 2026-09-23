import { Reveal } from "@/components/reveal"
import { WhatsAppIcon } from "./whatsapp-icon"
import type { Property } from "@/lib/properties"
import { getPropertyWhatsAppUrl } from "@/lib/properties"

export function Contacto({ property }: { property: Property }) {
  const whatsappUrl = getPropertyWhatsAppUrl(property)

  return (
    <section id="contacto" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold text-slate-800 sm:text-4xl">
            {property.contactoHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-slate-600">{property.contactoSubheading}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105 hover:bg-emerald-600"
          >
            <WhatsAppIcon className="h-6 w-6" />
            Solicitar Más Información
          </a>
        </Reveal>
      </div>
    </section>
  )
}
