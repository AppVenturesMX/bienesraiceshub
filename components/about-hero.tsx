"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[56vh] max-w-4xl flex-col items-center gap-6 px-4 pb-16 pt-32 text-center sm:px-6 lg:pt-40">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-emerald-400"
        >
          <Users className="h-4 w-4" />
          Quiénes somos
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
        >
          Un equipo multidisciplinario, un mismo Hub.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-pretty text-lg leading-relaxed text-slate-300"
        >
          Somos especialistas en bienes raíces, derecho, servicios fiscales, banca hipotecaria y
          diseño arquitectónico, con más de 25 años de experiencia combinada — trabajando
          coordinados para que tu compra, venta o renta avance sin fricciones.
        </motion.p>
      </div>
    </section>
  )
}
