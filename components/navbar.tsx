"use client"

import Link from "next/link"
import { HubMark } from "./hub-mark"
import { WhatsAppIcon } from "./whatsapp-icon"
import { GENERAL_WHATSAPP_URL, SITE_NAME } from "@/lib/site"
import { brandFont } from "@/lib/fonts"

type NavbarProps = {
  /** En una página de propiedad, ancla a sus propias secciones internas. En el home del Hub, enlaza a la sección de propiedades. En "Quiénes somos", ancla a sus propias secciones. */
  mode?: "hub" | "property" | "about"
  whatsappUrl?: string
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth" })
}

export function Navbar({ mode = "hub", whatsappUrl = GENERAL_WHATSAPP_URL }: NavbarProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-40 w-full">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <HubMark className="h-10 w-10 shrink-0 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-14 sm:w-14" />
          <span className={`${brandFont.className} whitespace-nowrap text-lg tracking-tight text-white drop-shadow-sm sm:text-2xl`}>
            {SITE_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {mode === "property" ? (
            <>
              <button
                onClick={() => scrollTo("ubicacion")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Ubicación
              </button>
              <button
                onClick={() => scrollTo("espacios")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                La propiedad
              </button>
            </>
          ) : mode === "about" ? (
            <>
              <Link
                href="/"
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Inicio
              </Link>
              <button
                onClick={() => scrollTo("especialidades")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Especialidades
              </button>
              <button
                onClick={() => scrollTo("valores")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Valores
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => scrollTo("nosotros")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Por qué nosotros
              </button>
              <button
                onClick={() => scrollTo("propiedades")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Propiedades
              </button>
              <button
                onClick={() => scrollTo("como-funciona")}
                className="text-base font-semibold text-slate-100 drop-shadow-sm transition-colors hover:text-white"
              >
                Cómo funciona
              </button>
            </>
          )}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/50 ring-1 ring-white/40 transition-all hover:-translate-y-0.5 hover:from-emerald-300 hover:to-emerald-400 hover:shadow-emerald-400/60 sm:gap-2 sm:px-6 sm:py-3 sm:text-base"
        >
          <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          Agendar visita
        </a>
      </nav>
    </header>
  )
}
