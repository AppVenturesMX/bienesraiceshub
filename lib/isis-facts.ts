import type { Property } from "@/lib/properties"

// Datos estructurados que Isis usa para filtrar y comparar propiedades sin adivinar.
// playa: "frente" = a pasos del mar | "cerca" = zona de playa o con vista/acceso al mar | "no".
// Al agregar una propiedad nueva, súmala aquí (si no está, Isis lo trata como "sin dato").
const PLAYA: Record<string, "frente" | "cerca" | "no"> = {
  "granizo-playas-tijuana": "cerca",
  "arrecife-san-antonio-del-mar": "cerca",
  "amatista-punta-azul": "cerca",
  "san-antonio-del-mar-50m": "frente",
  "departamento-20-de-noviembre": "no",
  "privada-verona-napoles": "no",
  "privada-hacienda-del-mar": "no",
}

export function isisFacts(p: Property) {
  const txt = `${p.locationBadge} ${p.metaDescription}`
  const ciudad = Array.from(new Set(txt.match(/Tijuana|Rosarito|Ensenada|Tecate|Mexicali/g) || [])).join(" / ")
  const recamaras = (txt.match(/(\d+)\s*rec[aá]maras?/i) || [])[1] || ""
  const tipo = /departamento/i.test(p.metaDescription) ? "departamento" : "casa"
  const playa = PLAYA[p.slug] ?? "sin dato"
  const playaTexto =
    playa === "frente" ? "sí, frente al mar (a pasos)" : playa === "cerca" ? "sí, zona de playa o con vista al mar" : playa === "no" ? "no" : "sin dato"
  return { tipo, ciudad, recamaras, playa, playaTexto }
}
