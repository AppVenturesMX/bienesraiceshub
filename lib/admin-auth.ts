import { createHash } from "node:crypto"
import { cookies } from "next/headers"

// Verificación de sesión compartida entre las páginas de /admin (layout)
// y las rutas de API de /api/admin/* (generate-property, properties).
//
// Antes de este archivo, solo el layout de las páginas revisaba la cookie
// — las rutas de API no tenían ninguna verificación propia, así que
// cualquiera que conociera la URL exacta podía llamarlas directo, sin
// pasar por /admin/login (la página se veía protegida, pero el API detrás
// no lo estaba).
//
// También se corrige aquí el alcance de la cookie: se creaba con
// `path: "/admin"`, que por las reglas de cookies del navegador NO cubre
// `/api/admin/...` (son rutas distintas, "/admin" no es un prefijo de
// "/api/admin/..."), así que el navegador nunca la enviaba en esas
// llamadas. Por eso la verificación se agrega aquí junto con el cambio de
// `path` en el login — agregar solo la verificación sin corregir el
// alcance habría tumbado el botón "Generar"/"Publicar" para el propio
// Alex ya logueado.

export function sessionToken(password: string) {
  return createHash("sha256").update(password).digest("hex")
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = process.env.ADMIN_PANEL_PASSWORD
  if (!expected) return false
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")?.value
  return session === sessionToken(expected)
}
