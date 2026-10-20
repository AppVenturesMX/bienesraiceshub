import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { PropertyHero } from "@/components/property-hero"
import { PropertyTrustBar } from "@/components/property-trust-bar"
import { Galeria } from "@/components/galeria"
import { Ubicacion } from "@/components/ubicacion"
import { Espacios } from "@/components/espacios"
import { PropertyHubStrength } from "@/components/property-hub-strength"
import { Facilidades } from "@/components/facilidades"
import { Contacto } from "@/components/contacto"
import { SiteFooter } from "@/components/site-footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { getPropertyWhatsAppUrl } from "@/lib/properties"
import { getPropertyBySlug } from "@/lib/properties-db"
import { SITE_NAME, SITE_URL } from "@/lib/site"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return {}

  const canonicalUrl = `${SITE_URL}/propiedad/${property.slug}`

  return {
    title: property.metaTitle,
    description: property.metaDescription,
    // Esta ficha también responde en el subdominio independiente de la
    // propiedad (ej. granizo.bienesraiceshub.com), cuando existe — el
    // canonical aquí marca a esta página del Hub como la versión
    // preferida para Google. Ver claude/estrategia-seo-google-oct-2026.md,
    // sección 1 ("Contenido duplicado Hub ↔ landings independientes").
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: property.metaTitle,
      description: property.metaDescription,
      type: "website",
      locale: "es_MX",
      url: canonicalUrl,
      images: [
        {
          url: property.heroImage.src,
          alt: property.heroImage.alt,
        },
      ],
    },
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const whatsappUrl = getPropertyWhatsAppUrl(property)
  const canonicalUrl = `${SITE_URL}/propiedad/${property.slug}`

  // Datos estructurados (schema.org/JSON-LD) — ver
  // claude/estrategia-seo-google-oct-2026.md, sección 1. No se incluye la
  // dirección exacta (tampoco se publica en el sitio), solo la
  // colonia/ciudad vía locationBadge, igual que en el resto del sitio.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.metaDescription,
    url: canonicalUrl,
    image: property.gallery.map((img) => img.src),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.locationBadge,
      addressRegion: "Baja California",
      addressCountry: "MX",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability:
        property.status === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: canonicalUrl,
    },
    seller: {
      "@type": "RealEstateAgent",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar mode="property" whatsappUrl={whatsappUrl} />
      <main>
        <PropertyHero
          property={{
            locationBadge: property.locationBadge,
            titleHook: property.titleHook,
            title: property.title,
            description: property.description,
            price: property.price,
            currency: property.currency,
            heroImage: property.heroImage,
          }}
          whatsappUrl={whatsappUrl}
        />
        <PropertyTrustBar />
        <Galeria fotos={property.gallery} />
        <Ubicacion property={property} />
        <Espacios property={property} />
        <PropertyHubStrength />
        <Facilidades property={property} />
        <Contacto property={property} />
      </main>
      <SiteFooter disclaimer={property.disclaimer} />
      <FloatingButtons whatsappUrl={whatsappUrl} />
    </>
  )
}
