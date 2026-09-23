import { WhatsAppIcon } from "./whatsapp-icon"
import { GENERAL_WHATSAPP_URL } from "@/lib/site"

export function FloatingButtons({ whatsappUrl = GENERAL_WHATSAPP_URL }: { whatsappUrl?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-green-500 p-4 text-white shadow-xl transition-transform hover:scale-110 hover:bg-green-600"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  )
}
