"use client"

import { useState } from "react"
import Link from "next/link"
import { upload } from "@vercel/blob/client"
import { resolveAdminIcon } from "@/lib/admin-icon-map"
import type { DraftImage, PropertyDraft, PropertyRawInput } from "@/lib/admin-property-draft"

const EMPTY_INPUT: PropertyRawInput = {
  ubicacionColoniaSeccion: "",
  ciudad: "",
  precio: 0,
  moneda: "USD",
  estado: "disponible",
  recamaras: undefined,
  banos: undefined,
  m2Terreno: undefined,
  m2Construccion: undefined,
  ventajasUbicacion: "",
  caracteristicas: "",
  formasDePagoTexto: "",
  whatsappAsesor: "",
  condicionEspecialDisclaimer: "",
  mapsLink: "",
  notasAdicionales: "",
}

export default function AdminPropiedadesPage() {
  const [input, setInput] = useState<PropertyRawInput>(EMPTY_INPUT)
  const [draft, setDraft] = useState<PropertyDraft | null>(null)
  const [generating, setGenerating] = useState(false)
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState<string | null>(null)
  const [publishFallbackJson, setPublishFallbackJson] = useState<string | null>(null)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)

  function updateField<K extends keyof PropertyRawInput>(key: K, value: PropertyRawInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }))
  }

  function updateDraftField<K extends keyof PropertyDraft>(key: K, value: PropertyDraft[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  async function handleGenerate() {
    setGenerating(true)
    setGenerateError(null)
    setPublishMessage(null)
    setPublishFallbackJson(null)
    try {
      const res = await fetch("/api/admin/generate-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      const data = await res.json()
      if (!res.ok) {
        setGenerateError(data?.error || "No se pudo generar el contenido.")
        return
      }
      // La IA genera el texto, no las fotos — heroImage/gallery arrancan
      // vacíos y se llenan con el botón "Subir fotos" de abajo.
      setDraft({ ...(data.draft as PropertyDraft), heroImage: null, gallery: [] })
    } catch {
      setGenerateError("No se pudo contactar al servidor.")
    } finally {
      setGenerating(false)
    }
  }

  async function handlePhotoUpload(files: FileList | null) {
    if (!files || files.length === 0 || !draft) return
    setPhotoError(null)
    setUploadingPhotos(true)
    try {
      const uploaded: DraftImage[] = []
      for (const file of Array.from(files)) {
        const safeName = file.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9.]+/g, "-")
        const pathname = `properties/${draft.slug || "sin-slug"}/${Date.now()}-${safeName}`
        const blob = await upload(pathname, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload-photo",
        })
        const defaultAlt = file.name.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ")
        uploaded.push({ src: blob.url, alt: defaultAlt })
      }
      setDraft((prev) => {
        if (!prev) return prev
        const gallery = [...prev.gallery, ...uploaded]
        const heroImage = prev.heroImage ?? uploaded[0] ?? null
        return { ...prev, gallery, heroImage }
      })
    } catch {
      setPhotoError("No se pudieron subir una o más fotos. Intenta de nuevo.")
    } finally {
      setUploadingPhotos(false)
    }
  }

  function setAsHero(img: DraftImage) {
    updateDraftField("heroImage", img)
  }

  function removePhoto(index: number) {
    setDraft((prev) => {
      if (!prev) return prev
      const removed = prev.gallery[index]
      const gallery = prev.gallery.filter((_, i) => i !== index)
      const heroImage = prev.heroImage && prev.heroImage.src === removed.src ? (gallery[0] ?? null) : prev.heroImage
      return { ...prev, gallery, heroImage }
    })
  }

  function updateGalleryAlt(index: number, alt: string) {
    setDraft((prev) => {
      if (!prev) return prev
      const gallery = [...prev.gallery]
      gallery[index] = { ...gallery[index], alt }
      const heroImage =
        prev.heroImage && prev.heroImage.src === gallery[index].src ? { ...prev.heroImage, alt } : prev.heroImage
      return { ...prev, gallery, heroImage }
    })
  }

  async function handlePublish() {
    if (!draft) return
    setPublishing(true)
    setPublishMessage(null)
    setPublishFallbackJson(null)
    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const data = await res.json()
      if (!res.ok) {
        setPublishMessage(data?.error || "No se pudo publicar todavía.")
        if (data?.draft) {
          setPublishFallbackJson(JSON.stringify(data.draft, null, 2))
        }
        return
      }
      setPublishMessage("Propiedad publicada.")
    } catch {
      setPublishMessage("No se pudo contactar al servidor.")
    } finally {
      setPublishing(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-2xl font-semibold">Dar de alta una propiedad</h1>
          <p className="text-sm text-neutral-600">
            Llena los datos tal cual los tengas, sin necesidad de redactarlos. La IA genera el contenido con la voz
            de marca del Hub; lo revisas y ajustas antes de publicar.
          </p>
        </div>
        <Link
          href="/admin/propiedades/administrar"
          className="shrink-0 self-start rounded border border-neutral-300 px-4 py-2 text-sm font-medium"
        >
          Administrar propiedades publicadas
        </Link>
      </div>

      <section className="mb-10 flex flex-col gap-4">
        <h2 className="text-lg font-medium">1. Datos de la propiedad</h2>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Colonia / sección
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.ubicacionColoniaSeccion}
              onChange={(e) => updateField("ubicacionColoniaSeccion", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Ciudad
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.ciudad}
              onChange={(e) => updateField("ciudad", e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Precio
            <input
              type="number"
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.precio || ""}
              onChange={(e) => updateField("precio", Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Moneda
            <select
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.moneda}
              onChange={(e) => updateField("moneda", e.target.value as PropertyRawInput["moneda"])}
            >
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Estado
            <select
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.estado}
              onChange={(e) => updateField("estado", e.target.value as PropertyRawInput["estado"])}
            >
              <option value="disponible">Disponible</option>
              <option value="apartada">Apartada</option>
              <option value="vendida">Vendida</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Recámaras
            <input
              type="number"
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.recamaras ?? ""}
              onChange={(e) => updateField("recamaras", e.target.value ? Number(e.target.value) : undefined)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Baños
            <input
              type="number"
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.banos ?? ""}
              onChange={(e) => updateField("banos", e.target.value ? Number(e.target.value) : undefined)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            m² terreno
            <input
              type="number"
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.m2Terreno ?? ""}
              onChange={(e) => updateField("m2Terreno", e.target.value ? Number(e.target.value) : undefined)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            m² construcción
            <input
              type="number"
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.m2Construccion ?? ""}
              onChange={(e) => updateField("m2Construccion", e.target.value ? Number(e.target.value) : undefined)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Ventajas de ubicación (en bruto — tiempos/distancias reales, nunca inventados)
          <textarea
            className="min-h-20 rounded border border-neutral-300 px-3 py-2"
            value={input.ventajasUbicacion}
            onChange={(e) => updateField("ventajasUbicacion", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Características de la propiedad (en bruto)
          <textarea
            className="min-h-20 rounded border border-neutral-300 px-3 py-2"
            value={input.caracteristicas}
            onChange={(e) => updateField("caracteristicas", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Formas de pago que acepta
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            placeholder="Efectivo, Crédito Bancario, Infonavit…"
            value={input.formasDePagoTexto}
            onChange={(e) => updateField("formasDePagoTexto", e.target.value)}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            WhatsApp del asesor (si es distinto al general)
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.whatsappAsesor}
              onChange={(e) => updateField("whatsappAsesor", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Link de Google Maps
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={input.mapsLink}
              onChange={(e) => updateField("mapsLink", e.target.value)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Condición especial para el disclaimer (opcional)
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            value={input.condicionEspecialDisclaimer}
            onChange={(e) => updateField("condicionEspecialDisclaimer", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Notas adicionales para la IA (opcional)
          <textarea
            className="min-h-16 rounded border border-neutral-300 px-3 py-2"
            value={input.notasAdicionales}
            onChange={(e) => updateField("notasAdicionales", e.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="self-start rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {generating ? "Generando…" : "Generar contenido con IA"}
        </button>
        {generateError ? <p className="text-sm text-red-600">{generateError}</p> : null}
      </section>

      {draft ? (
        <section className="mb-10 flex flex-col gap-4 border-t border-neutral-200 pt-8">
          <h2 className="text-lg font-medium">2. Revisa y ajusta antes de publicar</h2>

          <label className="flex flex-col gap-1 text-sm">
            Slug
            <input
              className="rounded border border-neutral-300 px-3 py-2 font-mono"
              value={draft.slug}
              onChange={(e) => updateDraftField("slug", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Título
            <textarea
              className="min-h-16 rounded border border-neutral-300 px-3 py-2"
              value={draft.title}
              onChange={(e) => updateDraftField("title", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Descripción
            <textarea
              className="min-h-16 rounded border border-neutral-300 px-3 py-2"
              value={draft.description}
              onChange={(e) => updateDraftField("description", e.target.value)}
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-medium">Ubicación ({draft.ubicacionItems.length} de 3)</p>
            <div className="flex flex-col gap-3">
              {draft.ubicacionItems.map((item, i) => {
                const Icon = resolveAdminIcon(item.icon)
                return (
                  <div key={i} className="flex items-start gap-3 rounded border border-neutral-200 p-3">
                    <Icon className="mt-1 h-4 w-4 shrink-0" />
                    <div className="flex-1">
                      <input
                        className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-sm font-medium"
                        value={item.title}
                        onChange={(e) => {
                          const items = [...draft.ubicacionItems]
                          items[i] = { ...items[i], title: e.target.value }
                          updateDraftField("ubicacionItems", items)
                        }}
                      />
                      <textarea
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                        value={item.description}
                        onChange={(e) => {
                          const items = [...draft.ubicacionItems]
                          items[i] = { ...items[i], description: e.target.value }
                          updateDraftField("ubicacionItems", items)
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Espacios ({draft.espaciosItems.length})</p>
            <div className="flex flex-col gap-3">
              {draft.espaciosItems.map((item, i) => {
                const Icon = resolveAdminIcon(item.icon)
                return (
                  <div key={i} className="flex items-start gap-3 rounded border border-neutral-200 p-3">
                    <Icon className="mt-1 h-4 w-4 shrink-0" />
                    <div className="flex-1">
                      <input
                        className="mb-1 w-full rounded border border-neutral-300 px-2 py-1 text-sm font-medium"
                        value={item.title}
                        onChange={(e) => {
                          const items = [...draft.espaciosItems]
                          items[i] = { ...items[i], title: e.target.value }
                          updateDraftField("espaciosItems", items)
                        }}
                      />
                      <textarea
                        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                        value={item.description}
                        onChange={(e) => {
                          const items = [...draft.espaciosItems]
                          items[i] = { ...items[i], description: e.target.value }
                          updateDraftField("espaciosItems", items)
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Fotos ({draft.gallery.length})</p>
            <label className="mb-3 flex w-fit cursor-pointer items-center gap-2 rounded border border-neutral-300 px-4 py-2 text-sm font-medium">
              {uploadingPhotos ? "Subiendo…" : "Subir fotos"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={uploadingPhotos}
                className="hidden"
                onChange={(e) => {
                  void handlePhotoUpload(e.target.files)
                  e.target.value = ""
                }}
              />
            </label>
            {photoError ? <p className="mb-2 text-sm text-red-600">{photoError}</p> : null}

            {draft.gallery.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {draft.gallery.map((img, i) => {
                  const isHero = draft.heroImage?.src === img.src
                  return (
                    <div key={img.src} className="flex flex-col gap-1 rounded border border-neutral-200 p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element -- el sitio ya usa <img> plano en todos lados, sin next/image */}
                      <img src={img.src} alt={img.alt} className="aspect-video w-full rounded object-cover" />
                      <input
                        className="rounded border border-neutral-300 px-2 py-1 text-xs"
                        value={img.alt}
                        onChange={(e) => updateGalleryAlt(i, e.target.value)}
                        placeholder="Descripción de la foto (alt)"
                      />
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setAsHero(img)}
                          disabled={isHero}
                          className="text-xs font-medium underline disabled:no-underline disabled:text-neutral-400"
                        >
                          {isHero ? "Portada" : "Marcar portada"}
                        </button>
                        <button type="button" onClick={() => removePhoto(i)} className="text-xs text-red-600 underline">
                          Quitar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">
                Sin fotos todavía — se publica con un marcador temporal hasta que subas al menos una.
              </p>
            )}
          </div>

          <label className="flex flex-col gap-1 text-sm">
            Mensaje de WhatsApp prellenado
            <textarea
              className="min-h-16 rounded border border-neutral-300 px-3 py-2"
              value={draft.whatsappMessage}
              onChange={(e) => updateDraftField("whatsappMessage", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Disclaimer
            <textarea
              className="min-h-16 rounded border border-neutral-300 px-3 py-2"
              value={draft.disclaimer}
              onChange={(e) => updateDraftField("disclaimer", e.target.value)}
            />
          </label>

          <p className="text-xs text-neutral-500">
            Nota: el mapa embebido todavía se agrega a mano en la base de datos si lo necesitas — esta versión del
            panel no lo cubre.
          </p>

          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="self-start rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {publishing ? "Publicando…" : "Publicar"}
          </button>
          {publishMessage ? <p className="text-sm">{publishMessage}</p> : null}
          {publishFallbackJson ? (
            <label className="flex flex-col gap-1 text-sm">
              Copia este JSON y pégalo como un nuevo objeto en lib/properties.ts mientras se conecta la base de
              datos:
              <textarea
                readOnly
                className="min-h-48 rounded border border-neutral-300 px-3 py-2 font-mono text-xs"
                value={publishFallbackJson}
                onFocus={(e) => e.currentTarget.select()}
              />
            </label>
          ) : null}
        </section>
      ) : null}
    </main>
  )
}
