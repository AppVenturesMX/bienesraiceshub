"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { WhatsAppIcon } from "./whatsapp-icon"
import { GENERAL_WHATSAPP_URL, PREAPRUEBA_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site"

const ctaClass =
  "inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-950/40 transition-colors hover:bg-emerald-400 sm:w-auto sm:min-w-[270px]"

export function HubHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950">
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center gap-8 px-4 pb-16 pt-32 text-center sm:px-6 lg:pb-20 lg:pt-40">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-400"
        >
          <ShieldCheck className="h-4 w-4" />
          Baja California
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {SITE_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-pretty text-lg leading-relaxed text-slate-200"
        >
          {SITE_TAGLINE} Cada propiedad de este directorio incluye precalificación de crédito
          sin costo, para que sepas qué tanto puedes pagar antes de agendar tu visita.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-2 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
        >
          <a href={GENERAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={ctaClass}>
            <WhatsAppIcon className="h-5 w-5" />
            Hablar con un asesor
          </a>
          <a href={PREAPRUEBA_URL} target="_blank" rel="noopener noreferrer" className={ctaClass}>
            Precalifícate gratis
          </a>
        </motion.div>
      </div>
    </section>
  )
}
