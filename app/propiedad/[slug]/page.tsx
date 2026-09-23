import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { PropertyHero } from "@/components/property-hero"
import { Galeria } from "@/components/galeria"
import { Ubicacion } from "@/components/ubicacion"
import { Espacios } from "@/components/espacios"
import { Facilidades } from "@/components/facilidades"
import { Contacto } from "@/components/contacto"
import { SiteFooter } from "@/components/site-footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { getProperty, getPropertyWhatsAppUrl, properties } from "@/lib/properties"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getProperty(slug)
  if (!property) return {}

  return {
    title: property.metaTitle,
    description: property.metaDescription,
    openGraph: {
      title: property.metaTitle,
      description: property.metaDescription,
      type: "website",
      locale: "es_MX",
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
  const property = getProperty(slug)

  if (!property) {
    notFound()
  }

  const whatsappUrl = getPropertyWhatsAppUrl(property)

  return (
    <>
      <Navbar mode="property" whatsappUrl={whatsappUrl} />
      <main>
        <PropertyHero
          property={{
            locationBadge: property.locationBadge,
            title: property.title,
            description: property.description,
            price: property.price,
            currency: property.currency,
            heroImage: property.heroImage,
          }}
          whatsappUrl={whatsappUrl}
        />
        <Galeria fotos={property.gallery} />
        <Ubicacion property={property} />
        <Espacios property={property} />
        <Facilidades property={property} />
        <Contacto property={property} />
      </main>
      <SiteFooter disclaimer={property.disclaimer} />
      <FloatingButtons whatsappUrl={whatsappUrl} />
    </>
  )
}
