"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type PropertyListItem = {
  slug: string
  status: "disponible" | "apartada" | "vendida"
  locationBadge: string
  title: string
  price: number
  currency: string
  heroImage: { src: string; alt: string } | null
}

const STATUS_LABEL: Record<PropertyListItem["status"], string> = {
  disponible: "Disponible",
  apartada: "Apartada",
  vendida: "Vendida",
}

const STATUS_CLASS: Record<PropertyListItem["status"], string> = {
  disponible: "bg-emerald-100 text-emerald-700",
  apartada: "bg-amber-100 text-amber-700",
  vendida: "bg-neutral-200 text-neutral-600",
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency, maximumFractionDigits: 0 }).format(price)
}

export default function AdminPropiedadesAdministrarPage() {
  const [properties, setProperties] = useState<PropertyListItem[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  async function loadProperties() {
    setLoadError(null)
    try {
      const res = await fetch("/api/admin/properties")
      const data = await res.json()
      if (!res.ok) {
        setLoadError(data?.error || "No se pudo cargar el listado de propiedades.")
        return
      }
      setProperties(data.properties as PropertyListItem[])
    } catch {
      setLoadError("No se pudo contactar al servidor.")
    }
  }

  useEffect(() => {
    void loadProperties()
  }, [])

  async function handleDelete(slug: string, title: string) {
    const confirmed = window.confirm(`¿Borrar "${title}" (${slug})? Esta acción no se puede deshacer.`)
    if (!confirmed) return

    setActionError(null)
    setDeletingSlug(slug)
    try {
      const res = await fetch(`/api/admin/properties/${slug}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) {
        setActionError(data?.error || "No se pudo borrar la propiedad.")
        return
      }
      setProperties((prev) => (prev ? prev.filter((p) => p.slug !== slug) : prev))
    } catch {
      setActionError("No se pudo contactar al servidor.")
    } finally {
      setDeletingSlug(null)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-2xl font-semibold">Administrar propiedades</h1>
          <p className="text-sm text-neutral-600">
            Todas las propiedades publicadas en bienesraiceshub.com. Edítalas o bórralas desde aquí.
          </p>
        </div>
        <Link
          href="/admin/propiedades"
          className="shrink-0 self-start rounded border border-neutral-300 px-4 py-2 text-sm font-medium"
        >
          + Dar de alta una propiedad
        </Link>
      </div>

      {loadError ? <p className="text-sm text-red-600">{loadError}</p> : null}
      {actionError ? <p className="mb-4 text-sm text-red-600">{actionError}</p> : null}

      {!properties && !loadError ? <p className="text-sm text-neutral-500">Cargando…</p> : null}

      {properties && properties.length === 0 ? (
        <p className="text-sm text-neutral-500">Todavía no hay propiedades publicadas.</p>
      ) : null}

      {properties && properties.length > 0 ? (
        <div className="flex flex-col gap-3">
          {properties.map((property) => (
            <div
              key={property.slug}
              className="flex items-center gap-4 rounded border border-neutral-200 p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- el sitio ya usa <img> plano en todos lados, sin next/image */}
              <img
                src={property.heroImage?.src}
                alt={property.heroImage?.alt ?? ""}
                className="h-16 w-24 shrink-0 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[property.status]}`}>
                    {STATUS_LABEL[property.status]}
                  </span>
                  <span className="truncate text-xs text-neutral-500">{property.locationBadge}</span>
                </div>
                <p className="truncate text-sm font-medium">{property.title}</p>
                <p className="text-xs text-neutral-500">
                  {formatPrice(property.price, property.currency)} · {property.slug}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/propiedades/administrar/${property.slug}`}
                  className="rounded border border-neutral-300 px-3 py-1.5 text-sm font-medium"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(property.slug, property.title)}
                  disabled={deletingSlug === property.slug}
                  className="rounded border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 disabled:opacity-50"
                >
                  {deletingSlug === property.slug ? "Borrando…" : "Borrar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  )
}
