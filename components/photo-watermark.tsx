import { HubMark, HubMarkSimple } from "./hub-mark"

// Marca de agua discreta para fotografías de propiedades: un badge circular
// pequeño en la esquina, suficiente para identificar la marca si la foto se
// comparte fuera del sitio, sin competir con la fotografía ni con el texto
// de la leyenda. Se coloca dentro de un contenedor `relative`.
//
// variant="full" (default) — para la foto grande (portada del hero, imagen
// destacada de la galería): usa HubMark completo (casa + 3 conectores). El
// badge va a ~40-48px para que las líneas de conexión se alcancen a leer
// (por debajo de ~40px el ícono completo pierde legibilidad).
//
// variant="simple" — para miniaturas chicas (grid de galería): usa
// HubMarkSimple (solo casa, sin nodos), porque a esos tamaños los
// conectores de HubMark se pierden y se ven como manchas verdes sueltas en
// vez de parte del ícono.
export function PhotoWatermark({
  className,
  variant = "full",
}: {
  className?: string
  variant?: "full" | "simple"
}) {
  if (variant === "simple") {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/75 shadow-sm backdrop-blur-sm sm:h-6 sm:w-6 ${className ?? ""}`}
      >
        <HubMarkSimple className="h-2.5 w-2.5 text-emerald-700 sm:h-3 sm:w-3" />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm sm:h-12 sm:w-12 ${className ?? ""}`}
    >
      <HubMark className="h-6 w-6 text-emerald-700 sm:h-7 sm:w-7" />
    </div>
  )
}
