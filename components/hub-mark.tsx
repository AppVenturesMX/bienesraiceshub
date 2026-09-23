// Ícono de marca de Bienes Raíces Hub — "Nodo Central": la casa conectada a
// tres nodos, representando el modelo de servicios conectados del Hub
// (comprar/vender/rentar, o hipoteca/jurídico/marketing). Reemplaza el
// ícono genérico de casa (Home2). Monocromo vía currentColor, con los
// nodos en menor opacidad para diferenciarlos sin depender de un segundo
// color — así funciona igual de bien dentro del badge emerald del navbar
// que sobre fondo claro u oscuro.
export function HubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <polygon points="20,32 32,22 44,32" fill="currentColor" />
      <rect x="22" y="32" width="20" height="16" fill="currentColor" />
      <circle cx="55" cy="17" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="59" cy="36" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="55" cy="53" r="5" fill="currentColor" opacity="0.55" />
    </svg>
  )
}
