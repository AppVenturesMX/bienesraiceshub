// Constantes de marca y negocio compartidas por todo el sitio.
// Bienes Raíces Hub es una marca de corretaje propia (no un directorio abierto):
// cada propiedad listada aquí pasa por el mismo proceso conectado —
// precalificación, cita y cierre — hacia preaprueba.com en cada una.

export const SITE_NAME = "Bienes Raíces Hub"
export const SITE_TAGLINE =
  "Precalificación de crédito, cita y cierre, coordinados en un mismo proceso — sin que tengas que armarlo tú por tu cuenta."
export const SITE_DESCRIPTION =
  "Directorio de propiedades en venta en Baja California, cada una con precalificación de crédito sin costo vía preaprueba.com."

export const PREAPRUEBA_URL = "https://preaprueba.com"

// Número de WhatsApp de contacto general del asesor (usado como fallback
// cuando una sección no está atada a una propiedad específica).
export const WHATSAPP_NUMBER = "5216641200764"

export function buildWhatsAppUrl(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const GENERAL_WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, vi Bienes Raíces Hub y quiero más información.",
)

// CTAs del selector de intención (comprar / vender / rentar) en el hero del Hub.
export const SELL_WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, quiero vender mi propiedad. ¿Me pueden ayudar?",
)
export const RENT_WHATSAPP_URL = buildWhatsAppUrl(
  "Hola, busco rentar una propiedad en Baja California. ¿Qué tienen disponible?",
)
