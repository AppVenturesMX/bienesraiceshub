import { Banknote, BedDouble, Briefcase, Car, Droplets, Landmark, Building2, MapPin, Sofa, Warehouse, Waves, type LucideIcon } from "lucide-react"
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/site"

export type GaleriaImage = {
  src: string
  alt: string
}

export type IconItem = {
  icon: LucideIcon
  title: string
  description: string
}

export type PagoOption = {
  icon: LucideIcon
  label: string
}

export type Property = {
  slug: string
  status: "disponible" | "apartada" | "vendida"

  // Hero
  locationBadge: string
  title: string
  description: string
  price: number
  currency: string
  heroImage: GaleriaImage

  // SEO
  metaTitle: string
  metaDescription: string

  // Galería
  gallery: GaleriaImage[]

  // Ubicación
  ubicacionHeading: string
  ubicacionSubheading: string
  ubicacionItems: IconItem[]
  mapEmbedSrc: string
  mapCaption: string

  // Espacios
  espaciosHeading: string
  espaciosSubheading: string
  espaciosItems: IconItem[]

  // Facilidades de pago (formas de pago aceptadas para esta propiedad)
  formasDePago: PagoOption[]

  // Contacto
  contactoHeading: string
  contactoSubheading: string
  whatsappNumber: string
  whatsappMessage: string

  // Footer / disclaimers
  disclaimer: string
}

