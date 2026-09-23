import { Navbar } from "@/components/navbar"
import { HubHero } from "@/components/hub-hero"
import { PropertyCard } from "@/components/property-card"
import { SiteFooter } from "@/components/site-footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { properties } from "@/lib/properties"

export default function Page() {
  return (
    <>
      <Navbar mode="hub" />
      <main>
        <HubHero />

        <section id="propiedades" className="scroll-mt-20 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-balance text-center text-3xl font-extrabold text-slate-800 sm:text-4xl">
              Propiedades disponibles
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Cada propiedad tiene su propia página con galería, ubicación y opciones de pago.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </>
  )
}
