import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import type { PropertyDraft } from "@/lib/admin-property-draft"
import { PLACEHOLDER_IMAGE } from "@/lib/admin-property-draft"
import { validateDraft } from "@/lib/admin-validate-draft"

// Publicación de una propiedad nueva directo a Postgres (Vercel Storage /
// Neon, ver claude/panel-alta-propiedades-diseno.md — Pieza 1, ya
// conectado y con las 7 propiedades existentes migradas).
//
// El panel ya sube fotos (ver app/api/admin/upload-photo/route.ts y el
// botón "Subir fotos" en la página de alta) — si el draft trae
// heroImage/gallery se usan esas. El panel todavía no sube un mapa
// embebido (fuera de alcance de esta primera versión), así que la columna
// NOT NULL map_embed_src se llena con cadena vacía; map_caption sí lo
// llena la IA. Si Alex publica sin haber subido ninguna foto (por ejemplo
// para completar los datos primero y las fotos después a mano), las
// columnas NOT NULL hero_image/gallery se llenan con un placeholder
// genérico (una tarjeta "Foto próximamente" en SVG inline, sin depender de
// ningún archivo del repo) que puede reemplazar después directo desde el
// panel de edición (ver app/api/admin/properties/[slug]/route.ts y
// app/admin/(protected)/propiedades/administrar/).
//
// La validación del borrador (validateDraft y sus helpers) vivía aquí
// duplicada — se movió a lib/admin-validate-draft.ts para que la ruta de
// edición ([slug]/route.ts) valide exactamente igual.

// Listado para el panel de administración
// (app/admin/(protected)/propiedades/administrar/page.tsx). Solo las
// columnas que necesita la tabla — no el objeto completo, que sí se trae
// con GET /api/admin/properties/[slug] al entrar a editar una propiedad
// puntual.
type PropertyListRow = {
  slug: string
  status: "disponible" | "apartada" | "vendida"
  location_badge: string
  title: string
  price: string | number
  currency: string
  hero_image: { src: string; alt: string } | null
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ properties: [] })
  }

  const sql = neon(process.env.POSTGRES_URL)
  const rows = (await sql`
    SELECT slug, status, location_badge, title, price, currency, hero_image
    FROM properties
    ORDER BY created_at DESC
  `) as unknown as PropertyListRow[]

  const properties = rows.map((row) => ({
    slug: row.slug,
    status: row.status,
    locationBadge: row.location_badge,
    title: row.title,
    price: Number(row.price),
    currency: row.currency,
    heroImage: row.hero_image,
  }))

  return NextResponse.json({ properties })
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }

  let draft: PropertyDraft
  try {
    draft = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido (se esperaba JSON)." }, { status: 400 })
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json(
      {
        error:
          "Todavía no hay una base de datos conectada al proyecto (Vercel → bienesraiceshub → Storage → conectar Postgres). Mientras tanto, copia el JSON de abajo y pégalo como un nuevo objeto en el arreglo `properties` de lib/properties.ts, siguiendo el proceso manual de siempre.",
        draft,
      },
      { status: 501 },
    )
  }

  const validationError = validateDraft(draft)
  if (validationError) {
    return NextResponse.json({ error: validationError, draft }, { status: 400 })
  }

  const sql = neon(process.env.POSTGRES_URL)

  // Si Alex ya subió fotos con el nuevo botón de carga (ver
  // app/api/admin/upload-photo/route.ts), se usan esas. Si no, se sigue
  // usando el marcador genérico, igual que antes de que existiera la carga
  // de fotos — así el botón "Publicar" nunca queda bloqueado por no tener
  // fotos a la mano.
  const heroImage = draft.heroImage ?? PLACEHOLDER_IMAGE
  const gallery = draft.gallery && draft.gallery.length > 0 ? draft.gallery : [PLACEHOLDER_IMAGE]
  const usedPlaceholder = !draft.heroImage && (!draft.gallery || draft.gallery.length === 0)

  try {
    const rows = await sql`
      INSERT INTO properties (
        slug, status, location_badge, title, description, price, currency,
        hero_image, meta_title, meta_description, gallery,
        ubicacion_heading, ubicacion_subheading, ubicacion_items,
        map_embed_src, map_caption,
        espacios_heading, espacios_subheading, espacios_items,
        formas_de_pago,
        contacto_heading, contacto_subheading, whatsapp_message, disclaimer
      ) VALUES (
        ${draft.slug}, ${draft.status}, ${draft.locationBadge}, ${draft.title}, ${draft.description}, ${draft.price}, ${draft.currency},
        ${JSON.stringify(heroImage)}::jsonb, ${draft.metaTitle}, ${draft.metaDescription}, ${JSON.stringify(gallery)}::jsonb,
        ${draft.ubicacionHeading}, ${draft.ubicacionSubheading}, ${JSON.stringify(draft.ubicacionItems)}::jsonb,
        ${""}, ${draft.mapCaption},
        ${draft.espaciosHeading}, ${draft.espaciosSubheading}, ${JSON.stringify(draft.espaciosItems)}::jsonb,
        ${JSON.stringify(draft.formasDePago)}::jsonb,
        ${draft.contactoHeading}, ${draft.contactoSubheading}, ${draft.whatsappMessage}, ${draft.disclaimer}
      )
      ON CONFLICT (slug) DO NOTHING
      RETURNING slug
    `

    if (rows.length === 0) {
      return NextResponse.json(
        { error: `Ya existe una propiedad publicada con el slug "${draft.slug}". Cambia el slug e intenta de nuevo.`, draft },
        { status: 409 },
      )
    }
  } catch (err) {
    console.error("Error insertando propiedad en Postgres:", err)
    return NextResponse.json(
      { error: "No se pudo guardar la propiedad en la base de datos. Intenta de nuevo.", draft },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    slug: draft.slug,
    note: usedPlaceholder
      ? "Propiedad publicada sin fotos — quedó con un marcador temporal. Puedes subir las fotos después desde /admin/propiedades/administrar."
      : "Propiedad publicada con las fotos que subiste. El mapa embebido queda vacío por ahora — se agrega a mano en la base de datos si lo necesitas.",
  })
}
