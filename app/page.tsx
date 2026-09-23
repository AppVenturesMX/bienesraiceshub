import { Navbar } from "@/components/navbar"
import { HubHero } from "@/components/hub-hero"
import { HubTrustBar } from "@/components/hub-trust-bar"
import { HubWhyUs } from "@/components/hub-why-us"
import { HubHowItWorks } from "@/components/hub-how-it-works"
import { HubCtaBand } from "@/components/hub-cta-band"
import { PropertyCard } from "@/components/property-card"
import { Reveal } from "@/components/reveal"
import { SiteFooter } from "@/components/site-footer"
import { FloatingButtons } from "@/components/floating-buttons"
import { GENERAL_WHATSAPP_URL } from "@/lib/site"
import { properties } from "@/lib/properties"

export default function Page() {
  return (
    <>
      <Navbar mode="hub" />
      <main>
        <HubHero />
        <HubTrustBar />

        <HubWhyUs />

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

            <Reveal delay={0.1} className="mt-8">
              <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/60 p-8 text-center">
                <h3 className="text-lg font-bold text-slate-800">¿No encuentras lo que buscas?</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                  Este directorio va sumando propiedades. Cuéntale a tu asesor qué necesitas — comprar
                  en otra zona, vender tu propiedad o rentar — y te contacta directo.
                </p>
                <a
                  href={GENERAL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-md transition-colors hover:bg-emerald-400"
                >
                  Escríbele a tu asesor
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <HubHowItWorks />

        <HubCtaBand />
      </main>
      <SiteFooter />
      <FloatingButtons />
    </>
  )
}
