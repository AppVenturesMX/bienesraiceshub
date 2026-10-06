import { Banknote, Bath, BedDouble, Briefcase, Car, ChefHat, Droplets, Landmark, Building2, MapPin, Percent, ShieldCheck, ShoppingBag, Sofa, Warehouse, Waves, WashingMachine, type LucideIcon } from "lucide-react"
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
        description: "Estacionamiento techado para 1 vehículo, patio frontal y patio trasero.",
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
      "Residencia frente al mar de 410 m² de construcción sobre 182 m² de terreno en el fraccionamiento privado San Antonio del Mar, con vistas panorámicas al Pacífico en tres niveles.",
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
      "Residencia de 410 m² de construcción sobre 182 m² de terreno en el fraccionamiento privado San Antonio del Mar, Tijuana. 4 recámaras, vistas al Pacífico en tres niveles, alberca y seguridad 24/7. Agenda tu visita con el asesor.",

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
    espaciosSubheading: "410 m² de construcción sobre 182 m² de terreno, con arquitectura mediterránea y vistas al mar.",
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
  {
    slug: "amatista-punta-azul",
    status: "disponible",

    locationBadge: "Punta Azul · Lienzo Charro, Rosarito",
    title:
      "Casa nueva de 3 niveles con roof deck y vista al mar, dentro del fraccionamiento Punta Azul en Playas de Rosarito.",
    description:
      "Amatista, casa de 3 recámaras y 4 baños de 157 m² de construcción, en el fraccionamiento privado Punta Azul (Lienzo Charro), con alberca, gimnasio, canchas de tenis y seguridad 24/7.",
    price: 295000,
    currency: "USD",
    heroImage: {
      src: "/images/properties/amatista-punta-azul/fachada-modelo.jpg",
      alt: "Fachada de una casa terminada del desarrollo Punta Azul, con cochera y roof deck",
    },

    metaTitle: "Casa Amatista en Punta Azul, Rosarito | $295,000 USD — Bienes Raíces Hub",
    metaDescription:
      "Casa nueva de 157 m² de construcción sobre 120 m² de terreno en el fraccionamiento Punta Azul, Playas de Rosarito. 3 recámaras, 4 baños, roof deck con vista al mar y amenidades tipo resort. Agenda tu visita con el asesor.",

    gallery: [
      { src: "/images/properties/amatista-punta-azul/fachada-modelo.jpg", alt: "Fachada de una casa terminada del desarrollo Punta Azul, con cochera y roof deck" },
      { src: "/images/properties/amatista-punta-azul/render-sala-doble-altura.jpg", alt: "Render de sala y comedor de concepto abierto con techo de doble altura" },
      { src: "/images/properties/amatista-punta-azul/render-cocina-comedor.jpg", alt: "Render de cocina con isla y comedor integrado" },
      { src: "/images/properties/amatista-punta-azul/render-recamara.jpg", alt: "Render de recámara con clóset y balcón" },
      { src: "/images/properties/amatista-punta-azul/obra-fachada-avance.jpg", alt: "Fachada de la casa en etapa de avance de obra, con ventanas protegidas" },
      { src: "/images/properties/amatista-punta-azul/obra-doble-altura.jpg", alt: "Interior en obra: sala de doble altura con tragaluz y ventanas altas" },
      { src: "/images/properties/amatista-punta-azul/obra-pasillo.jpg", alt: "Pasillo del segundo nivel en etapa de obra, con material de acabados" },
      { src: "/images/properties/amatista-punta-azul/obra-pasillo-noche.jpg", alt: "Pasillo del segundo nivel en obra, vista hacia el hueco de escalera" },
      { src: "/images/properties/amatista-punta-azul/obra-escalera.jpg", alt: "Escalera interior en etapa de obra gris" },
      { src: "/images/properties/amatista-punta-azul/obra-cochera.jpg", alt: "Cochera techada en etapa de obra, con vista a la calle del fraccionamiento" },
      { src: "/images/properties/amatista-punta-azul/roof-deck-dia.jpg", alt: "Roof deck de día, con vista panorámica hacia el mar a la distancia" },
      { src: "/images/properties/amatista-punta-azul/roof-deck-noche.jpg", alt: "Roof deck al atardecer, con acabados terminados" },
    ],

    ubicacionHeading: "Dentro de un fraccionamiento privado en Playas de Rosarito",
    ubicacionSubheading: "Acceso controlado, amenidades tipo resort y la costa de Rosarito a la mano.",
    ubicacionItems: [
      {
        icon: MapPin,
        title: "Fraccionamiento Punta Azul, Lienzo Charro",
        description: "Dentro de la zona de Lienzo Charro, en Playas de Rosarito, con acceso controlado y áreas comunes compartidas.",
      },
      {
        icon: Car,
        title: "Corredor costero hacia Tijuana y la frontera",
        description: "Ubicación en Rosarito, con conexión por la carretera costera hacia Playas de Tijuana y los cruces internacionales.",
      },
      {
        icon: Waves,
        title: "Playas y restaurantes de Rosarito cerca",
        description: "A poca distancia de las playas de Rosarito y de una oferta amplia de restaurantes y comercios de la zona.",
      },
    ],
    mapEmbedSrc:
      "https://maps.google.com/maps?q=Lienzo%20Charro%2C%20Playas%20de%20Rosarito%2C%20Baja%20California&z=13&output=embed",
    mapCaption: "Ubicación aproximada (Lienzo Charro, Rosarito). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "Diseño contemporáneo en 3 niveles",
    espaciosSubheading: "157 m² de construcción sobre 120 m² de terreno, casa nueva con roof deck propio.",
    espaciosItems: [
      {
        icon: BedDouble,
        title: "3 Recámaras + 4 Baños",
        description: "La recámara principal está en el segundo nivel, con baño completo y vestidor propio.",
      },
      {
        icon: Building2,
        title: "Concepto abierto de doble altura",
        description: "Sala con techo de doble altura, cocina con isla y comedor integrado en el primer nivel, con balcón en el segundo.",
      },
      {
        icon: Waves,
        title: "Roof deck con vista al mar",
        description: "Terraza propia en la azotea con vista hacia el Pacífico a la distancia, con orientación poniente para el atardecer.",
      },
      {
        icon: Warehouse,
        title: "Fraccionamiento tipo resort",
        description: "Alberca, jacuzzi, sauna, gimnasio, canchas de tenis, salón de eventos, restaurantes, áreas infantiles y seguridad 24/7.",
      },
      {
        icon: Car,
        title: "Cochera techada para 2 autos",
        description: "Casa nueva (0 años de antigüedad), con 2 estacionamientos techados y cuarto de lavado en la planta baja.",
      },
    ],

    formasDePago: [
      { icon: Percent, label: "Financiamiento Directo" },
      { icon: Landmark, label: "Crédito Bancario" },
      { icon: Banknote, label: "Efectivo" },
    ],

    contactoHeading: "Agenda tu visita y conoce Amatista, Punta Azul en persona.",
    contactoSubheading:
      "Financiamiento directo a 5 años (10% anual), sin trámite bancario — o si prefieres, te ayudamos a tramitar tu crédito bancario sin costo.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage:
      "Hola, me interesa la casa Amatista en Punta Azul, Rosarito, de $295,000 USD. Quiero agendar una visita con el asesor.",

    disclaimer:
      "Precio expresado en dólares americanos (USD). Propiedad en construcción: las fotos incluyen renders de diseño y avance de obra real; los acabados finales pueden variar respecto a los renders. Cuota de mantenimiento del fraccionamiento: $150 USD/mes, incluye acceso a las amenidades. Precio, disponibilidad y condiciones de financiamiento están sujetos a cambio sin previo aviso.",
  },
  {
    slug: "departamento-20-de-noviembre",
    status: "disponible",

    locationBadge: "20 de Noviembre · Tijuana",
    title:
      "Departamento de 70 m² con cuarto de estudio, a minutos de Plaza Río, la Garita y Otay, en un conjunto privado de solo 4 torres en la colonia 20 de Noviembre.",
    description:
      "Departamento de 2 recámaras, cuarto de estudio y cochera techada en la colonia 20 de Noviembre, dentro de un conjunto privado con acceso controlado, a minutos de Plaza Río, la Garita y Otay.",
    price: 2600000,
    currency: "MXN",
    heroImage: {
      src: "/images/properties/departamento-20-de-noviembre/fachada.jpg",
      alt: "Fachada del conjunto privado en la colonia 20 de Noviembre, Tijuana",
    },

    metaTitle: "Departamento en 20 de Noviembre, Tijuana | $2,600,000 MXN — Bienes Raíces Hub",
    metaDescription:
      "Departamento de 70 m², 2 recámaras y cuarto de estudio en la colonia 20 de Noviembre, Tijuana. A 5 minutos de Plaza Río, la Garita San Ysidro y Otay. Agenda tu cita con el asesor.",

    gallery: [
      { src: "/images/properties/departamento-20-de-noviembre/fachada.jpg", alt: "Fachada del conjunto privado en la colonia 20 de Noviembre, Tijuana" },
      { src: "/images/properties/departamento-20-de-noviembre/sala-cocina.jpg", alt: "Sala de concepto abierto con vista a la cocina integral" },
      { src: "/images/properties/departamento-20-de-noviembre/sala.jpg", alt: "Área de sala con ventana y vista al conjunto" },
      { src: "/images/properties/departamento-20-de-noviembre/cocina.jpg", alt: "Cocina equipada con refrigerador, microondas y estufa" },
      { src: "/images/properties/departamento-20-de-noviembre/recamara-principal.jpg", alt: "Recámara principal con clóset de espejo" },
      { src: "/images/properties/departamento-20-de-noviembre/recamara-secundaria.jpg", alt: "Recámara secundaria con dos camas individuales" },
      { src: "/images/properties/departamento-20-de-noviembre/recamara-vacia.jpg", alt: "Recámara con piso de madera y ventana" },
      { src: "/images/properties/departamento-20-de-noviembre/estudio.jpg", alt: "Cuarto adicional, ideal como estudio u oficina en casa" },
      { src: "/images/properties/departamento-20-de-noviembre/bano.jpg", alt: "Baño completo con regadera y tocador" },
      { src: "/images/properties/departamento-20-de-noviembre/area-lavado.jpg", alt: "Área de lavado con tarja y conexiones" },
    ],

    ubicacionHeading: "Una ubicación que te ahorra tiempo cada día",
    ubicacionSubheading: "A minutos de los puntos que más usas en tu día a día, sin perder horas en el tráfico.",
    ubicacionItems: [
      {
        icon: Car,
        title: "A 5 minutos de la Garita San Ysidro",
        description:
          "Cruce fronterizo hacia San Diego a unos 5 minutos en auto (según tráfico), para quienes cruzan con frecuencia.",
      },
      {
        icon: MapPin,
        title: "A 5 minutos de Plaza Río",
        description:
          "Zona Río y Plaza Río a unos 5 minutos, además de 3 minutos al Hipódromo y Plaza Galerías.",
      },
      {
        icon: Briefcase,
        title: "A 5 minutos de Otay",
        description:
          "Zona industrial y empresarial de Otay a unos 5 minutos, con hospitales, universidades y servicios cercanos.",
      },
    ],
    mapEmbedSrc:
      "https://maps.google.com/maps?q=20%20de%20Noviembre%2C%20Tijuana%2C%20Baja%20California&z=14&output=embed",
    mapCaption: "Ubicación aproximada (Colonia 20 de Noviembre). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "70 m² bien distribuidos",
    espaciosSubheading: "Un conjunto privado de solo 4 torres, con espacios pensados para vivir o rentar.",
    espaciosItems: [
      {
        icon: BedDouble,
        title: "2 Recámaras + Cuarto de Estudio",
        description:
          "Recámaras con clóset y un cuarto adicional que puede funcionar como estudio, home office o tercera habitación.",
      },
      {
        icon: Sofa,
        title: "Cocina integral y área social",
        description: "Cocina con barra y refrigerador incluido, además de sala y comedor en espacios independientes.",
      },
      {
        icon: Warehouse,
        title: "Cochera techada + visitas",
        description: "Un cajón de estacionamiento techado para el departamento, más área de estacionamiento para visitas.",
      },
      {
        icon: Droplets,
        title: "Plus técnico",
        description: "Cisterna de agua propia del conjunto, para no depender de los cortes de la red municipal.",
      },
      {
        icon: Building2,
        title: "Conjunto privado de 4 torres",
        description: "Acceso controlado, portón eléctrico y administración profesional, en un conjunto de solo 4 torres.",
      },
    ],

    formasDePago: [
      { icon: Landmark, label: "Crédito Bancario" },
      { icon: Building2, label: "Infonavit" },
      { icon: Percent, label: "Cofinavit" },
    ],

    contactoHeading: "Agenda tu visita y conoce este departamento en 20 de Noviembre.",
    contactoSubheading: "Descubre en persona la distribución, el conjunto privado y lo cerca que está de todo.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage:
      "Hola, me interesa el departamento en 20 de Noviembre de $2,600,000 MXN. Quiero agendar una visita con el asesor.",

    disclaimer:
      "Precio expresado en pesos mexicanos (MXN). Cuota de mantenimiento del conjunto: $650 MXN/mes. Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
  },
  {
    slug: "privada-verona-napoles",
    status: "disponible",

    locationBadge: "Verona Residencial · Tijuana",
    title:
      "Casa de 3 recámaras en el fraccionamiento privado Verona Residencial, con acceso controlado y seguridad 24 horas, en Tijuana.",
    description:
      "Casa de 110 m² de construcción sobre 140 m² de terreno, con 3 recámaras y 2.5 baños, dentro de una comunidad privada con acceso controlado y seguridad 24 horas.",
    price: 3650000,
    currency: "MXN",
    heroImage: {
      src: "/images/properties/privada-verona-napoles/fachada.jpg",
      alt: "Fachada de la casa en Privada Verona Nápoles, Tijuana",
    },

    metaTitle: "Casa en Verona Residencial, Tijuana | $3,650,000 MXN — Bienes Raíces Hub",
    metaDescription:
      "Casa de 110 m² de construcción, 3 recámaras y 2.5 baños en el fraccionamiento privado Verona Residencial, Tijuana. Acceso controlado, seguridad 24 horas y áreas verdes. Agenda tu cita con el asesor.",

    gallery: [
      { src: "/images/properties/privada-verona-napoles/fachada.jpg", alt: "Fachada de la casa en Privada Verona Nápoles, Tijuana" },
      { src: "/images/properties/privada-verona-napoles/sala.jpg", alt: "Amplia sala con excelente iluminación natural" },
      { src: "/images/properties/privada-verona-napoles/comedor.jpg", alt: "Comedor junto a la cocina, con acceso directo al patio" },
      { src: "/images/properties/privada-verona-napoles/cocina.jpg", alt: "Cocina integral con isla central y cubiertas de granito" },
      { src: "/images/properties/privada-verona-napoles/recamara-principal.jpg", alt: "Recámara principal con aire acondicionado y amplio espacio" },
      { src: "/images/properties/privada-verona-napoles/walk-in-closet.jpg", alt: "Walk-in clóset de la recámara principal con acceso al baño" },
      { src: "/images/properties/privada-verona-napoles/bano.jpg", alt: "Baño completo con regadera y acabados modernos" },
      { src: "/images/properties/privada-verona-napoles/recamara-secundaria-1.jpg", alt: "Recámara secundaria con amplio clóset integral" },
      { src: "/images/properties/privada-verona-napoles/recamara-secundaria-2.jpg", alt: "Segunda recámara secundaria, luminosa y amplia" },
      { src: "/images/properties/privada-verona-napoles/patio.jpg", alt: "Amplio patio, perfecto para reuniones, niños o mascotas" },
      { src: "/images/properties/privada-verona-napoles/estacionamiento-visitas.jpg", alt: "Área techada de estacionamiento para visitas del fraccionamiento" },
      { src: "/images/properties/privada-verona-napoles/areas-comunes.jpg", alt: "Áreas comunes y vialidades internas del fraccionamiento privado" },
    ],

    ubicacionHeading: "Una ubicación pensada para tu día a día",
    ubicacionSubheading: "Verona Residencial combina la tranquilidad de una comunidad privada con una conectividad privilegiada hacia el resto de Tijuana.",
    ubicacionItems: [
      {
        icon: Car,
        title: "Rápido acceso a vialidades principales",
        description:
          "Conectividad privilegiada hacia las principales zonas y vialidades de Tijuana, sin alejarte de la ciudad.",
      },
      {
        icon: ShoppingBag,
        title: "Cerca de lo que usas cada día",
        description:
          "Cercanía a supermercados, escuelas, restaurantes y centros comerciales, para resolver tu día a día sin trasladarte lejos.",
      },
      {
        icon: ShieldCheck,
        title: "Entorno limpio, ordenado y familiar",
        description:
          "Una comunidad privada pensada para familias y profesionistas que buscan tranquilidad sin renunciar a la cercanía con la ciudad.",
      },
    ],
    mapEmbedSrc:
      "https://maps.google.com/maps?q=Verona%20Residencial%2C%20Tijuana%2C%20Baja%20California&z=13&output=embed",
    mapCaption: "Ubicación aproximada (Verona Residencial). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "110 m² construidos, pensados para tu familia",
    espaciosSubheading: "Una casa de 3 recámaras en 140 m² de terreno, dentro de un fraccionamiento privado con acceso controlado.",
    espaciosItems: [
      {
        icon: BedDouble,
        title: "Recámara principal + 2 secundarias",
        description:
          "Recámara principal con aire acondicionado y amplio walk-in clóset; dos recámaras secundarias, cada una con clóset.",
      },
      {
        icon: Bath,
        title: "2 baños completos + medio baño",
        description:
          "Dos baños completos y un medio baño para visitas, distribuidos para la comodidad de toda la familia.",
      },
      {
        icon: ChefHat,
        title: "Cocina integral con isla central",
        description:
          "Cubiertas de granito y amplia sala-comedor con excelente iluminación natural, ideal para convivir en familia.",
      },
      {
        icon: Car,
        title: "Patio amplio + estacionamiento para 3 autos",
        description: "Patio perfecto para reuniones, niños o mascotas, más estacionamiento para hasta 3 vehículos.",
      },
      {
        icon: ShieldCheck,
        title: "Fraccionamiento privado con seguridad 24h",
        description:
          "Acceso controlado, seguridad 24 horas y área de juegos infantiles, en una comunidad tranquila y de excelente nivel.",
      },
    ],

    formasDePago: [
      { icon: Landmark, label: "Crédito Bancario" },
      { icon: Building2, label: "Infonavit / Cofinavit" },
      { icon: ShieldCheck, label: "FOVISSSTE" },
      { icon: Briefcase, label: "ISSFAM / Banjercito" },
    ],

    contactoHeading: "Agenda tu visita y conoce tu próximo hogar en Verona Residencial.",
    contactoSubheading: "Descubre en persona la distribución, el fraccionamiento privado y la comodidad que te espera.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage:
      "Hola, me interesa la casa en Privada Verona Nápoles de $3,650,000 MXN. Quiero agendar una visita con el asesor.",

    disclaimer:
      "Precio expresado en pesos mexicanos (MXN). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
  },
  {
    slug: "san-antonio-del-mar-50m",
    status: "disponible",

    locationBadge: "San Antonio del Mar · Tijuana-Rosarito",
    title:
      "Residencia a 50 metros del mar, en una calle privada con solo dos casas, entre Tijuana y Rosarito.",
    description:
      "Casa de 3 recámaras y 2.5 baños en San Antonio del Mar, con vista al mar, seguridad 24/7 y acceso directo a la carretera de cuota, entre Tijuana y Rosarito.",
    price: 7500000,
    currency: "MXN",
    heroImage: {
      src: "/images/properties/san-antonio-del-mar-50m/fachada.jpg",
      alt: "Fachada de la residencia en San Antonio del Mar, a 50 metros del mar",
    },

    metaTitle: "Casa a 50 metros del mar en San Antonio del Mar | $7,500,000 MXN — Bienes Raíces Hub",
    metaDescription:
      "Casa de 3 recámaras y 2.5 baños a 50 metros del mar, en una calle privada con solo dos casas, entre Tijuana y Rosarito. Seguridad 24/7 y acceso directo a la carretera de cuota. Agenda tu visita con el asesor.",

    gallery: [
      { src: "/images/properties/san-antonio-del-mar-50m/fachada.jpg", alt: "Fachada de la residencia en San Antonio del Mar, con cochera techada y acceso principal" },
      { src: "/images/properties/san-antonio-del-mar-50m/sala.jpg", alt: "Sala amplia con sofá modular, con vista al comedor y la cocina" },
      { src: "/images/properties/san-antonio-del-mar-50m/cocina.jpg", alt: "Cocina integral con gabinetes y barra de desayunador" },
      { src: "/images/properties/san-antonio-del-mar-50m/comedor-sala.jpg", alt: "Comedor y sala integrados, con iluminación cálida de noche" },
      { src: "/images/properties/san-antonio-del-mar-50m/recibidor.jpg", alt: "Recibidor de doble altura con acceso principal y guardarropa" },
      { src: "/images/properties/san-antonio-del-mar-50m/recamara-principal.jpg", alt: "Recámara principal con acceso a terraza y silla colgante" },
      { src: "/images/properties/san-antonio-del-mar-50m/recamara-secundaria.jpg", alt: "Recámara secundaria con closet y tocador" },
      { src: "/images/properties/san-antonio-del-mar-50m/terraza.jpg", alt: "Terraza privada con sala exterior, ideal para convivir al aire libre" },
      { src: "/images/properties/san-antonio-del-mar-50m/cocina-comedor.jpg", alt: "Área de cocina y comedor con barra de desayunador y luz natural" },
    ],

    ubicacionHeading: "A solo 50 metros del mar, entre Tijuana y Rosarito",
    ubicacionSubheading: "Una calle privada, con muy poco tránsito y acceso directo a la carretera de cuota.",
    ubicacionItems: [
      {
        icon: Waves,
        title: "A 50 metros de la playa",
        description: "Cercanía real al mar, en una de las pocas zonas costeras con este nivel de privacidad.",
      },
      {
        icon: Car,
        title: "Acceso directo a la carretera de cuota",
        description: "Conectividad inmediata entre Tijuana y Rosarito, sin alejarte de ninguna de las dos ciudades.",
      },
      {
        icon: ShieldCheck,
        title: "Calle privada, con solo dos casas",
        description: "Una zona residencial tranquila, con seguridad 24/7 y muy poco tránsito.",
      },
    ],
    mapEmbedSrc: "https://maps.google.com/maps?q=San%20Antonio%20del%20Mar%2C%20Playas%20de%20Tijuana%2C%20Baja%20California&z=13&output=embed",
    mapCaption: "Ubicación aproximada (San Antonio del Mar). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "Espacios pensados para disfrutar la vista al mar",
    espaciosSubheading: "3 recámaras y 2.5 baños, con un espacio flexible ideal para home office o estancia adicional.",
    espaciosItems: [
      {
        icon: BedDouble,
        title: "3 recámaras + espacio flexible",
        description: "Recámara principal con acceso a terraza, dos recámaras secundarias y un espacio flexible, ideal para home office o estancia adicional.",
      },
      {
        icon: Bath,
        title: "2.5 baños",
        description: "Dos baños completos y un medio baño para visitas, con acabados de calidad.",
      },
      {
        icon: Waves,
        title: "Vista al mar",
        description: "Vista frontal al mar desde los espacios principales de la casa.",
      },
      {
        icon: Car,
        title: "2 espacios de estacionamiento",
        description: "Cochera techada con capacidad para dos vehículos.",
      },
      {
        icon: ShieldCheck,
        title: "Seguridad 24/7",
        description: "Fraccionamiento con vigilancia 24 horas, en una calle con muy poco tránsito.",
      },
    ],

    formasDePago: [
      { icon: Landmark, label: "Crédito Bancario" },
      { icon: Banknote, label: "Efectivo" },
    ],

    contactoHeading: "Agenda tu visita y conoce esta residencia a 50 metros del mar.",
    contactoSubheading: "Descubre en persona la cercanía al mar, la privacidad de la zona y la distribución de la casa.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage:
      "Hola, me interesa la casa en San Antonio del Mar de $7,500,000 MXN, a 50 metros del mar. Quiero agendar una visita con el asesor.",

    disclaimer:
      "Precio expresado en pesos mexicanos (MXN). Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
  },
  {
    slug: "privada-hacienda-del-mar",
    status: "disponible",

    locationBadge: "Hacienda Acueducto · Tijuana",
    title:
      "Casa de tres niveles con acceso controlado y un detalle de diseño poco común, en la Privada Hacienda del Mar.",
    description:
      "Casa de 3 recámaras y 2.5 baños distribuidos en tres niveles, dentro de una privada con acceso controlado en Hacienda Acueducto, Tijuana.",
    price: 3250000,
    currency: "MXN",
    heroImage: {
      src: "/images/properties/privada-hacienda-del-mar/fachada/image.jpg",
      alt: "Fachada de la residencia en Privada Hacienda del Mar, Hacienda Acueducto",
    },

    metaTitle: "Casa en Privada Hacienda del Mar, Tijuana | $3,250,000 MXN — Bienes Raíces Hub",
    metaDescription:
      "Casa de 3 niveles, 3 recámaras y 2.5 baños en la Privada Hacienda del Mar, Hacienda Acueducto, Tijuana. Acceso controlado y área de lavado oculta tras una puerta tipo librero. Agenda tu cita con el asesor.",

    gallery: [
      { src: "/images/properties/privada-hacienda-del-mar/fachada/image.jpg", alt: "Fachada de la residencia en Privada Hacienda del Mar, Hacienda Acueducto" },
      { src: "/images/properties/privada-hacienda-del-mar/acceso-privada/image.jpg", alt: "Acceso a la Privada Hacienda del Mar" },
      { src: "/images/properties/privada-hacienda-del-mar/cochera/image.jpg", alt: "Cochera techada con capacidad para dos autos" },
      { src: "/images/properties/privada-hacienda-del-mar/sala/image.jpg", alt: "Sala con acceso directo al patio" },
      { src: "/images/properties/privada-hacienda-del-mar/comedor/image.jpg", alt: "Comedor junto a la cocina integral" },
      { src: "/images/properties/privada-hacienda-del-mar/cocina/image.jpg", alt: "Cocina integral de lujo ampliada" },
      { src: "/images/properties/privada-hacienda-del-mar/area-lavado-cerrada/image.jpg", alt: "Puerta tipo librero que da acceso al área de lavado oculta" },
      { src: "/images/properties/privada-hacienda-del-mar/area-lavado-abierta/image.jpg", alt: "Área de lavado oculta, revelada tras la puerta tipo librero" },
      { src: "/images/properties/privada-hacienda-del-mar/escalera/image.jpg", alt: "Escalera interior hacia los tres niveles de la casa" },
      { src: "/images/properties/privada-hacienda-del-mar/recamara-secundaria/image.jpg", alt: "Una de las dos recámaras secundarias del segundo nivel" },
      { src: "/images/properties/privada-hacienda-del-mar/tocador-master/image.jpg", alt: "Área de tocador de la recámara máster, con amplias ventanas" },
      { src: "/images/properties/privada-hacienda-del-mar/bano-master/image.jpg", alt: "Baño completo de la recámara máster" },
      { src: "/images/properties/privada-hacienda-del-mar/bano-completo/image.jpg", alt: "Baño completo del segundo nivel" },
      { src: "/images/properties/privada-hacienda-del-mar/medio-bano/image.jpg", alt: "Medio baño de visitas en planta baja" },
      { src: "/images/properties/privada-hacienda-del-mar/patio/image.jpg", alt: "Patio de servicio en la parte posterior de la casa" },
    ],

    ubicacionHeading: "Una privada tranquila en Hacienda Acueducto",
    ubicacionSubheading: "Acceso controlado y buena conectividad hacia el resto de Tijuana.",
    ubicacionItems: [
      {
        icon: ShieldCheck,
        title: "Privada con acceso controlado",
        description: "Calle privada dentro del fraccionamiento Hacienda del Mar, en un entorno residencial y tranquilo.",
      },
      {
        icon: Car,
        title: "Acceso directo a la carretera de cuota",
        description: "Conectividad hacia la carretera de cuota Tijuana-Rosarito, sin alejarte del resto de la ciudad.",
      },
      {
        icon: ShoppingBag,
        title: "Cerca de escuelas y plazas comerciales",
        description: "A poca distancia de escuelas, hospitales y centros comerciales de la zona de Hacienda Acueducto.",
      },
    ],
    mapEmbedSrc: "https://maps.google.com/maps?q=Hacienda%20Acueducto%2C%20Tijuana%2C%20Baja%20California&z=14&output=embed",
    mapCaption: "Ubicación aproximada (Hacienda Acueducto). La dirección exacta se comparte al agendar tu cita.",

    espaciosHeading: "Tres niveles con un diseño pensado para el día a día",
    espaciosSubheading: "3 recámaras y 2.5 baños, con un detalle de diseño poco común: área de lavado oculta tras una puerta tipo librero.",
    espaciosItems: [
      {
        icon: ChefHat,
        title: "Cocina integral de lujo ampliada",
        description: "En el primer nivel, junto a la sala y el comedor independientes, además de un medio baño de visitas.",
      },
      {
        icon: BedDouble,
        title: "2 recámaras + recámara máster",
        description: "Dos recámaras en el segundo nivel y una recámara máster en el tercer nivel, con área de tocador propia y amplias ventanas.",
      },
      {
        icon: WashingMachine,
        title: "Área de lavado oculta",
        description: "Detrás de una puerta tipo librero, en el segundo nivel: un detalle de diseño que mantiene el espacio limpio y ordenado.",
      },
      {
        icon: Bath,
        title: "2.5 baños",
        description: "Baño completo en el segundo nivel, baño completo con tocador en la recámara máster, y medio baño en planta baja.",
      },
      {
        icon: Car,
        title: "Estacionamiento para 2 autos",
        description: "Cochera techada con capacidad para dos vehículos, con acceso directo a la privada.",
      },
    ],

    formasDePago: [
      { icon: Banknote, label: "Recurso Propio" },
      { icon: Landmark, label: "Crédito Bancario" },
    ],

    contactoHeading: "Agenda tu visita y conoce esta casa en Privada Hacienda del Mar.",
    contactoSubheading: "Descubre en persona la distribución en tres niveles y el detalle del área de lavado oculta.",
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappMessage:
      "Hola, me interesa la casa en Privada Hacienda del Mar (Hacienda Acueducto) de $3,250,000 MXN. Quiero agendar una visita con el asesor.",

    disclaimer:
      "Precio expresado en pesos mexicanos (MXN), más gastos de escrituración. Las fotografías son de referencia. Precio, disponibilidad y condiciones están sujetos a cambio sin previo aviso.",
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
