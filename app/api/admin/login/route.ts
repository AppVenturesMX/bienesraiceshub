import { timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { sessionToken } from "@/lib/admin-auth"

// Acceso simple por contraseña para el panel de alta de propiedades. No es
// un sistema de usuarios — es una sola persona o un equipo chico, así que
// una contraseña compartida (variable de entorno) más una cookie de sesión
// es suficiente, sin agregar ninguna dependencia nueva al proyecto.

export async function POST(request: NextRequest) {
  const expected = process.env.ADMIN_PANEL_PASSWORD
  if (!expected) {
    return NextResponse.json(
      { error: "Falta configurar ADMIN_PANEL_PASSWORD en las variables de entorno del proyecto." },
      { status: 501 },
    )
  }

  let password = ""
  try {
    const body = await request.json()
    password = typeof body?.password === "string" ? body.password : ""
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 })
  }

  const expectedBuf = Buffer.from(sessionToken(expected))
  const givenBuf = Buffer.from(sessionToken(password))
  const matches = expectedBuf.length === givenBuf.length && timingSafeEqual(expectedBuf, givenBuf)

  if (!matches) {
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("admin_session", sessionToken(expected), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    // Antes era "/admin" — eso dejaba la cookie sin enviarse a
    // /api/admin/*, que no comparte ese prefijo de ruta. Con "/" cubre
    // tanto las páginas de /admin como las rutas de API que ahora también
    // verifican la sesión (ver lib/admin-auth.ts).
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  })
  return response
}
