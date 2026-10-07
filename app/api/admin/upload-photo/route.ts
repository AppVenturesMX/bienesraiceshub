import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"

// Esta ruta NO recibe el archivo de la foto — solo autoriza la subida.
// El navegador sube el archivo directo a Vercel Blob (ver el botón "Subir
// fotos" en app/admin/(protected)/propiedades/page.tsx, que usa
// `upload()` de @vercel/blob/client apuntando aquí). Eso evita el límite
// de tamaño de body de las funciones serverless y no cuenta como tráfico
// de la función.
//
// `onUploadCompleted` no está implementado a propósito: Vercel lo llama
// como webhook después de cada subida, pero no lo necesitamos — la URL
// final se guarda en Postgres hasta que Alex le da clic a "Publicar" (ver
// app/api/admin/properties/route.ts), no en el momento de subir la foto.

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Todavía no hay almacenamiento de fotos conectado al proyecto (Vercel → bienesraiceshub → Storage → Create Database → Blob).",
      },
      { status: 501 },
    )
  }

  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          addRandomSuffix: true,
          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB por foto
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
