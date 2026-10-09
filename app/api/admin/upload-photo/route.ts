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
//
// Nota (9 oct 2026): el store original (bienesraiceshub-blob) se creó
// como Private, pero esta ruta siempre pidió access: "public" al subir —
// ese choque de modos de acceso hacía que cada subida fallara con 503 en
// el PUT directo a Vercel Blob (el botón "Subiendo..." se quedaba pegado
// para siempre). Se creó un segundo store, bienesraiceshub-blob-public
// (Public), conectado a este proyecto. `handleUpload` de @vercel/blob
// solo sabe resolver credenciales vía `token` / BLOB_READ_WRITE_TOKEN —
// no acepta `storeId` ni usa las credenciales OIDC que Vercel generó al
// conectar el store nuevo — así que se le pasa el `token` explícito del
// store público (bienesraiceshubpublic_READ_WRITE_TOKEN, generado desde
// Storage → bienesraiceshub-blob-public → Settings → Rotate Credentials).
// El BLOB_READ_WRITE_TOKEN "clásico" que sigue en las variables de
// entorno pertenece al store privado original y ya no se usa aquí.

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }

  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.bienesraiceshubpublic_READ_WRITE_TOKEN,
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
