/* Marca de 7 puntos (SOC / Sinergia), dibujada como SVG para que se vea nítida a cualquier tamaño.
   Compartida por los botones "Precalifícate gratis" del Hub y de cada landing de propiedad. */
export function SocMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 121 133" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="60.2" cy="19.2" r="19.2" />
      <circle cx="19.3" cy="42.7" r="19.2" />
      <circle cx="101" cy="42.6" r="19.2" />
      <circle cx="60.1" cy="66.3" r="19.2" />
      <circle cx="19.3" cy="89.9" r="19.2" />
      <circle cx="101" cy="89.9" r="19.2" />
      <circle cx="60.2" cy="113.4" r="19.2" />
    </svg>
  )
}
