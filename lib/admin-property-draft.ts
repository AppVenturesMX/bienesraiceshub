// Tipos compartidos del panel de alta de propiedades.
//
// `PropertyRawInput` es lo que hoy Alex manda "en bruto" (ver
// claude/bienes-raices-hub-proceso-alta-propiedades.md, sección 1). El
// formulario del panel lo captura con campos en vez de texto libre.
//
// `PropertyDraft` es el resultado de la generación con IA: el mismo
// contenido que antes se pegaba a mano en `lib/properties.ts`, listo para
// revisar y editar antes de publicar. Usa `icon` como string (ver
// `admin-icon-map.ts`) en vez del componente de `lucide-react`, porque
// este objeto va a terminar guardado en una base de datos. El mismo tipo se
// reutiliza para editar una propiedad ya publicada (ver
// app/api/admin/properties/[slug]/route.ts) — es el shape que viaja entre
// la base de datos y el panel en los dos sentidos.

export type PropertyStatus = "disponible" | "apartada" | "vendida"

export type PropertyRawInput = {
  ubicacionColoniaSeccion: string
  ciudad: string
  precio: number
  moneda: "USD" | "MXN"
  estado: PropertyStatus
  recamaras?: number
  banos?: number
  m2Terreno?: number
  m2Construccion?: number
  ventajasUbicacion: string // texto libre: 3 ventajas, con tiempos/distancias reales
  caracteristicas: string // texto libre: 4-5 características de la propiedad
  formasDePagoTexto: string // texto libre, p.ej. "Efectivo, Crédito Bancario, Infonavit"
  whatsappAsesor?: string
  condicionEspecialDisclaimer?: string
  mapsLink?: string
  notasAdicionales?: string
}

export type DraftIconItem = {
  icon: string
  title: string
  description: string
}

export type DraftPagoOption = {
  icon: string
  label: string
}

// Foto subida por el panel (portada o galería). Mismo shape que
// `GaleriaImage` en lib/properties.ts del repo principal — src es la URL
// pública de Vercel Blob una vez subida la foto, no una ruta del repo.
export type DraftImage = {
  src: string
  alt: string
}

export type PropertyDraft = {
  slug: string
  status: PropertyStatus
  locationBadge: string
  title: string
  description: string
  price: number
  currency: string
  metaTitle: string
  metaDescription: string
  // null / arreglo vacío mientras no se haya subido ninguna foto — el
  // backend usa un placeholder genérico en ese caso (ver
  // app/api/admin/properties/route.ts).
  heroImage: DraftImage | null
  gallery: DraftImage[]
  ubicacionHeading: string
  ubicacionSubheading: string
  ubicacionItems: DraftIconItem[]
  mapCaption: string
  // URL lista para usar como `src` de un <iframe> (patrón
  // "https://maps.google.com/maps?q=...&z=15&output=embed", ver
  // lib/properties.ts). Puede quedar vacía ("") si todavía no hay mapa —
  // ver normalizeMapEmbedSrc() más abajo para cómo se construye a partir
  // de lo que Alex pega en el panel.
  mapEmbedSrc: string
  espaciosHeading: string
  espaciosSubheading: string
  espaciosItems: DraftIconItem[]
  formasDePago: DraftPagoOption[]
  contactoHeading: string
  contactoSubheading: string
  whatsappMessage: string
  disclaimer: string
}

export const DEFAULT_DISCLAIMER_USD =
  "Precio expresado en dólares americanos (USD). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso."

export const DEFAULT_DISCLAIMER_MXN =
  "Precio expresado en pesos mexicanos (MXN). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso."

