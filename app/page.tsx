import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HubHero } from "@/components/hub-hero"
import { HubTrustBar } from "@/components/hub-trust-bar"
import { HubWhyUs } from "@/components/hub-why-us"
import { HubHowItWorks } from "@/components/hub-how-it-works"
import { HubCtaBand } from "@/components/hub-cta-band"
import { PropertyCard } from "@/components/property-card"
import { Reveal } from "@/components/reveal"
import { SiteFooter } from "@/components/site-footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { GENERAL_WHATSAPP_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site"
import { getAllProperties, getHeroMosaicImages } from "@/lib/properties-db"

export const dynamic = "force-dynamic"

// El home heredaba su metadata del layout sin imagen de Open Graph (og:image
// ausente, confirmado en vivo — ver claude/estrategia-seo-google-oct-2026.md
// sección 3). Se usa la primera foto del mosaico del hero, que ya se arma
// aquí mismo con getHeroMosaicImages, en vez de depender de un asset estático
// nuevo.
export async function generateMetadata(): Promise<Metadata> {
  const properties = await getAllProperties()
  const [firstMosaicImage] = getHeroMosaicImages(properties, 1)

  return {
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: firstMosaicImage
      ? {
          title: SITE_NAME,
          description: SITE_DESCRIPTION,
          type: "website",
          locale: "es_MX",
          siteName: SITE_NAME,
          url: SITE_URL,
          images: [{ url: firstMosaicImage.src, alt: firstMosaicImage.alt }],
        }
      : undefined,
  }
}

export default async function Page() {
  const properties = await getAllProperties()
  const mosaic = getHeroMosaicImages(properties, 8)

  // Datos estructurados (schema.org/JSON-LD) a nivel de negocio — ayuda a
  // que Google y los motores de IA identifiquen a Bienes Raíces Hub como
  // una agencia inmobiliaria con zona de servicio en Baja California.
  // Ver claude/estrategia-seo-google-oct-2026.md, secciones 1 y 6.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Baja California, México",
    },
    telephone: `+${WHATSAPP_NUMBER}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar mode="hub" />
      <main>
        <HubHero mosaic={mosaic} />
        <HubTrustBar />

        <HubWhyUs />

        <section id="propiedades" className="scroll-mt-20 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Propiedades disponibles
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
              Selecciona la que más te interese y tu asesor te contacta de inmediato.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <Reveal key={p.slug}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal>
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center shadow-xl">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿No encontraste lo que buscas?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-slate-300">
                  Cuéntale a tu asesor qué necesitas — ya sea que estés buscando una propiedad
                  en otra zona, vender tu propiedad o rentar — y te contacta directo.
                </p>
                <a
                  href={GENERAL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-md transition-colors hover:bg-emerald-400"
                >
                  Escríbele a tu asesor
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <HubHowItWorks />

        <HubCtaBand />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </>
  )
}
