"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"

const ALINE_SYSTEM = `Eres Aline, asesora experta de BienesRaícesHub en Baja California, México.
Tu misión: ayudar a compradores a encontrar la propiedad ideal, precalificarlos para crédito hipotecario y agendar visitas.

PROPIEDADES DISPONIBLES EN CATÁLOGO:

1. GRANIZO — Playas de Tijuana · Sección Monumental
   Estado: DISPONIBLE | Precio: $439,000 USD
   3 recámaras (convertible a 4) | Alta plusvalía y potencial comercial
   Amenidades: estacionamiento techado, patios frontal y trasero, cisterna con bomba, boiler Bosch, ventiladores, chimenea

2. ARRECIFE — San Antonio del Mar · Fraccionamiento Arrecife, Tijuana
   Estado: DISPONIBLE | Precio: $380,000 USD
   4 recámaras | 4.5 baños | 410 m² construcción | 182 m² terreno
   Vista panorámica al Pacífico, 3 niveles, frente al mar
   Amenidades: garage triple, 2 chimeneas volcánicas, AC, club privado (alberca/tenis), seguridad 24/7

3. AMATISTA — Punta Azul · Lienzo Charro, Rosarito
   Estado: DISPONIBLE | Precio: $295,000 USD
   3 recámaras | 4 baños | 157 m² construcción | 120 m² terreno
   Casa nueva 3 niveles con roof deck y vista al mar
   Amenidades: roof deck privado, garage 2 autos, alberca, jacuzzi, sauna, gym, seguridad 24/7
   Financiamiento directo: 10% anual, plazos a 5 años | Mantenimiento: $150 USD/mes

REGLAS:
- Responde SIEMPRE en español, de forma cálida y profesional.
- NUNCA uses markdown: sin asteriscos, sin negritas, sin guiones, sin listas con viñetas. Solo texto plano.
- Respuestas cortas: máximo 3-4 oraciones por mensaje.
- Máximo 1-2 preguntas por mensaje.
- NO inventes propiedades ni datos fuera de esta lista.
- Da datos exactos del catálogo: precio, m², recámaras, ubicación.
- Para agendar visitas, indica WhatsApp: +52 1 664 120 0764
- Ortografía perfecta: usa "e" (no "y") antes de palabras que empiezan con "i" o "hi" (ej: "enganche e ingreso mensual").
- PROHIBIDO asesorar en crédito, hipoteca, financiamiento, montos, enganches o ingresos requeridos. Si el cliente toca cualquiera de esos temas, responde de forma natural: "Para eso te puedo conectar con un asesor que te ayuda sin costo — solo visita preaprueba.com o usa el botón Precalíficate aquí en la página." No añadas nada más sobre crédito.`

const WA_URL = "https://wa.me/526641200764?text=Hola%2C%20me%20interesa%20una%20propiedad%20en%20Baja%20California"

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{color:"#25D366"}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AlineChat() {
  const [showPopup, setShowPopup] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const openChat = () => {
    setShowPopup(false)
    setShowChat(true)
    if (messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "¡Hola! Soy Aline, tu asesora de BienesRaícesHub 🏡 Tenemos propiedades en Playas de Tijuana, San Antonio del Mar y Rosarito. ¿Qué tipo de propiedad buscas?"
      }])
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/matrix-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: ALINE_SYSTEM,
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })
      const data = await res.json()
      const reply = data?.content?.[0]?.text ?? "Lo siento, hubo un error. Intenta de nuevo."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => { setShowPopup(p => !p); setShowChat(false) }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg shadow-emerald-900/40 overflow-hidden border-2 border-emerald-500 bg-zinc-900 flex items-center justify-center"
        aria-label="Contactar a Aline"
      >
        <AnimatePresence mode="wait">
          {showChat ? (
            <motion.span key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.img
              key="avatar"
              src="/images/aline-avatar.webp"
              alt="Aline"
              className="h-14 w-14 rounded-full object-cover object-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showPopup && !showChat && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 right-6 z-50 flex flex-col gap-2 items-end"
          >
            <button
              onClick={openChat}
              className="flex items-center gap-2 rounded-full px-5 py-3 text-white text-sm font-semibold shadow-xl"
              style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}
            >
              <span>💬</span>
              <span>Chat con Aline</span>
            </button>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-3 text-white text-sm font-semibold shadow-xl"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon />
              <span>Chat por WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: 480, background: "#0f0f1a" }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}>
              <div className="flex items-center gap-2">
                <img src="/images/aline-avatar.webp" alt="Aline" className="h-9 w-9 rounded-full object-cover object-top" />
                <div>
                  <p className="text-white text-sm font-semibold leading-none">Aline</p>
                  <p className="text-gray-400 text-xs">Asesora BienesRaícesHub</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:opacity-80 transition-opacity">
                  <WhatsAppIcon />
                </a>
                <button onClick={() => setShowChat(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug ${m.role === "user" ? "text-white rounded-br-sm" : "text-gray-100 rounded-bl-sm"}`}
                    style={m.role === "user" ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } : { background: "#1e1e32" }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-gray-400" style={{ background: "#1e1e32" }}>
                    <span className="animate-pulse">Aline está escribiendo…</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-gray-800 flex gap-2">
              <input
                className="flex-1 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-purple-500"
                style={{ background: "#1e1e32" }}
                placeholder="Escribe tu mensaje…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="rounded-xl px-3 py-2 text-white disabled:opacity-40 transition-opacity"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
