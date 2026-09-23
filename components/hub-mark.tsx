// Ícono de marca de Bienes Raíces Hub — "Nodo Central": la casa conectada a
// tres nodos vía líneas explícitas, representando el modelo de servicios
// conectados del Hub (comprar/vender/rentar, o hipoteca/jurídico/marketing).
// Reemplaza el ícono genérico de casa (Home2). Monocromo vía currentColor:
// la casa a opacidad completa, las líneas de conexión y los nodos en menor
// opacidad para que el ojo lea primero "casa" y luego "conectada a algo" —
// así funciona igual de bien dentro del badge emerald del navbar que sobre
// fondo claro u oscuro. (El favicon en public/icon.svg usa una versión sin
// líneas a propósito: a 32px las líneas finas se pierden; ver A-Usage.dc.html
// en el canvas de diseño para el razonamiento completo.)
export function HubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <line x1="42" y1="34" x2="55" y2="17" />
        <line x1="42" y1="38" x2="59" y2="36" />
        <line x1="42" y1="44" x2="55" y2="53" />
      </g>
      <polygon points="20,32 32,22 44,32" fill="currentColor" />
      <rect x="22" y="32" width="20" height="16" fill="currentColor" />
      <circle cx="55" cy="17" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="59" cy="36" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="55" cy="53" r="5" fill="currentColor" opacity="0.55" />
    </svg>
  )
}
