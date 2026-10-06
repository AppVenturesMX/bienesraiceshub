import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { PropertyDraft } from "@/lib/admin-property-draft"

// Publicación de una propiedad nueva. Hoy el sitio no tiene base de datos
// conectada (lib/properties.ts sigue siendo un arreglo en código) — en
// cuanto se conecte Vercel Postgres al proyecto (Pieza 1 del diseño en
// claude/panel-alta-propiedades-diseno.md), este handler pasa a insertar
// el registro ahí y la propiedad aparece de inmediato en el Hub, sin
// commit ni deploy.
//
// Mientras tanto, devuelve el JSON ya armado para que quien use el panel
// pueda copiarlo y pegarlo a mano en `lib/properties.ts` (mismo flujo
// manual de siempre), sin perder el trabajo de redacción ya hecho por la
// IA.

export async function POST(request: NextRequest) {
  let draft: PropertyDraft
  try {
    draft = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido (se esperaba JSON)." }, { status: 400 })
  }

  if (!process.env.POSTGRES_URL) {
    return NextResponse.json(
      {
        error:
          "Todavía no hay una base de datos conectada al proyecto (Vercel → bienesraiceshub → Storage → conectar Postgres). Mientras tanto, copia el JSON de abajo y pégalo como un nuevo objeto en el arreglo `properties` de lib/properties.ts, siguiendo el proceso manual de siempre.",
        draft,
      },
      { status: 501 },
    )
  }

  // TODO (Pieza 1): una vez conectado Vercel Postgres, insertar `draft`
  // como fila nueva en la tabla `properties` y regresar { ok: true }.
  return NextResponse.json(
    { error: "Conexión a base de datos detectada pero la inserción todavía no está implementada." },
    { status: 501 },
  )
}
