"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { IntentSelector } from "./intent-selector"
import { SITE_TAGLINE } from "@/lib/site"
import { getHeroMosaicImages } from "@/lib/properties"

export function HubHero() {
  const mosaic = getHeroMosaicImages(12)

  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      {mosaic.length > 0 && (
        <div
          className="absolute inset-0 grid grid-cols-3 gap-1 sm:grid-cols-4 lg:grid-cols-6"
          aria-hidden="true"
        >
          {mosaic.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img src={img.src} alt="" className="h-full w-full object-cover grayscale" />
            </div>
          ))}
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/93 to-slate-950"
        aria-hidden="true"
      />

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
          Compra, vende o renta — con crédito, trámites y cierre conectados en un mismo Hub.
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
