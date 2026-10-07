import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { sessionToken } from "@/lib/admin-auth"

// Protege todo lo que cuelgue de /admin excepto la propia página de login.
// No toca middleware.ts (el middleware global del Hub) a propósito: un
// error aquí, dentro de un layout de una sola sección, nunca puede tumbar
// el sitio completo como sí puede un error en el middleware global.

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const expected = process.env.ADMIN_PANEL_PASSWORD
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")?.value

  const authenticated = Boolean(expected) && session === sessionToken(expected as string)

  if (!authenticated) {
    redirect("/admin/login")
  }

  return <>{children}</>
}
