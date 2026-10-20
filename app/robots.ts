import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

// Ver claude/estrategia-seo-google-oct-2026.md, sección 1 — robots.txt
// no existía en producción (confirmado en vivo, 20 oct 2026). Bloquea
// el panel de administración y las rutas de API del rastreo; todo lo
// demás es público.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
