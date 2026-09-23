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
    title: "¿Trabajas en San Diego pero sueñas con vivir frente al mar?",
    description:
      "Amplia residencia en la Sección Monumental de Playas de Tijuana. Tranquilidad del Pacífico + conectividad envidiable.",
    price: 439000,
    currency: "USD",
    heroImage: {
      src: "/images/properties/granizo-playas-tijuana/fachada.jpg",
      alt: "Fachada de la residencia en la Sección Monumental, Playas de Tijuana",
    },

    metaTitle: "Residencia frente al mar en Playas de Tijuana | $439,000 USD — Bienes Raíces Hub",
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
          "A unos 10 minutos de la línea fronteriza (según tráfico). Pensada para quien cruza a San Diego con frecuencia.",
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
    contactoSubheading: "Déjanos ayudarte a dar el siguiente paso hacia tu nueva vida frente al mar.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage: "Hola, me interesa la residencia en Sección Monumental de $439,000 USD. Quiero agendar una cita con el asesor.",

    disclaimer:
      "Precio expresado en dólares americanos (USD). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
  },
]

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug)
}

export function getPropertyWhatsAppUrl(property: Property) {
  return buildWhatsAppUrl(property.whatsappMessage, property.whatsappNumber)
}
