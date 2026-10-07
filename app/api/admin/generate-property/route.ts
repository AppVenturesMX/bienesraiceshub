import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { ADMIN_ICON_NAMES } from "@/lib/admin-icon-map"
import {
  DEFAULT_DISCLAIMER_MXN,
  DEFAULT_DISCLAIMER_USD,
  type PropertyDraft,
  type PropertyRawInput,
} from "@/lib/admin-property-draft"

// Convierte los datos crudos del formulario en el contenido final de la
// propiedad, usando el mismo prompt de voz de marca que ya se usaba a mano
// (ver claude/bienes-raices-hub-proceso-alta-propiedades.md, sección 2).
// No agrega ninguna dependencia nueva: llama a la API de Claude
// directamente por fetch, igual que cualquier función serverless de
// Next.js ya hace con servicios externos.

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"

const SYSTEM_PROMPT = `Eres el redactor de Bienes Raíces Hub (bienesraiceshub.com), una marca de corretaje propia en Baja California (no un directorio abierto) que además coordina precalificación de crédito, cita y cierre en un mismo equipo, vía preaprueba.com.

Te voy a dar los datos crudos de una propiedad nueva. Con eso, genera el contenido para la ficha de la propiedad, en español, tono premium pero cálido, profesional y maduro (nunca coloquial ni cursi).

Reglas de voz de marca, sin excepción:
1. Nunca usar la palabra "certeza" (colisiona con Century 21 Certezza, competidor local).
2. Nunca comparar ni mencionar, directa o indirectamente, a otros asesores o competidores — ni en tono negativo.
3. Evitar superlativos no sostenibles ("el mejor", "único en su tipo") — describir beneficios concretos y verificables.
4. Tono profesional y maduro, nunca coloquial (evitar modismos tipo "por tu cuenta", "batallar").
5. No inventar cifras, testimonios ni datos no proporcionados explícitamente — si un dato no viene en la entrada, omite el detalle en vez de inventarlo.

Íconos disponibles (usa EXACTAMENTE uno de estos nombres para cada "icon", nunca inventes uno nuevo): ${ADMIN_ICON_NAMES.join(", ")}.

Responde ÚNICAMENTE con un objeto JSON válido, sin texto antes ni después, sin bloque de código markdown, con esta forma exacta:
{
  "slug": "kebab-case, formato [referencia]-[colonia]-[ciudad]",
  "locationBadge": "Colonia · Ciudad",
  "title": "un H1 vendedor de una sola oración, que combine el atractivo principal + la zona",
  "description": "1-2 líneas que resuman el valor de la propiedad",
  "metaTitle": "SEO, incluye precio y ubicación",
  "metaDescription": "SEO, 1-2 líneas",
  "ubicacionHeading": "encabezado corto para la sección de ubicación",
  "ubicacionSubheading": "1 línea",
  "ubicacionItems": [ { "icon": "NombreDeIcono", "title": "...", "description": "1-2 líneas, cercanía real, tiempo/distancia" } ],
  "mapCaption": "Ubicación aproximada (<zona>). La dirección exacta se comparte al agendar tu cita.",
  "espaciosHeading": "encabezado corto para la sección de espacios",
  "espaciosSubheading": "1 línea",
  "espaciosItems": [ { "icon": "NombreDeIcono", "title": "...", "description": "1-2 líneas, características físicas" } ],
  "formasDePago": [ { "icon": "NombreDeIcono", "label": "..." } ],
  "contactoHeading": "...",
  "contactoSubheading": "...",
  "whatsappMessage": "mensaje prellenado que mencione la propiedad y el precio",
  "disclaimer": "texto estándar salvo que la propiedad tenga condiciones particulares"
}

"ubicacionItems" debe tener EXACTAMENTE 3 elementos. "espaciosItems" debe tener entre 4 y 5 elementos.`

function buildUserPrompt(input: PropertyRawInput): string {
  const datos: string[] = [
    `Ubicación: ${input.ubicacionColoniaSeccion}, ${input.ciudad}`,
    `Precio: ${input.precio} ${input.moneda}`,
    `Estado: ${input.estado}`,
  ]
  if (input.recamaras) datos.push(`Recámaras: ${input.recamaras}`)
  if (input.banos) datos.push(`Baños: ${input.banos}`)
  if (input.m2Terreno) datos.push(`m² de terreno: ${input.m2Terreno}`)
  if (input.m2Construccion) datos.push(`m² de construcción: ${input.m2Construccion}`)
  datos.push(`Ventajas de ubicación (en bruto): ${input.ventajasUbicacion}`)
  datos.push(`Características de la propiedad (en bruto): ${input.caracteristicas}`)
  datos.push(`Formas de pago que acepta: ${input.formasDePagoTexto}`)
  if (input.condicionEspecialDisclaimer) {
    datos.push(`Condición especial para el disclaimer: ${input.condicionEspecialDisclaimer}`)
  }
  if (input.notasAdicionales) {
    datos.push(`Notas adicionales: ${input.notasAdicionales}`)
  }
  return datos.join("\n")
}

