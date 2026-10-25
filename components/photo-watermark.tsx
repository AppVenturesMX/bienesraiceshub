import { HubMark } from "./hub-mark"

// Marca de agua de Bienes Raíces Hub para fotografías de propiedades: badge
// circular en la esquina con la marca completa (casa + nodos conectados),
// suficiente para identificar la marca si la foto se comparte fuera del
// sitio, sin competir con la fotografía ni con el texto de la leyenda. Se
// coloca dentro de un contenedor relative.
//
// Usa HubMark completo (no HubMarkSimple): a partir de ~40px de render los
// nodos y las líneas de conexión se leen bien (ver nota en hub-mark.tsx), así
// que el badge se dimensionó por encima de ese umbral a propósito.
// Se arma con React.createElement (sin JSX) para evitar que el autocompletado
// de etiquetas del editor web de GitHub duplique las etiquetas de cierre.
import * as React from "react"

export function PhotoWatermark({ className }: { className?: string }) {
    return React.createElement(
          "div",
      {
              "aria-hidden": "true",
              className: `pointer-events-none absolute bottom-3 right-3 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur-sm sm:h-20 sm:w-20 ${className ?? ""}`,
      },
          React.createElement(HubMark, {
                  className: "h-10 w-10 text-emerald-700 sm:h-12 sm:w-12",
          })
        )
}
