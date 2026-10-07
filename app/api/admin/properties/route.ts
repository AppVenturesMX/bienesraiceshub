import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { neon } from "@neondatabase/serverless"
import { ADMIN_ICON_NAMES } from "@/lib/admin-icon-map"
import type { PropertyDraft, DraftIconItem, DraftPagoOption } from "@/lib/admin-property-draft"

// Publicación de una propiedad nueva directo a Postgres (Vercel Storage /
// Neon, ver claude/panel-alta-propiedades-diseno.md — Pieza 1, ya
// conectado y con las 7 propiedades existentes migradas).
//
// El panel todavía no sube fotos ni mapa embebido (fuera de alcance de
// esta primera versión — ver nota en la página de alta), así que las
// columnas NOT NULL hero_image / gallery / map_embed_src / map_caption se
// llenan con un placeholder genérico (una tarjeta "Foto próximamente" en
// SVG inline, sin depender de ningún archivo del repo). Alex completa esas
// fotos y el mapa después, subiéndolas por GitHub y actualizando esas
// columnas a mano (mismo proceso manual de siempre), o cuando se agregue
// carga de fotos al panel.

const PLACEHOLDER_IMAGE = {
  src:
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">` +
        `<rect width="800" height="600" fill="#d1fae5"/>` +
        `<text x="400" y="300" font-family="sans-serif" font-size="28" fill="#059669" text-anchor="middle" dominant-baseline="middle">Foto próximamente</text>` +
        `</svg>`,
    ),
  alt: "Foto próximamente",
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isValidIconItem(value: unknown): value is DraftIconItem {
  if (typeof value !== "object" || value === null) return false
  const item = value as Record<string, unknown>
  return (
    isNonEmptyString(item.icon) &&
    ADMIN_ICON_NAMES.includes(item.icon as string) &&
    isNonEmptyString(item.title) &&
    isNonEmptyString(item.description)
  )
}

function isValidPagoOption(value: unknown): value is DraftPagoOption {
  if (typeof value !== "object" || value === null) return false
  const item = value as Record<string, unknown>
  return isNonEmptyString(item.icon) && ADMIN_ICON_NAMES.includes(item.icon as string) && isNonEmptyString(item.label)
}

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

function validateDraft(draft: PropertyDraft): string | null {
  if (!isNonEmptyString(draft.slug) || !SLUG_PATTERN.test(draft.slug)) {
    return "El slug es obligatorio y solo puede tener letras minúsculas, números y guiones (ej. mi-propiedad-tijuana)."
  }
  if (!["disponible", "apartada", "vendida"].includes(draft.status)) {
    return "Estado inválido."
  }
  if (
    !isNonEmptyString(draft.locationBadge) ||
    !isNonEmptyString(draft.title) ||
    !isNonEmptyString(draft.description) ||
    !isNonEmptyString(draft.metaTitle) ||
    !isNonEmptyString(draft.metaDescription) ||
    !isNonEmptyString(draft.ubicacionHeading) ||
    !isNonEmptyString(draft.ubicacionSubheading) ||
    !isNonEmptyString(draft.mapCaption) ||
    !isNonEmptyString(draft.espaciosHeading) ||
    !isNonEmptyString(draft.espaciosSubheading) ||
    !isNonEmptyString(draft.contactoHeading) ||
    !isNonEmptyString(draft.contactoSubheading) ||
    !isNonEmptyString(draft.whatsappMessage) ||
    !isNonEmptyString(draft.disclaimer)
  ) {
    return "Faltan campos de texto obligatorios en el contenido generado."
  }
  if (typeof draft.price !== "number" || !Number.isFinite(draft.price) || draft.price <= 0) {
    return "El precio debe ser un número mayor a cero."
  }
  if (!isNonEmptyString(draft.currency) || !["USD", "MXN"].includes(draft.currency)) {
    return "La moneda debe ser USD o MXN."
  }
  if (!Array.isArray(draft.ubicacionItems) || draft.ubicacionItems.length === 0 || !draft.ubicacionItems.every(isValidIconItem)) {
    return "Los puntos de ubicación son inválidos o usan un ícono no permitido."
  }
  if (!Array.isArray(draft.espaciosItems) || draft.espaciosItems.length === 0 || !draft.espaciosItems.every(isValidIconItem)) {
    return "Los puntos de espacios son inválidos o usan un ícono no permitido."
  }
  if (!Array.isArray(draft.formasDePago) || draft.formasDePago.length === 0 || !draft.formasDePago.every(isValidPagoOption)) {
    return "Las formas de pago son inválidas o usan un ícono no permitido."
  }
  return null
}

export async function POST(request: NextRequest) {
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
        ${JSON.stringify(PLACEHOLDER_IMAGE)}::jsonb, ${draft.metaTitle}, ${draft.metaDescription}, ${JSON.stringify([PLACEHOLDER_IMAGE])}::jsonb,
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
    note:
      "Propiedad publicada. Las fotos y el mapa quedaron con un marcador temporal — súbelas por GitHub y actualiza esas columnas cuando las tengas listas.",
  })
}
