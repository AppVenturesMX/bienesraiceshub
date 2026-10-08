// Validación del borrador de propiedad, compartida entre el alta
// (app/api/admin/properties/route.ts) y la edición
// (app/api/admin/properties/[slug]/route.ts). Antes vivía duplicada solo en
// la ruta de alta; se mueve aquí para que ambas rutas validen exactamente
// igual y no se desalineen con el tiempo.

import { ADMIN_ICON_NAMES } from "@/lib/admin-icon-map"
import type { PropertyDraft, DraftIconItem, DraftPagoOption, DraftImage } from "@/lib/admin-property-draft"

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

export function isValidIconItem(value: unknown): value is DraftIconItem {
  if (typeof value !== "object" || value === null) return false
  const item = value as Record<string, unknown>
  return (
    isNonEmptyString(item.icon) &&
    ADMIN_ICON_NAMES.includes(item.icon as string) &&
    isNonEmptyString(item.title) &&
    isNonEmptyString(item.description)
  )
}

export function isValidPagoOption(value: unknown): value is DraftPagoOption {
  if (typeof value !== "object" || value === null) return false
  const item = value as Record<string, unknown>
  return isNonEmptyString(item.icon) && ADMIN_ICON_NAMES.includes(item.icon as string) && isNonEmptyString(item.label)
}

export function isValidDraftImage(value: unknown): value is DraftImage {
  if (typeof value !== "object" || value === null) return false
  const item = value as Record<string, unknown>
  return isNonEmptyString(item.src) && isNonEmptyString(item.alt)
}

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

export function validateDraft(draft: PropertyDraft): string | null {
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
  if (draft.heroImage !== null && draft.heroImage !== undefined && !isValidDraftImage(draft.heroImage)) {
    return "La foto de portada es inválida."
  }
  if (draft.gallery !== undefined && (!Array.isArray(draft.gallery) || !draft.gallery.every(isValidDraftImage))) {
    return "Una o más fotos de la galería son inválidas."
  }
  return null
}
