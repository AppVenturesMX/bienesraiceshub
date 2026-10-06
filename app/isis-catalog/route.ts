import { properties } from "@/lib/properties"
import { isisFacts } from "@/lib/isis-facts"

// Catálogo en texto plano para Isis (widget). Se genera desde lib/properties.ts,
// así que siempre refleja las propiedades y su estado reales del sitio.
export const dynamic = "force-static"

export function GET() {
  const items = properties
    .filter((p) => p.status !== "vendida")
    .map((p, i) => {
      const amenidades = p.espaciosItems.map((e) => e.title).slice(0, 8).join(", ")
      const f = isisFacts(p)
      return [
        `${i + 1}. ${p.locationBadge}`,
        `   Estado: ${p.status.toUpperCase()} | Precio: $${p.price.toLocaleString("en-US")} ${p.currency}`,
        `   Ficha: ${f.tipo} | Ciudad: ${f.ciudad} | Recámaras: ${f.recamaras} | Cerca de la playa: ${f.playaTexto}`,
        `   ${p.metaDescription}`,
        amenidades ? `   Espacios y amenidades: ${amenidades}` : "",
        `   Página: https://www.bienesraiceshub.com/propiedad/${p.slug}`,
      ]
        .filter(Boolean)
        .join("\n")
    })
  const body =
    "PROPIEDADES DE BIENESRAÍCESHUB (datos exactos; no hay otras):\n\n" + items.join("\n\n")
  return new Response(body.slice(0, 11000), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  })
}