export const properties: Property[] = [
  {
    slug: "granizo-playas-tijuana",
    status: "disponible",

    locationBadge: "Playas de Tijuana · Sección Monumental",
    title: "La casa de tus sueños en Playas de Tijuana: alta plusvalía y potencial comercial.",
    description:
      "Amplia residencia en la Sección Monumental de Playas de Tijuana, una de las zonas con mayor plusvalía y potencial comercial de la ciudad.",
    price: 439000,
    currency: "USD",
    heroImage: {
      src: "/images/properties/granizo-playas-tijuana/fachada.jpg",
      alt: "Fachada de la residencia en la Sección Monumental, Playas de Tijuana",
    },

    metaTitle: "Residencia con alta plusvalía en Playas de Tijuana | $439,000 USD — Bienes Raíces Hub",
    metaDescription:
      "Amplia residencia en la Sección Monumental de Playas de Tijuana. 3 recámaras, a 10 min de la frontera y a 3 cuadras del nuevo Malecón. Agenda tu cita con el asesor.",

    gallery: [
      { src: "/images/properties/granizo-playas-tijuana/fachada.jpg", alt: "Fachada de la residencia con cochera y portón" },
      { src: "/images/properties/granizo-playas-tijuana/sala-2.jpg", alt: "Sala amplia con ventilador de techo y sofás" },
      { src: "/images/properties/granizo-playas-tijuana/sala.jpg", alt: "Sala con chimenea decorativa y área de descanso" },
      { src: "/images/properties/granizo-playas-tijuana/comedor.jpg", alt: "Comedor con mesa de madera y luz natural" },
      { src: "/images/properties/granizo-playas-tijuana/cocina.jpg", alt: "Cocina integral con barra y gabinetes de madera" },
      { src: "/images/properties/granizo-playas-tijuana/cocina-barra.jpg", alt: "Barra de cocina con bancos, abierta al comedor" },
      { src: "/images/properties/granizo-playas-tijuana/estancia.jpg", alt: "Estancia con sala de TV y barandal de escalera" },
      { src: "/images/properties/granizo-playas-tijuana/recamara-2.jpg", alt: "Recámara con clósets integrados y piso de madera" },
      { src: "/images/properties/granizo-playas-tijuana/recamara-3.jpg", alt: "Recámara luminosa con ventanal y techo alto" },
      { src: "/images/properties/granizo-playas-tijuana/recamara-principal.jpg", alt: "Recámara con cama de madera y ventana" },
      { src: "/images/properties/granizo-playas-tijuana/recamara-literas.jpg", alt: "Recámara con literas y clósets integrados" },
      { src: "/images/properties/granizo-playas-tijuana/bano.jpg", alt: "Baño completo con regadera y tocador" },
      { src: "/images/properties/granizo-playas-tijuana/patio.jpg", alt: "Patio trasero amplio con acabados de concreto" },
      { src: "/images/properties/granizo-playas-tijuana/patio-lateral.jpg", alt: "Patio interior con piso de ladrillo" },
    ],

    ubicacionHeading: "Una ubicación que lo tiene todo",
    ubicacionSubheading: "Conectividad envidiable, playa cerca y todos los servicios a tu alcance.",
    ubicacionItems: [
      {
        icon: Car,
        title: "A unos 10 minutos de la frontera",
        description:
          "A unos 10 minutos de la línea fronteriza (según tráfico), con fácil acceso a los cruces internacionales.",
      },
      {
        icon: Waves,
        title: "3 cuadras del nuevo Malecón",
        description:
          "En plena remodelación, un proyecto que puede favorecer la plusvalía de la zona con el paso del tiempo.",
      },
      {
        icon: MapPin,
        title: "Todo a la redonda",
        description:
          "A unos pasos del Blvd. Paseo Playas de Tijuana y la Plaza Monumental. Walmart, cines, bancos y cafés cerca.",
      },
    ],
    mapEmbedSrc:
      "https://maps.google.com/maps?q=Secci%C3%B3n%20Monumental%2C%20Playas%20de%20Tijuana%2C%20Baja%20California&z=15&output=embed",
    mapCaption: "Ubicación aproximada (Sección Monumental). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "Espacios que enamoran",
    espaciosSubheading: "Amplitud, confort y detalles pensados para vivir sin preocupaciones.",
    espaciosItems: [
      {
        icon: BedDouble,
        title: "3 Recámaras + Estancia de TV",
        description:
          "Con opción a convertirse en 4ta recámara o tu oficina de Home Office. La recámara principal es un oasis con baño privado y clóset gigante.",
      },
      {
        icon: Sofa,
        title: "Área Social",
        description: "Sala súper amplia para tus reuniones, comedor independiente y cocina integral lista para disfrutar.",
      },
      {
        icon: Warehouse,
        title: "Comodidad",
        description: "Estacionamiento techado, patio frontal y patio trasero.",
      },
      {
        icon: Droplets,
        title: "Plus técnico",
        description:
          "Cisterna de concreto con bomba (¡olvídate de los cortes de agua!), tanque estacionario y boiler Bosch de alta capacidad.",
      },
      {
        icon: Briefcase,
        title: "¿Visión de negocio?",
        description: "Ubicación con potencial de uso comercial (sujeto a verificación del uso de suelo).",
      },
    ],

    formasDePago: [
      { icon: Banknote, label: "Efectivo" },
      { icon: Landmark, label: "Crédito Bancario" },
      { icon: Building2, label: "Cofinavit" },
    ],

    contactoHeading: "Agenda tu cita con el asesor inmobiliario y conoce la residencia en persona.",
    contactoSubheading: "Déjanos ayudarte a dar el siguiente paso hacia la casa de tus sueños en Playas de Tijuana.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage: "Hola, me interesa la residencia en Sección Monumental de $439,000 USD. Quiero agendar una cita con el asesor.",

    disclaimer:
      "Precio expresado en dólares americanos (USD). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
  },
  {
    slug: "arrecife-san-antonio-del-mar",
    status: "disponible",

    locationBadge: "San Antonio del Mar · Arrecife, Tijuana",
    title:
      "Residencia frente al mar de 410 m² en el fraccionamiento privado San Antonio del Mar, con vistas panorámicas al Pacífico en tres niveles.",
    description:
      "Casa de 4 recámaras y 4.5 baños en un fraccionamiento privado tipo resort, con alberca, seguridad 24/7 y acceso a la playa a unos pasos, en Arrecife, Tijuana.",
    price: 380000,
    currency: "USD",
    heroImage: {
      src: "/images/properties/arrecife-san-antonio-del-mar/fachada.jpg",
      alt: "Fachada de la residencia con muro de piedra volcánica y acceso principal",
    },

    metaTitle: "Residencia frente al mar en San Antonio del Mar, Tijuana | $380,000 USD — Bienes Raíces Hub",
    metaDescription:
      "Residencia de 410 m² en el fraccionamiento privado San Antonio del Mar, Tijuana. 4 recámaras, vistas al Pacífico en tres niveles, alberca y seguridad 24/7. Agenda tu visita con el asesor.",

    gallery: [
      { src: "/images/properties/arrecife-san-antonio-del-mar/fachada.jpg", alt: "Fachada de la residencia con muro de piedra volcánica y acceso principal" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/acceso-entrada.jpg", alt: "Acceso techado hacia la puerta principal, con piso de talavera y jardín interior" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/vestibulo.jpg", alt: "Vestíbulo de entrada con puertas de madera talladas y vitrales artesanales" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/sala-chimenea.jpg", alt: "Sala con chimenea de piedra volcánica y vista al mar de fondo" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/cocina.jpg", alt: "Cocina completa con alacena y acceso directo a la sala" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/cocina-detalle.jpg", alt: "Área de cocina con ventana y vista al mar" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/terraza-exterior.jpg", alt: "Terraza exterior con acabados de ladrillo en el segundo nivel" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/recibidor.jpg", alt: "Recibidor con arcos de ladrillo y acceso a medio baño" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/medio-bano.jpg", alt: "Medio baño con talavera azul y blanca" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/cochera.jpg", alt: "Cochera techada para 3 autos con acceso doble" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/escalera.jpg", alt: "Escalera interior con tragaluz y arcos de ladrillo" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/cocina-alacena.jpg", alt: "Cocina con alacena de madera y horno empotrado" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/walk-in-closet.jpg", alt: "Walk-in closet de la recámara principal" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/bano-principal.jpg", alt: "Baño principal con regadera de block de vidrio y doble tocador" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/recamara.jpg", alt: "Recámara con ventana amplia y vista al fraccionamiento" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/sala-vista-mar.jpg", alt: "Estancia de techos altos con chimenea y vista panorámica al mar" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/bano-talavera.jpg", alt: "Baño con talavera artesanal en tocador y muros" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/terraza-vista-mar.jpg", alt: "Terraza privada con chimenea y vista al atardecer sobre el Pacífico" },
      { src: "/images/properties/arrecife-san-antonio-del-mar/estancia.jpg", alt: "Estancia con vigas de madera y chimenea, con acceso a terraza" },
    ],

    ubicacionHeading: "Una ubicación frente al mar, con todo cerca",
    ubicacionSubheading: "Conectividad estratégica y las comodidades de un fraccionamiento privado.",
    ubicacionItems: [
      {
        icon: Waves,
        title: "Acceso a la playa a unos pasos",
        description:
          "El fraccionamiento privado San Antonio del Mar tiene salida directa a la playa, a solo unos pasos de la residencia.",
      },
      {
        icon: Car,
        title: "A minutos de Rosarito y la línea internacional",
        description:
          "Conectividad estratégica hacia el corredor costero de Rosarito, Playas de Tijuana y los cruces fronterizos con Estados Unidos.",
      },
      {
        icon: MapPin,
        title: "Restaurantes y comercios a la mano",
        description:
          "A un lado de los mejores restaurantes y comercios de la zona, con escuelas y parques cercanos.",
      },
    ],
    mapEmbedSrc:
      "https://maps.google.com/maps?q=San%20Antonio%20del%20Mar%2C%20Arrecife%2C%20Tijuana%2C%20Baja%20California&z=15&output=embed",
    mapCaption: "Ubicación aproximada (Fraccionamiento San Antonio del Mar). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "Espacios con carácter, en tres niveles",
    espaciosSubheading: "410 m² de construcción con arquitectura mediterránea y vistas al mar.",
    espaciosItems: [
      {
        icon: BedDouble,
        title: "4 Recámaras + 4.5 Baños",
        description:
          "La recámara principal está en la planta alta, con chimenea propia, walk-in closet y terraza privada.",
      },
      {
        icon: Landmark,
        title: "Arquitectura con carácter",
        description:
          "Dos chimeneas de piedra volcánica, puertas de madera talladas con vitrales artesanales y arcos de ladrillo en toda la casa.",
      },
      {
        icon: Warehouse,
        title: "Cochera para 3 autos",
        description: "Cochera techada con acceso doble, por el frente y por la calle de atrás de la propiedad.",
      },
      {
        icon: Droplets,
        title: "Plus técnico",
        description:
          "Aire acondicionado en toda la casa, cisterna de agua con bomba y cisterna de gas.",
      },
      {
        icon: Building2,
        title: "Fraccionamiento privado tipo resort",
        description:
          "Casa club con alberca, cancha de tenis y fútbol, parque infantil y caseta de vigilancia con seguridad 24/7.",
      },
    ],

    formasDePago: [
      { icon: Banknote, label: "Efectivo" },
      { icon: Building2, label: "Crédito Infonavit" },
      { icon: Landmark, label: "Crédito Bancario" },
    ],

    contactoHeading: "Agenda tu visita privada y conoce esta residencia frente al mar.",
    contactoSubheading:
      "Descubre en persona los tres niveles, las vistas al Pacífico y las amenidades del fraccionamiento San Antonio del Mar.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage:
      "Hola, me interesa la residencia frente al mar en San Antonio del Mar de $380,000 USD. Quiero agendar una visita con el asesor.",

    disclaimer:
      "Precio expresado en dólares americanos (USD). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
  },
]

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

// Orden de preferencia para el mosaico del hero: primero las tomas más
// "vendedoras" (exterior, áreas sociales), al final las más utilitarias
// (baño, litera). Se compara contra el nombre de archivo (sin extensión).
const HERO_MOSAIC_PRIORITY = [
  "fachada",
  "patio",
  "sala",
  "comedor",
  "cocina-barra",
  "recamara-principal",
  "estancia",
  "cocina",
  "sala-2",
  "patio-lateral",
  "recamara-3",
  "recamara-2",
  "bano",
  "recamara-literas",
]

function heroMosaicRank(img: GaleriaImage): number {
  const basename = img.src.split("/").pop()?.replace(/\.[a-z]+$/i, "") ?? ""
  const rank = HERO_MOSAIC_PRIORITY.indexOf(basename)
  return rank === -1 ? HERO_MOSAIC_PRIORITY.length : rank
}

// Fotos reales para el mosaico de fondo del hero del Hub. Toma la galería de
// todas las propiedades (hoy solo una), prioriza las tomas más atractivas y
// repite en ciclo hasta llenar `count` casillas, así el mosaico se enriquece
// solo conforme se agreguen propiedades.
export function getHeroMosaicImages(count = 8): GaleriaImage[] {
  const pool = properties.flatMap((p) => p.gallery).sort((a, b) => heroMosaicRank(a) - heroMosaicRank(b))
  if (pool.length === 0) return []
  return Array.from({ length: count }, (_, i) => pool[i % pool.length])
}

export function getPropertyWhatsAppUrl(property: Property) {
  return buildWhatsAppUrl(property.whatsappMessage, property.whatsappNumber)
}