// Marcador genérico usado cuando se publica o se guarda una edición sin
// fotos propias — antes vivía solo en app/api/admin/properties/route.ts;
// se movió aquí para que la ruta de edición (app/api/admin/properties/[slug]/route.ts)
// lo use exactamente igual.
export const PLACEHOLDER_IMAGE: DraftImage = {
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

// Hosts de los links cortos que da el botón "Compartir" de Google Maps
// (sobre todo desde el celular) — no traen coordenadas ni nombre de lugar
// en la URL misma, hay que seguir el redirect para encontrarlos.
const GOOGLE_MAPS_SHORT_LINK_HOSTS = new Set(["maps.app.goo.gl", "goo.gl"])

function isGoogleMapsUrl(url: URL): boolean {
  if (GOOGLE_MAPS_SHORT_LINK_HOSTS.has(url.hostname)) return true
  return url.hostname.includes("google.") && url.pathname.includes("/maps")
}

// Dado un link normal (largo) de Google Maps ya resuelto — del tipo que da
// "Compartir → Copiar enlace" en desktop, con la forma
// ".../maps/place/<Nombre>/@<lat>,<lng>,<zoom>z/..." o ".../maps/@<lat>,<lng>,<zoom>z" —
// intenta sacar algo que Google SÍ reconozca como ubicación dentro del
// patrón de embed "q=...". Si no encuentra nada reconocible regresa null
// (y el llamador decide el fallback) en vez de meter la URL completa como
// si fuera el nombre de un lugar, que es justo el bug que esto corrige:
// Google Maps no "reconoce" una URL pegada como texto de búsqueda.
function extractLocationFromResolvedUrl(url: URL): string | null {
  // .../maps/.../@<lat>,<lng>,<zoom>z/...
  const coordsMatch = url.pathname.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
  if (coordsMatch) {
    const [, lat, lng] = coordsMatch
    return `${lat},${lng}`
  }

  // .../maps/place/<Nombre+del+lugar>/...
  const placeMatch = url.pathname.match(/\/place\/([^/]+)/)
  if (placeMatch) {
    return decodeURIComponent(placeMatch[1].replace(/\+/g, " "))
  }

  // .../maps?q=<lo que sea> o .../maps/search/?q=<lo que sea>
  const qParam = url.searchParams.get("q")
  if (qParam) return qParam

  return null
}

// Resuelve un link de Google Maps (largo o corto tipo maps.app.goo.gl) a la
// URL de embed que se usa como `src` de un <iframe>. Si es un link corto,
// sigue el redirect para encontrar las coordenadas o el nombre del lugar
// reales. Regresa null cuando `rawInput` no es una URL de Google Maps en
// absoluto (texto libre, p. ej. una descripción del lugar) o cuando es una
// pero no se le pudo sacar nada reconocible — en ambos casos el llamador
// cae al mismo patrón de siempre, tratando el texto como descripción.
async function embedSrcFromGoogleMapsLink(rawInput: string): Promise<string | null> {
  let url: URL
  try {
    url = new URL(rawInput)
  } catch {
    return null // no es una URL -> es texto plano
  }

  if (!isGoogleMapsUrl(url)) return null

  let resolved = url
  if (GOOGLE_MAPS_SHORT_LINK_HOSTS.has(url.hostname)) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)
      const res = await fetch(rawInput, { redirect: "follow", signal: controller.signal })
      clearTimeout(timeout)
      resolved = new URL(res.url)
    } catch {
      return null // no se pudo resolver el link corto a tiempo
    }
  }

  const location = extractLocationFromResolvedUrl(resolved)
  if (!location) return null

  return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=15&output=embed`
}

// Convierte lo que Alex pega en el campo "Link de Google Maps" (del panel
// de alta o de edición) en una URL de embed usable directo como `src` de
// un <iframe> — mismo patrón que ya traían las propiedades migradas a mano
// a lib/properties.ts: "https://maps.google.com/maps?q=<texto>&z=15&output=embed".
//
// Acepta estas formas de pegado, de más a menos específica:
// 1. Código <iframe ... src="...output=embed...">...</iframe> (lo que da
//    el botón "Compartir → Insertar un mapa" de Google Maps) — se extrae
//    el src tal cual.
// 2. Una URL que ya es de embed (contiene "output=embed") — se usa tal cual.
// 3. Un link normal de Google Maps — largo (con coordenadas "@lat,lng" o
//    "/place/<nombre>") o corto (maps.app.goo.gl / goo.gl, los que da el
//    botón "Compartir" del celular) — de los que no se pueden usar directo
//    en un <iframe> por X-Frame-Options: se le sacan las coordenadas o el
//    nombre del lugar (siguiendo el redirect si hace falta) y se arma un
//    link de embed nuevo con esos datos, en vez de pegar la URL completa
//    como si fuera el nombre de un lugar (eso es lo que hacía que Google
//    Maps "no reconociera la ubicación": una URL no es una dirección).
// 4. Cualquier otro texto: una descripción del lugar ("Sección Monumental,
//    Playas de Tijuana") — se envuelve en el patrón de embed de arriba,
//    igual que se hacía a mano.
// Si Alex no pega nada, regresa "" (sin mapa, como hasta ahora).
export async function normalizeMapEmbedSrc(rawInput: string): Promise<string> {
  const trimmed = (rawInput ?? "").trim()
  if (!trimmed) return ""

  const iframeSrcMatch = trimmed.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)
  if (iframeSrcMatch) return iframeSrcMatch[1]

  if (trimmed.includes("output=embed")) return trimmed

  const fromGoogleMapsLink = await embedSrcFromGoogleMapsLink(trimmed)
  if (fromGoogleMapsLink) return fromGoogleMapsLink

  return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&z=15&output=embed`
}
