"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, MessageCircle } from "lucide-react"

const ALINE_SYSTEM = `Eres Aline, asesora de bienes raíces de BienesRaícesHub en Baja California, México.
Tu misión: ayudar a compradores, vendedores y arrendadores a encontrar la propiedad ideal, precalificarlos para crédito hipotecario y agendar visitas.

Propiedades disponibles:
- Granizo, Playas de Tijuana: residencia 3 rec, 2 baños, 120m², jardín, $285,000 USD
- Rosarito Centro: depto 2 rec, 1 baño, 75m², vista al mar, $148,000 USD
- Valle de Guadalupe: terreno 1,500m², uso mixto, $95,000 USD

Responde siempre en español, de manera cálida y profesional.
Haz máximo 1-2 preguntas por mensaje para entender las necesidades del cliente.
Si el cliente está listo, ofrece agendar visita vía WhatsApp: +52 1 664 120 0764
Mantén respuestas cortas (máx 3 oraciones).
No inventes propiedades que no están en la lista.`

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AlineChat() {
  const [open, setOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "¡Hola! Soy Aline 👋 ¿Estás buscando comprar, rentar o tienes una propiedad para vender?"
      }])
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleButtonClick = () => {
    if (open) {
      setOpen(false)
      setShowPopup(false)
    } else {
      setShowPopup(prev => !prev)
    }
  }

  const openChat = () => {
    setShowPopup(false)
    setOpen(true)
  }

  const openWhatsApp = () => {
    setShowPopup(false)
    window.open("https://wa.me/526641200764?text=Hola%2C%20me%20interesa%20una%20propiedad%20en%20Baja%20California", "_blank")
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMessage: Message = { role: "user", content: input }
    const updated = [...messages, userMessage]
    setMessages(updated)
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
          messages: updated,
        }),
      })
      const data = await res.json()
      const reply = data?.content?.[0]?.text ?? "Lo siento, ocurrió un error."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3 flex items-center gap-3">
              <img src="/images/aline-avatar.webp" alt="Aline" className="h-9 w-9 rounded-full object-cover object-top" />
              <div>
                <p className="text-white font-semibold text-sm">Aline</p>
                <p className="text-emerald-200 text-xs">Asesora BienesRaícesHub</p>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-zinc-900 h-72 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-100"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 text-zinc-400 rounded-xl px-3 py-2 text-sm">Escribiendo...</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="bg-zinc-800 px-3 py-2 flex gap-2">
              <input
                className="flex-1 bg-zinc-700 text-white text-sm rounded-lg px-3 py-2 outline-none placeholder:text-zinc-400"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Popup */}
      <AnimatePresence>
        {showPopup && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-52 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900"
          >
            <button
              onClick={openChat}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left border-b border-zinc-700"
            >
              <span className="text-xl">💬</span>
              <span className="text-white text-sm font-medium">Chat con Aline</span>
            </button>
            <button
              onClick={openWhatsApp}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
            >
              <span className="text-xl">📱</span>
              <span className="text-white text-sm font-medium">WhatsApp directo</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={handleButtonClick}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-4 z-50 h-16 w-16 rounded-full shadow-lg shadow-emerald-900/40 overflow-hidden border-2 border-emerald-500 bg-zinc-900 flex items-center justify-center"
        aria-label="Contactar a Aline"
      >
        <AnimatePresence mode="wait">
          {open ? (
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
    </>
  )
}
