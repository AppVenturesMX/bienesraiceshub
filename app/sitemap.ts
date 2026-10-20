import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { getAllProperties } from "@/lib/properties-db"

// Sitemap dinámico — se regenera solo con cada alta/baja de propiedad
// desde el panel (la fuente es la misma tabla Postgres que lee el sitio
// público). Ver claude/estrategia-seo-google-oct-2026.md, sección 1.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${SITE_URL}/propiedad/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticRoutes, ...propertyRoutes]
}
