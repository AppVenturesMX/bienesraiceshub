import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getPropertyBySlug } from "@/lib/properties-db"

// Endpoint público de solo lectura (sin sesión de admin, CORS abierto) para
// que las landings independientes de cada propiedad (arrecife-landing,
// granizo-landing, amatista-landing, etc. — repos aparte de este Hub, cada
// uno con su propio dominio en Vercel) puedan mostrar en vivo el mismo
// contenido que Alex edita desde /admin/propiedades/administrar/[slug], sin
// necesitar un deploy de código cada vez que cambia una foto o un texto.
//
// A propósito expone solo lectura y solo los campos de "contenido editable"
// (texto + fotos) que el formulario de alta/edición cubre hoy. No incluye
// ubicacionItems / espaciosItems / formasDePago: esos arreglos guardan un
// LucideIcon (componente de React) por renglón, que no es serializable a
// JSON — además cada landing ya dibuja esas secciones con su propio diseño
// fijo en código, así que no son parte de lo que este endpoint sincroniza.
//
// Sin caché (revalidate 0): cada landing que lo consuma ve el cambio del
// panel de inmediato, no en el siguiente build.
export const revalidate = 0

type RouteParams = { params: Promise<{ slug: string }> }

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    return NextResponse.json(
      { error: `No existe ninguna propiedad con el slug "${slug}".` },
      { status: 404, headers: CORS_HEADERS },
    }
  }

  const publicProperty = {
    slug: property.slug,
    status: property.status,
    locationBadge: property.locationBadge,
    titleHook: property.titleHook ?? "",
    title: property.title,
    description: property.description,
    price: property.price,
    currency: property.currency,
    heroImage: property.heroImage,
    gallery: property.gallery,
    metaTitle: property.metaTitle,
    metaDescription: property.metaDescription,
    contactoHeading: property.contactoHeading,
    contactoSubheading: property.contactoSubheading,
    whatsappMessage: property.whatsappMessage,
    disclaimer: property.disclaimer,
  }

  return NextResponse.json(
    { property: publicProperty },
    { headers: { ...CORS_HEADERS, "Cache-Control": "public, max-age=0, must-revalidate" } },
  )
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
