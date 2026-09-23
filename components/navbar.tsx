"use client"

import Link from "next/link"
import { HubMark } from "./hub-mark"
import { WhatsAppIcon } from "./whatsapp-icon"
import { GENERAL_WHATSAPP_URL, SITE_NAME } from "@/lib/site"

type NavbarProps = {
  /** En una página de propiedad, ancla a sus propias secciones internas. En el home del Hub, enlaza a la sección de propiedades. */
  mode?: "hub" | "property"
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
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-emerald-950 sm:h-14 sm:w-14">
            <HubMark className="h-8 w-8 sm:h-9 sm:w-9" />
          </span>
          <span className="whitespace-nowrap text-base font-bold tracking-tight text-white sm:text-lg">
            {SITE_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {mode === "property" ? (
            <>
              <button
                onClick={() => scrollTo("ubicacion")}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                Ubicación
              </button>
              <button
                onClick={() => scrollTo("espacios")}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                La propiedad
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => scrollTo("nosotros")}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                Por qué nosotros
              </button>
              <button
                onClick={() => scrollTo("propiedades")}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                Propiedades
              </button>
              <button
                onClick={() => scrollTo("como-funciona")}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
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
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-emerald-950 shadow-md transition-colors hover:bg-emerald-400 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Agendar visita
        </a>
      </nav>
    </header>
  )
}
