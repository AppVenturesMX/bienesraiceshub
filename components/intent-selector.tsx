"use client"

import { motion } from "framer-motion"
import { ArrowRight, Home, KeyRound, Tag, type LucideIcon } from "lucide-react"
import { RENT_WHATSAPP_URL, SELL_WHATSAPP_URL } from "@/lib/site"

type Intent = {
  icon: LucideIcon
  title: string
  description: string
  cta: string
} & ({ kind: "anchor"; targetId: string } | { kind: "whatsapp"; href: string })

const intents: Intent[] = [
  {
    icon: Home,
    title: "Comprar",
    description: "Explora el directorio y precalifícate sin costo antes de tu primera visita.",
    cta: "Ver propiedades",
    kind: "anchor",
    targetId: "propiedades",
  },
  {
    icon: Tag,
    title: "Vender",
    description: "Cuéntale a tu asesor sobre tu propiedad y te acompaña en todo el proceso.",
    cta: "Escribir por WhatsApp",
    kind: "whatsapp",
    href: SELL_WHATSAPP_URL,
  },
  {
    icon: KeyRound,
    title: "Rentar",
    description: "Dinos qué buscas rentar en Baja California y tu asesor te contacta con opciones.",
    cta: "Escribir por WhatsApp",
    kind: "whatsapp",
    href: RENT_WHATSAPP_URL,
  },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

const cardClass =
  "group flex h-full w-full flex-col items-start rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur-sm transition-colors hover:border-emerald-400/40 hover:bg-white/10"

export function IntentSelector() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {intents.map((intent, i) => {
        const Icon = intent.icon
        const content = (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-white">{intent.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{intent.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
              {intent.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </>
        )

        return (
          <motion.div
            key={intent.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
          >
            {intent.kind === "anchor" ? (
              <button type="button" onClick={() => scrollToId(intent.targetId)} className={cardClass}>
                {content}
              </button>
            ) : (
              <a href={intent.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {content}
              </a>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
