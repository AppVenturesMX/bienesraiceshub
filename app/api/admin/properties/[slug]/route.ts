import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import type { PropertyDraft } from "@/lib/admin-property-draft"
import { PLACEHOLDER_IMAGE } from "@/lib/admin-property-draft"
import { validateDraft } from "@/lib/admin-validate-draft"

// Edición y borrado de una propiedad puntual ya publicada, para
// app/admin/(protected)/propiedades/administrar/[slug]/page.tsx — antes
// de este archivo el panel solo podía dar de alta (POST en
// app/api/admin/properties/route.ts); no había forma de corregir ni quitar
// una propiedad ya publicada salvo editando la base de datos a mano.
//
// El slug es la llave primaria de la tabla y no se puede renombrar desde
// aquí todavía (si el draft trae un slug distinto al de la URL, se ignora
// y se usa el de la URL) — igual que el formulario de alta, esta primera
// versión de edición no toca map_embed_src: esa columna se sigue llenando
// a mano en la base de datos cuando aplica, así una edición nunca la borra
// sin querer.

type PropertyRow = {
  slug: string
  status: "disponible" | "apartada" | "vendida"
  location_badge: string
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
  const heroImage = draft.heroImage ?? PLACEHOLDER_IMAGE
  const gallery = draft.gallery && draft.gallery.length > 0 ? draft.gallery : [PLACEHOLDER_IMAGE]

  try {
    // map_embed_src no se toca aquí a propósito (ver comentario arriba).
    const rows = await sql`
      UPDATE properties SET
        status = ${draft.status},
        location_badge = ${draft.locationBadge},
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
