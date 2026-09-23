import { Award, Handshake, Heart, Lightbulb, ShieldCheck, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"

const valores = [
  {
    icon: ShieldCheck,
    title: "Transparencia",
    description: "Te decimos lo que sí y lo que no, desde el primer contacto — sin letras chiquitas.",
  },
  {
    icon: Handshake,
    title: "Compromiso",
    description: "No te dejamos a medio proceso: acompañamos hasta que tengas las llaves.",
  },
  {
    icon: Users,
    title: "Trabajo en equipo",
    description: "Cada especialista conoce tu expediente completo, no solo su parte.",
  },
  {
    icon: Award,
    title: "Excelencia profesional",
    description: "Certificaciones y actualización constante en cada disciplina del equipo.",
  },
  {
    icon: Heart,
    title: "Cercanía",
    description: "Hablamos claro, en tus tiempos, sin tecnicismos innecesarios.",
  },
  {
    icon: Lightbulb,
    title: "Mejora continua",
    description: "Afinamos procesos y herramientas para que todo avance más rápido, sin perder el trato personal.",
  },
]

export function AboutValues() {
  return (
    <section id="valores" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center text-3xl font-extrabold text-slate-800 sm:text-4xl">
            Lo que no negociamos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Los valores que guían cada expediente, tenga el tamaño que tenga.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valores.map((valor, i) => (
            <Reveal key={valor.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                  <valor.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-800">{valor.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{valor.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