function defaultDisclaimer(moneda: "USD" | "MXN"): string {
  return moneda === "USD" ? DEFAULT_DISCLAIMER_USD : DEFAULT_DISCLAIMER_MXN
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado. Inicia sesión en /admin/login." }, { status: 401 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Falta configurar ANTHROPIC_API_KEY en las variables de entorno del proyecto bienesraiceshub en Vercel. La generación con IA no puede funcionar sin esa clave.",
      },
      { status: 501 },
    )
  }

  const model = process.env.ANTHROPIC_MODEL
  if (!model) {
    return NextResponse.json(
      {
        error:
          "Falta configurar ANTHROPIC_MODEL en las variables de entorno (el identificador exacto del modelo, tal como aparece en console.anthropic.com).",
      },
      { status: 501 },
    )
  }

  let input: PropertyRawInput
  try {
    input = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido (se esperaba JSON)." }, { status: 400 })
  }

  if (!input.ubicacionColoniaSeccion || !input.ciudad || !input.precio || !input.moneda) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios: ubicación, ciudad, precio y moneda." },
      { status: 400 },
    )
  }

  let response: Response
  try {
    response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: buildUserPrompt(input) }],
      }),
    })
  } catch (err) {
    return NextResponse.json({ error: "No se pudo contactar a la API de Claude." }, { status: 502 })
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    return NextResponse.json(
      { error: `La API de Claude respondió con error (${response.status}).`, detail },
      { status: 502 },
    )
  }

  const data = await response.json()

  // El modelo puede devolver varios bloques en `content` (por ejemplo un
  // bloque de razonamiento antes del texto final) — se concatena el texto
  // de todos los bloques de tipo "text" en vez de asumir que el primero ya
  // es el texto, para no quedarse leyendo un bloque vacío.
  const contentBlocks: Array<{ type: string; text?: string }> = Array.isArray(data?.content) ? data.content : []
  const rawText: string = contentBlocks
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text)
    .join("\n")

  if (data?.stop_reason === "max_tokens") {
    return NextResponse.json(
      {
        error: "La respuesta de la IA se cortó antes de terminar (llegó al límite de tokens). Intenta de nuevo.",
        raw: rawText,
      },
      { status: 502 },
    )
  }

  let parsed: Partial<PropertyDraft>
  try {
    const jsonStart = rawText.indexOf("{")
    const jsonEnd = rawText.lastIndexOf("}")
    parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd + 1))
  } catch {
    return NextResponse.json(
      { error: "La respuesta de la IA no vino en JSON válido. Intenta de nuevo.", raw: rawText },
      { status: 502 },
    )
  }

  const draft: PropertyDraft = {
    slug: parsed.slug ?? "",
    status: input.estado,
    locationBadge: parsed.locationBadge ?? `${input.ubicacionColoniaSeccion} · ${input.ciudad}`,
    title: parsed.title ?? "",
    description: parsed.description ?? "",
    price: input.precio,
    currency: input.moneda,
    metaTitle: parsed.metaTitle ?? "",
    metaDescription: parsed.metaDescription ?? "",
    // La IA genera texto, no fotos — el panel las agrega después con el
    // botón "Subir fotos" (ver app/api/admin/upload-photo/route.ts).
    heroImage: null,
    gallery: [],
    ubicacionHeading: parsed.ubicacionHeading ?? "Una ubicación que lo tiene todo",
    ubicacionSubheading: parsed.ubicacionSubheading ?? "",
    ubicacionItems: Array.isArray(parsed.ubicacionItems) ? parsed.ubicacionItems : [],
    mapCaption: parsed.mapCaption ?? "Ubicación aproximada. La dirección exacta se comparte al agendar tu cita.",
    espaciosHeading: parsed.espaciosHeading ?? "Espacios que enamoran",
    espaciosSubheading: parsed.espaciosSubheading ?? "",
    espaciosItems: Array.isArray(parsed.espaciosItems) ? parsed.espaciosItems : [],
    formasDePago: Array.isArray(parsed.formasDePago) ? parsed.formasDePago : [],
    contactoHeading: parsed.contactoHeading ?? "Agenda tu cita con el asesor inmobiliario.",
    contactoSubheading: parsed.contactoSubheading ?? "",
    whatsappMessage: parsed.whatsappMessage ?? "",
    disclaimer:
      parsed.disclaimer ?? (input.condicionEspecialDisclaimer || defaultDisclaimer(input.moneda)),
  }

  // Valida que los íconos devueltos existan en el set permitido — si la IA
  // inventó un nombre que no es de lucide-react, lo sustituye por un
  // genérico en vez de dejar pasar un ícono que no existe.
  const validIcon = (name: string) => (ADMIN_ICON_NAMES.includes(name) ? name : "MapPin")
  draft.ubicacionItems = draft.ubicacionItems.map((item) => ({ ...item, icon: validIcon(item.icon) }))
  draft.espaciosItems = draft.espaciosItems.map((item) => ({ ...item, icon: validIcon(item.icon) }))
  draft.formasDePago = draft.formasDePago.map((item) => ({ ...item, icon: validIcon(item.icon) }))

  return NextResponse.json({ draft })
}
