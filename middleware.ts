ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mapa de subdominio -> slug para las propiedades que ya tenían una landing
// independiente antes de consolidar la arquitectura (repo/proyecto propios).
// Las propiedades dadas de alta desde el panel de administración usan el
// mismo slug como subdominio directamente, así que no necesitan entrada aquí
// — ver `resolveSlugFromHost` abajo.
const LEGACY_SUBDOMAIN_TO_SLUG: Record<string, string> = {
  granizo: "granizo-playas-tijuana",
  arrecife: "arrecife-san-antonio-del-mar",
  amatista: "amatista-punta-azul",
  depto20noviembre: "departamento-20-de-noviembre",
  "verona-napoles": "privada-verona-napoles",
  "san-antonio-del-mar-50m": "san-antonio-del-mar-50m",
  "privada-hacienda-del-mar": "privada-hacienda-del-mar",
}

const ROOT_DOMAIN = "bienesraiceshub.com"

function resolveSlugFromHost(host: string): string | null {
  // host puede venir con puerto en local (localhost:3000) — lo quitamos.
  const hostname = host.split(":")[0]

  if (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) {
    return null // Hub normal, no es una propiedad individual
  }

  if (!hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return null // dominio ajeno (preview de Vercel, localhost, etc.) — no reescribir
  }

  const subdomain = hostname.slice(0, -(`.${ROOT_DOMAIN}`.length))

  if (subdomain.includes(".")) {
    return null // subdominio de más de un nivel, no es un caso soportado
  }

  // 1) ¿Es una landing heredada con mapeo explícito?
  if (LEGACY_SUBDOMAIN_TO_SLUG[subdomain]) {
    return LEGACY_SUBDOMAIN_TO_SLUG[subdomain]
  }

  // 2) Convención nueva (panel de alta): subdominio === slug.
  return subdomain
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? ""
  const slug = resolveSlugFromHost(host)

  if (!slug) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()

  // Ya estamos dentro de /propiedad/<slug> (p.ej. assets de Next o rutas
  // internas) — no reescribir de nuevo.
  if (url.pathname.startsWith(`/propiedad/${slug}`)) {
    return NextResponse.next()
  }

  // La landing independiente sirve la ficha de la propiedad como home de su
  // propio subdominio: cualquier ruta en ese host se reescribe hacia la
  // página de propiedad correspondiente dentro del Hub.
  if (url.pathname === "/" || url.pathname === "") {
    url.pathname = `/propiedad/${slug}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // No interceptar archivos estáticos, imágenes ni rutas internas de Next.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|icon|apple-icon|docs/).*)"],
}
