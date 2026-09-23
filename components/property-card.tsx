import Link from "next/link"
import { MapPin } from "lucide-react"
import type { Property } from "@/lib/properties"

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/propiedad/${property.slug}`}
      className="group block overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={property.heroImage.src}
          alt={property.heroImage.alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600">
          <MapPin className="h-3.5 w-3.5" />
          {property.locationBadge}
        </span>
        <h3 className="mt-3 text-xl font-bold text-slate-800">{property.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{property.description}</p>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold text-slate-900">
            ${property.price.toLocaleString("en-US")}
          </span>
          <span className="text-sm font-semibold text-emerald-600">{property.currency}</span>
        </div>
      </div>
    </Link>
  )
}
