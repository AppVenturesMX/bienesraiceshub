import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import type { PropertyDraft } from "@/lib/admin-property-draft"
import { PLACEHOLDER_IMAGE, normalizeMapEmbedSrc } from "@/lib/admin-property-draft"
import { validateDraft } from "@/lib/admin-validate-draft"

// Edición y borrado de una propiedad puntual ya publicada, para
// app/admin/(protected)/propiedades/administrar/[slug]/page.tsx — antes
// de este archivo el panel solo podía dar de alta (POST en
// app/api/admin/properties/route.ts); no había forma de corregir ni quitar
// una propiedad ya publicada salvo editando la base de datos a mano.
//
// El slug es la llave primaria de la tabla y no se puede renombrar desde
// aquí todavía (si el draft trae un slug distinto al de la URL, se ignora
// y se usa el de la URL). El campo de Google Maps (draft.mapEmbedSrc) sí se
// lee y se guarda aquí — se normaliza otra vez al patrón de embed por si
// Alex pegó un link nuevo directo en el panel de edición (ver
// normalizeMapEmbedSrc en lib/admin-property-draft.ts).

type PropertyRow = {
  slug: string
  status: "disponible" | "apartada" | "vendida"
  location_badge: string
  title_hook: string | null
  title: string
  description: string
  price: string | number
  currency: string
  hero_image: { src: string; alt: string } | null
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

function mapRowToDraft(row: PropertyRow): PropertyDraft {
  return {
    slug: row.slug,
    status: row.status,
    locationBadge: row.location_badge,
    titleHook: row.title_hook ?? "",
    title: row.title,
    description: row.description,
    price: Number(row.price),
    currency: row.currency,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    heroImage: row.hero_image ?? null,
    gallery: row.gallery ?? [],
    ubicacionHeading: row.ubicacion_heading,
    ubicacionSubheading: row.ubicacion_subheading,
    ubicacionItems: row.ubicacion_items,
    mapCaption: row.map_caption,
    mapEmbedSrc: row.map_embed_src ?? "",
    espaciosHeading: row.espacios_heading,
    espaciosSubheading: row.espacios_subheading,
    espaciosItems: row.espacios_items,
    formasDePago: row.formas_de_pago,
    contactoHeading: row.contacto_heading,
    contactoSubheading: row.contacto_subheading,
    whatsappMessage: row.whatsapp_message,
    disclaimer: row.disclaimer,
  }
}

type RouteParams = { params: Promise<{ slug: string }> }

export async function GET(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }
  const { slug } = await params

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: "No hay base de datos conectada." }, { status: 501 })
  }

  const sql = neon(process.env.POSTGRES_URL)
  const rows = (await sql`SELECT * FROM properties WHERE slug = ${slug} LIMIT 1`) as unknown as PropertyRow[]

  if (rows.length === 0) {
    return NextResponse.json({ error: `No existe ninguna propiedad con el slug "${slug}".` }, { status: 404 })
  }

  return NextResponse.json({ draft: mapRowToDraft(rows[0]) })
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }
  const { slug } = await params

  let draft: PropertyDraft
  try {
    draft = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido (se esperaba JSON)." }, { status: 400 })
  }
  // El slug no se puede cambiar desde el panel todavía — se usa siempre el
  // de la URL, sin importar lo que traiga el cuerpo.
  draft.slug = slug

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: "No hay base de datos conectada." }, { status: 501 })
  }

  const validationError = validateDraft(draft)
  if (validationError) {
    return NextResponse.json({ error: validationError, draft }, { status: 400 })
  }

  const sql = neon(process.env.POSTGRES_URL)
  // Ver el mismo guard en app/api/admin/properties/route.ts — idempotente,
  // se asegura de que la columna exista antes del UPDATE sin depender de
  // una migración aparte.
  await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS title_hook TEXT NOT NULL DEFAULT ''`
  const heroImage = draft.heroImage ?? PLACEHOLDER_IMAGE
  const gallery = draft.gallery && draft.gallery.length > 0 ? draft.gallery : [PLACEHOLDER_IMAGE]
  const mapEmbedSrc = await normalizeMapEmbedSrc(draft.mapEmbedSrc ?? "")

  try {
    const rows = await sql`
      UPDATE properties SET
        status = ${draft.status},
        location_badge = ${draft.locationBadge},
        title_hook = ${draft.titleHook ?? ""},
        title = ${draft.title},
        description = ${draft.description},
        price = ${draft.price},
        currency = ${draft.currency},
        hero_image = ${JSON.stringify(heroImage)}::jsonb,
        meta_title = ${draft.metaTitle},
        meta_description = ${draft.metaDescription},
        gallery = ${JSON.stringify(gallery)}::jsonb,
        ubicacion_heading = ${draft.ubicacionHeading},
        ubicacion_subheading = ${draft.ubicacionSubheading},
        ubicacion_items = ${JSON.stringify(draft.ubicacionItems)}::jsonb,
        map_embed_src = ${mapEmbedSrc},
        map_caption = ${draft.mapCaption},
        espacios_heading = ${draft.espaciosHeading},
        espacios_subheading = ${draft.espaciosSubheading},
        espacios_items = ${JSON.stringify(draft.espaciosItems)}::jsonb,
        formas_de_pago = ${JSON.stringify(draft.formasDePago)}::jsonb,
        contacto_heading = ${draft.contactoHeading},
        contacto_subheading = ${draft.contactoSubheading},
        whatsapp_message = ${draft.whatsappMessage},
        disclaimer = ${draft.disclaimer}
      WHERE slug = ${slug}
      RETURNING slug
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: `No existe ninguna propiedad con el slug "${slug}".` }, { status: 404 })
    }
  } catch (err) {
    console.error("Error actualizando propiedad en Postgres:", err)
    return NextResponse.json({ error: "No se pudo guardar los cambios. Intenta de nuevo.", draft }, { status: 500 })
  }

  return NextResponse.json({ ok: true, slug })
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }
  const { slug } = await params

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: "No hay base de datos conectada." }, { status: 501 })
  }

  const sql = neon(process.env.POSTGRES_URL)

  try {
    const rows = await sql`DELETE FROM properties WHERE slug = ${slug} RETURNING slug`
    if (rows.length === 0) {
      return NextResponse.json({ error: `No existe ninguna propiedad con el slug "${slug}".` }, { status: 404 })
    }
  } catch (err) {
    console.error("Error borrando propiedad en Postgres:", err)
    return NextResponse.json({ error: "No se pudo borrar la propiedad. Intenta de nuevo." }, { status: 500 })
  }

  return NextResponse.json({ ok: true, slug })
}
