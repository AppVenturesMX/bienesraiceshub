"use client"

import Link from "next/link"
import { Home2 } from "./home2-icon"
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
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-emerald-950">
            <Home2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">{SITE_NAME}</span>
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
            <button
              onClick={() => scrollTo("propiedades")}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              Propiedades
            </button>
          )}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-md transition-colors hover:bg-emerald-400"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Agendar visita
        </a>
      </nav>
    </header>
  )
}
