import { neon } from "@neondatabase/serverless"
import { resolveAdminIcon } from "@/lib/admin-icon-map"
import { WHATSAPP_NUMBER } from "@/lib/site"
import type { Property, GaleriaImage, IconItem, PagoOption } from "@/lib/properties"

// Lee las propiedades desde Postgres (Vercel Storage / Neon) en vez del
// arreglo estático de lib/properties.ts. Ver
// claude/panel-alta-propiedades-diseno.md — Pieza 1: el panel de alta
// (app/api/admin/properties/route.ts) ya escribía aquí desde hace días,
// pero ninguna página pública leía de esta tabla todavía — el sitio
// seguía mostrando solo las 7 propiedades del arreglo de código, así que
// un "Publicar" nuevo en el panel nunca aparecía en bienesraiceshub.com.
// Esta es la pieza que faltaba: ahora el Hub, la página de cada propiedad
// y el catálogo de Isis leen de la misma base de datos donde publica el
// panel.
//
// lib/properties.ts se deja intacto (tipos compartidos, y el arreglo
// estático como referencia histórica de cómo se veían los datos antes de
// la migración) — este archivo es la fuente de datos real para las
// páginas públicas de aquí en adelante.

type PropertyRow = {
  slug: string
  status: "disponible" | "apartada" | "vendida"
  location_badge: string
  title: string
  description: string
  price: string | number
  currency: string
  hero_image: { src: string; alt: string }
  meta_title: string
  meta_description: string
  gallery: { src: string; alt: string }[]
  ubicacion_heading: string
  ubicacion_subheading: string
  ubicacion_items: { icon: string; title: string; description: string }[]
  map_embed_src: string
  map_caption: string
  espacios_heading: string
  espacios_subheading: string
  espacios_items: { icon: string; title: string; description: string }[]
  formas_de_pago: { icon: string; label: string }[]
  contacto_heading: string
  contacto_subheading: string
  whatsapp_message: string
  disclaimer: string
}

function mapIconItems(items: PropertyRow["ubicacion_items"]): IconItem[] {
  return items.map((item) => ({
    icon: resolveAdminIcon(item.icon),
    title: item.title,
    description: item.description,
  }))
}

function mapPagoOptions(items: PropertyRow["formas_de_pago"]): PagoOption[] {
  return items.map((item) => ({
    icon: resolveAdminIcon(item.icon),
    label: item.label,
  }))
}

function mapRowToProperty(row: PropertyRow): Property {
  return {
    slug: row.slug,
    status: row.status,
    locationBadge: row.location_badge,
    title: row.title,
    description: row.description,
    price: Number(row.price),
    currency: row.currency,
    heroImage: row.hero_image,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    gallery: row.gallery,
    ubicacionHeading: row.ubicacion_heading,
    ubicacionSubheading: row.ubicacion_subheading,
    ubicacionItems: mapIconItems(row.ubicacion_items),
    mapEmbedSrc: row.map_embed_src,
    mapCaption: row.map_caption,
    espaciosHeading: row.espacios_heading,
    espaciosSubheading: row.espacios_subheading,
    espaciosItems: mapIconItems(row.espacios_items),
    formasDePago: mapPagoOptions(row.formas_de_pago),
    contactoHeading: row.contacto_heading,
    contactoSubheading: row.contacto_subheading,
    // whatsappNumber no se guarda por fila (ver
    // panel-alta-propiedades-diseno.md) — todas las propiedades comparten
    // el mismo número de contacto general.
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage: row.whatsapp_message,
    disclaimer: row.disclaimer,
  }
}

export async function getAllProperties(): Promise<Property[]> {
  if (!process.env.POSTGRES_URL) return []
  const sql = neon(process.env.POSTGRES_URL)
  const rows = (await sql`SELECT * FROM properties ORDER BY created_at ASC`) as unknown as PropertyRow[]
  return rows.map(mapRowToProperty)
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  if (!process.env.POSTGRES_URL) return undefined
  const sql = neon(process.env.POSTGRES_URL)
  const rows = (await sql`SELECT * FROM properties WHERE slug = ${slug} LIMIT 1`) as unknown as PropertyRow[]
  return rows[0] ? mapRowToProperty(rows[0]) : undefined
}

// Mismo orden de preferencia que la versión histórica en lib/properties.ts,
// aplicado ahora sobre las propiedades que vienen de la base de datos.
const HERO_MOSAIC_PRIORITY = [
  "fachada",
  "patio",
  "sala",
  "comedor",
  "cocina-barra",
  "recamara-principal",
  "estancia",
  "cocina",
  "sala-2",
  "patio-lateral",
  "recamara-3",
  "recamara-2",
  "bano",
  "recamara-literas",
]

function heroMosaicRank(img: GaleriaImage): number {
  const basename = img.src.split("/").pop()?.replace(/\.[a-z]+$/i, "") ?? ""
  const rank = HERO_MOSAIC_PRIORITY.indexOf(basename)
  return rank === -1 ? HERO_MOSAIC_PRIORITY.length : rank
}

export function getHeroMosaicImages(properties: Property[], count = 8): GaleriaImage[] {
  const pool = properties.flatMap((p) => p.gallery).sort((a, b) => heroMosaicRank(a) - heroMosaicRank(b))
  if (pool.length === 0) return []
  return Array.from({ length: count }, (_, i) => pool[i % pool.length])
}
