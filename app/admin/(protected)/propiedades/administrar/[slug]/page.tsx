"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { upload } from "@vercel/blob/client"
import { ADMIN_ICON_NAMES, resolveAdminIcon } from "@/lib/admin-icon-map"
import type { DraftImage, PropertyDraft } from "@/lib/admin-property-draft"

// Edición de una propiedad ya publicada. Mismo patrón de UI que la
// sección "2. Revisa y ajusta antes de publicar" de
// app/admin/(protected)/propiedades/page.tsx (ahí el draft lo genera la
// IA; aquí se precarga con GET /api/admin/properties/[slug]), más los
// campos que esa sección no mostraba porque en el alta vienen fijos desde
// el paso 1: precio, moneda, estado, badge de ubicación, encabezados de
// sección, meta título/descripción y formas de pago.
//
// El slug se muestra pero no es editable — renombrar una propiedad ya
// publicada no está soportado todavía (ver app/api/admin/properties/[slug]/route.ts).

export default function AdminPropiedadEditarPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params.slug

  const [draft, setDraft] = useState<PropertyDraft | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`/api/admin/properties/${slug}`)
        const data = await res.json()
        if (cancelled) return
        if (!res.ok) {
          setLoadError(data?.error || "No se pudo cargar la propiedad.")
          return
        }
        setDraft(data.draft as PropertyDraft)
      } catch {
        if (!cancelled) setLoadError("No se pudo contactar al servidor.")
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [slug])

  function updateField<K extends keyof PropertyDraft>(key: K, value: PropertyDraft[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev))
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
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9.]+/g, "-")
        const pathname = `properties/${draft.slug}/${Date.now()}-${safeName}`
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
    updateField("heroImage", img)
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

  async function handleSave() {
    if (!draft) return
    setSaving(true)
    setSaveMessage(null)
    try {
      const res = await fetch(`/api/admin/properties/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const data = await res.json()
      if (!res.ok) {
        setSaveMessage(data?.error || "No se pudo guardar todavía.")
        return
      }
      setSaveMessage("Cambios guardados.")
    } catch {
      setSaveMessage("No se pudo contactar al servidor.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!draft) return
    const confirmed = window.confirm(`¿Borrar "${draft.title}" (${slug})? Esta acción no se puede deshacer.`)
    if (!confirmed) return
    setDeleting(true)
    setSaveMessage(null)
    try {
      const res = await fetch(`/api/admin/properties/${slug}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setSaveMessage(data?.error || "No se pudo borrar la propiedad.")
        return
      }
      router.push("/admin/propiedades/administrar")
    } catch {
      setSaveMessage("No se pudo contactar al servidor.")
    } finally {
      setDeleting(false)
    }
  }

  if (loadError) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="mb-4 text-sm text-red-600">{loadError}</p>
        <Link href="/admin/propiedades/administrar" className="text-sm underline">
          Volver al listado
        </Link>
      </main>
    )
  }

  if (!draft) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm text-neutral-500">Cargando…</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-2xl font-semibold">Editar propiedad</h1>
          <p className="font-mono text-sm text-neutral-500">{slug}</p>
        </div>
        <Link href="/admin/propiedades/administrar" className="shrink-0 text-sm underline">
          Volver al listado
        </Link>
      </div>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Estado
            <select
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.status}
              onChange={(e) => updateField("status", e.target.value as PropertyDraft["status"])}
            >
              <option value="disponible">Disponible</option>
              <option value="apartada">Apartada</option>
              <option value="vendida">Vendida</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Precio
            <input
              type="number"
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.price}
              onChange={(e) => updateField("price", Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Moneda
            <select
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.currency}
              onChange={(e) => updateField("currency", e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Badge de ubicación
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            value={draft.locationBadge}
            onChange={(e) => updateField("locationBadge", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Frase de impacto (opcional)
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            placeholder="Ej. ¡Invierte con Visión!"
            value={draft.titleHook ?? ""}
            onChange={(e) => updateField("titleHook", e.target.value)}
          />
          <span className="text-xs text-neutral-500">
            Se muestra separada y en verde, arriba del título. Déjala vacía si no quieres una.
          </span>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Título
          <textarea
            className="min-h-16 rounded border border-neutral-300 px-3 py-2"
            value={draft.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Descripción
          <textarea
            className="min-h-16 rounded border border-neutral-300 px-3 py-2"
            value={draft.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Meta título (SEO)
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.metaTitle}
              onChange={(e) => updateField("metaTitle", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Meta descripción (SEO)
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.metaDescription}
              onChange={(e) => updateField("metaDescription", e.target.value)}
            />
          </label>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Ubicación ({draft.ubicacionItems.length})</p>
          <div className="mb-3 grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm">
              Encabezado
              <input
                className="rounded border border-neutral-300 px-3 py-2"
                value={draft.ubicacionHeading}
                onChange={(e) => updateField("ubicacionHeading", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Subencabezado
              <input
                className="rounded border border-neutral-300 px-3 py-2"
                value={draft.ubicacionSubheading}
                onChange={(e) => updateField("ubicacionSubheading", e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            {draft.ubicacionItems.map((item, i) => {
              const Icon = resolveAdminIcon(item.icon)
              return (
                <div key={i} className="flex items-start gap-3 rounded border border-neutral-200 p-3">
                  <Icon className="mt-1 h-4 w-4 shrink-0" />
                  <div className="flex-1">
                    <div className="mb-1 flex gap-2">
                      <select
                        className="rounded border border-neutral-300 px-2 py-1 text-xs"
                        value={item.icon}
                        onChange={(e) => {
                          const items = [...draft.ubicacionItems]
                          items[i] = { ...items[i], icon: e.target.value }
                          updateField("ubicacionItems", items)
                        }}
                      >
                        {ADMIN_ICON_NAMES.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <input
                        className="flex-1 rounded border border-neutral-300 px-2 py-1 text-sm font-medium"
                        value={item.title}
                        onChange={(e) => {
                          const items = [...draft.ubicacionItems]
                          items[i] = { ...items[i], title: e.target.value }
                          updateField("ubicacionItems", items)
                        }}
                      />
                    </div>
                    <textarea
                      className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      value={item.description}
                      onChange={(e) => {
                        const items = [...draft.ubicacionItems]
                        items[i] = { ...items[i], description: e.target.value }
                        updateField("ubicacionItems", items)
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <label className="flex flex-col gap-1 text-sm">
          Link de Google Maps
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            placeholder="Pega el link de Google Maps, el código <iframe> de 'Insertar un mapa', o la ubicación en texto"
            value={draft.mapEmbedSrc}
            onChange={(e) => updateField("mapEmbedSrc", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Leyenda del mapa
          <input
            className="rounded border border-neutral-300 px-3 py-2"
            value={draft.mapCaption}
            onChange={(e) => updateField("mapCaption", e.target.value)}
          />
        </label>

        <div>
          <p className="mb-2 text-sm font-medium">Espacios ({draft.espaciosItems.length})</p>
          <div className="mb-3 grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm">
              Encabezado
              <input
                className="rounded border border-neutral-300 px-3 py-2"
                value={draft.espaciosHeading}
                onChange={(e) => updateField("espaciosHeading", e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              Subencabezado
              <input
                className="rounded border border-neutral-300 px-3 py-2"
                value={draft.espaciosSubheading}
                onChange={(e) => updateField("espaciosSubheading", e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            {draft.espaciosItems.map((item, i) => {
              const Icon = resolveAdminIcon(item.icon)
              return (
                <div key={i} className="flex items-start gap-3 rounded border border-neutral-200 p-3">
                  <Icon className="mt-1 h-4 w-4 shrink-0" />
                  <div className="flex-1">
                    <div className="mb-1 flex gap-2">
                      <select
                        className="rounded border border-neutral-300 px-2 py-1 text-xs"
                        value={item.icon}
                        onChange={(e) => {
                          const items = [...draft.espaciosItems]
                          items[i] = { ...items[i], icon: e.target.value }
                          updateField("espaciosItems", items)
                        }}
                      >
                        {ADMIN_ICON_NAMES.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <input
                        className="flex-1 rounded border border-neutral-300 px-2 py-1 text-sm font-medium"
                        value={item.title}
                        onChange={(e) => {
                          const items = [...draft.espaciosItems]
                          items[i] = { ...items[i], title: e.target.value }
                          updateField("espaciosItems", items)
                        }}
                      />
                    </div>
                    <textarea
                      className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
                      value={item.description}
                      onChange={(e) => {
                        const items = [...draft.espaciosItems]
                        items[i] = { ...items[i], description: e.target.value }
                        updateField("espaciosItems", items)
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Formas de pago ({draft.formasDePago.length})</p>
          <div className="flex flex-col gap-2">
            {draft.formasDePago.map((item, i) => {
              const Icon = resolveAdminIcon(item.icon)
              return (
                <div key={i} className="flex items-center gap-3 rounded border border-neutral-200 p-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  <select
                    className="rounded border border-neutral-300 px-2 py-1 text-xs"
                    value={item.icon}
                    onChange={(e) => {
                      const items = [...draft.formasDePago]
                      items[i] = { ...items[i], icon: e.target.value }
                      updateField("formasDePago", items)
                    }}
                  >
                    {ADMIN_ICON_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <input
                    className="flex-1 rounded border border-neutral-300 px-2 py-1 text-sm"
                    value={item.label}
                    onChange={(e) => {
                      const items = [...draft.formasDePago]
                      items[i] = { ...items[i], label: e.target.value }
                      updateField("formasDePago", items)
                    }}
                  />
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
                  <div key={img.src + i} className="flex flex-col gap-1 rounded border border-neutral-200 p-2">
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
              Sin fotos — se guarda con un marcador temporal hasta que subas al menos una.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Encabezado de contacto
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.contactoHeading}
              onChange={(e) => updateField("contactoHeading", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Subencabezado de contacto
            <input
              className="rounded border border-neutral-300 px-3 py-2"
              value={draft.contactoSubheading}
              onChange={(e) => updateField("contactoSubheading", e.target.value)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Mensaje de WhatsApp prellenado
          <textarea
            className="min-h-16 rounded border border-neutral-300 px-3 py-2"
            value={draft.whatsappMessage}
            onChange={(e) => updateField("whatsappMessage", e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Disclaimer
          <textarea
            className="min-h-16 rounded border border-neutral-300 px-3 py-2"
            value={draft.disclaimer}
            onChange={(e) => updateField("disclaimer", e.target.value)}
          />
        </label>

        <p className="text-xs text-neutral-500">
          Nota: el mapa embebido se sigue editando a mano en la base de datos si lo necesitas — esta versión del
          panel no lo cubre. El slug tampoco se puede cambiar desde aquí.
        </p>

        <div className="flex items-center gap-4 border-t border-neutral-200 pt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || deleting}
            className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="rounded border border-red-200 px-4 py-2 text-sm font-medium text-red-600 disabled:opacity-50"
          >
            {deleting ? "Borrando…" : "Borrar esta propiedad"}
          </button>
        </div>
        {saveMessage ? <p className="text-sm">{saveMessage}</p> : null}
      </section>
    </main>
  )
}
