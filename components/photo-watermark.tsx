import { HubMark } from "./hub-mark"

// Marca de agua discreta para fotografías de propiedades: un badge circular
// pequeño en la esquina, suficiente para identificar la marca si la foto se
// comparte fuera del sitio, sin competir con la fotografía ni con el texto
// de la leyenda. Se coloca dentro de un contenedor `relative`.
export function PhotoWatermark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/75 shadow-sm backdrop-blur-sm sm:h-9 sm:w-9 ${className ?? ""}`}
    >
      <HubMark className="h-4 w-4 text-emerald-700 sm:h-5 sm:w-5" />
    </div>
  )
}
