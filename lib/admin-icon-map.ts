// Registro de íconos permitidos para el panel de alta de propiedades.
//
// Las fichas existentes en `lib/properties.ts` guardan el componente de
// ícono directamente (`icon: Car`) porque viven como código. En el panel
// de alta, los datos van a terminar en una base de datos, que no puede
// guardar un componente de React — por eso aquí el ícono se identifica por
// su nombre (string) y este mapa lo resuelve al componente real de
// `lucide-react` al momento de mostrarlo. Es exactamente el mismo set de
// íconos que ya se usa en las 7 propiedades actuales, para que el
// contenido generado por IA siempre use un ícono que ya existe en el
// sitio — nada nuevo que importar ni que pueda romper el build.
import {
  Banknote,
  Bath,
  BedDouble,
  Briefcase,
  Car,
  ChefHat,
  Droplets,
  Landmark,
  Building2,
  MapPin,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Warehouse,
  Waves,
  WashingMachine,
  type LucideIcon,
} from "lucide-react"

export const ADMIN_ICON_MAP: Record<string, LucideIcon> = {
  Banknote,
  Bath,
  BedDouble,
  Briefcase,
  Car,
  ChefHat,
  Droplets,
  Landmark,
  Building2,
  MapPin,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Sofa,
  Warehouse,
  Waves,
  WashingMachine,
}

export const ADMIN_ICON_NAMES = Object.keys(ADMIN_ICON_MAP)

export type AdminIconName = keyof typeof ADMIN_ICON_MAP

export function resolveAdminIcon(name: string): LucideIcon {
  return ADMIN_ICON_MAP[name] ?? MapPin
}
