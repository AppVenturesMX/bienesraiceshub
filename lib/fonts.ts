import localFont from "next/font/local"

// Tipografía de marca — solo para el wordmark "Bienes Raíces Hub" en navbar y
// footer, no para el cuerpo del sitio (que se queda con la fuente por defecto
// para máxima legibilidad). Geométrica y con carácter, coherente con el
// ícono de nodos conectados (HubMark): mismo espíritu "tech/hub", sin dejar
// de sentirse confiable para un sitio de bienes raíces.
//
// Se sirve como archivo local (vía el paquete @fontsource/space-grotesk) en
// vez de next/font/google porque el build no siempre tiene salida directa a
// fonts.googleapis.com — así el build nunca depende de esa red y el font
// queda igual de auto-hospedado en producción.
export const brandFont = localFont({
  src: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-brand",
})
