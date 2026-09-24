"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { IntentSelector } from "./intent-selector"
import { HubMark } from "./hub-mark"
import { SITE_TAGLINE } from "@/lib/site"
import { getHeroMosaicImages } from "@/lib/properties"

export function HubHero() {
  const mosaic = getHeroMosaicImages(8)

  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      {mosaic.length > 0 && (
        <div
          className="absolute inset-0 grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 lg:grid-cols-4"
          aria-hidden="true"
        >
          {mosaic.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-2xl">
              <motion.img
                src={img.src}
                alt=""
                className="h-full w-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{
                  duration: 14,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/70 to-slate-950/92"
        aria-hidden="true"
      />
      <HubMark className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 text-white opacity-[0.06] sm:h-96 sm:w-96" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center gap-8 px-4 pb-16 pt-32 text-center sm:px-6 lg:pb-20 lg:pt-40">
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
          Valor Hub: del primer contacto al cierre, todo conectado.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-pretty text-lg leading-relaxed text-slate-200"
        >
          {SITE_TAGLINE}
        </motion.p>

        <div className="mt-2 w-full max-w-3xl">
          <IntentSelector />
        </div>
      </div>
    </section>
  )
}
