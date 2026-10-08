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
