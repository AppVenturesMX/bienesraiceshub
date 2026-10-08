import { getAllProperties } from "@/lib/properties-db"
import { isisFacts } from "@/lib/isis-facts"

// Catálogo en JSON para las tarjetas con foto de Isis (widget).
export const dynamic = "force-dynamic"

export async function GET() {
  const base = "https://www.bienesraiceshub.com"
  const properties = await getAllProperties()
  const items = properties
    .filter((p) => p.status !== "vendida")
    .map((p) => ({
      slug: p.slug,
      name: p.locationBadge,
      price: p.price,
      currency: p.currency,
      status: p.status,
      image: /^(https?:|data:)/.test(p.heroImage.src) ? p.heroImage.src : base + p.heroImage.src,
      url: `${base}/propiedad/${p.slug}`,
      ...isisFacts(p),
    }))
  return Response.json(items, { headers: { "Cache-Control": "public, max-age=300" } })
}
