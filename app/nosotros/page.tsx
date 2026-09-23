import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { AboutHero } from "@/components/about-hero"
import { AboutStory } from "@/components/about-story"
import { AboutSpecialties } from "@/components/about-specialties"
import { AboutMissionVision } from "@/components/about-mission-vision"
import { AboutValues } from "@/components/about-values"
import { HubCtaBand } from "@/components/hub-cta-band"
import { SiteFooter } from "@/components/site-footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Quiénes somos — ${SITE_NAME}`,
  description:
    "Conoce al equipo detrás de Bienes Raíces Hub: especialistas en bienes raíces, derecho, servicios fiscales, banca hipotecaria y diseño arquitectónico, con más de 25 años de experiencia combinada.",
  openGraph: {
    title: `Quiénes somos — ${SITE_NAME}`,
    description:
      "Un equipo multidisciplinario de especialistas conectados, del primer contacto al cierre.",
    type: "website",
    locale: "es_MX",
    siteName: SITE_NAME,
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar mode="about" />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutSpecialties />
        <AboutMissionVision />
        <AboutValues />
        <HubCtaBand />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </>
  )
}
