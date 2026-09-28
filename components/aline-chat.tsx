"use clihent"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"

const ALINE_SYSTEM = `Eres Aline, asesora de bienes raíces de BienesRaícesHub en Baja California, México.
Tu misión: ayudar a compradores, vendedores y arrendadores a encontrar la propiedad ideal, precalificarlos para crédito hipotecario y agendar visitas.

Propiedades disponibles:
- Granizo, Playas de Tijuana: residencia 3 rec, 2 baños, patio, desde $3.2M MXN
- Arrecife, San Antonio del Mar: casa con muro de piedra volcánica, 4 rec, desde $4.8M MXN
- Amatista, Punta Azul: desarrollo con roof deck, desde $2.9M MXN

Reglas de conversación:
- Una pregunta a la vez, nunca cuestionarios
- Responde de forma natural y conversacional, sin listas de bullets
- Siempre ofrece precalificación hipotecaria sin costo
- Si el cliente está listo, ofrece agendar visita vía WhatsApp: +52 1 664 120 0764
- Mantén tu identidad: eres Aline, asesora de bienes raíces, no menciones que eres IA
- Respuestas cortas, máximo 2-3 oraciones en el chat`

type Message = { role: "user" | "assistant"; content: string }

export function AlineChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "¡Hola! Soy Aline, tu asesora de BienesRaícesHub 👋 ¿Qué estás buscando — comprar, vender o rentar en Baja California?",
      }])
    }
  }, [open, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: "user", content: input.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
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
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const text = data.content?.[0]?.text ?? "Lo siento, hubo un error. ¿Puedes repetirlo?"
      setMessages((prev) => [...prev, { role: "assistant", content: text }])
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Hubo un error de conexión. Intenta de nuevo." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Hablar con Aline"
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 shadow-xl ring-2 ring-emerald-400 transition-transform hover:scale-110 focus:outline-none"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <img src="/images/aline-avatar.webp" alt="Aline" className="h-14 w-14 rounded-full object-cover object-top" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 right-5 z-50 flex w-80 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:w-96"
          >
            <div className="flex items-center gap-3 bg-slate-900 px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-emerald-300">
                <span className="text-lg font-bold text-slate-900">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Aline</p>
                <p className="text-xs text-emerald-400">Asesora BienesRaícesHub · En línea</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-72 flex-col gap-2 overflow-y-auto bg-slate-50 p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="mr-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400">
                      <span className="text-xs font-bold text-slate-900">A</span>
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-slate-900 text-white" : "bg-white text-slate-800 shadow-sm"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400">
                    <span className="text-xs font-bold text-slate-900">A</span>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-2 shadow-sm">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="Escribe tu mensaje…"
                className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                aria-label="Enviar"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-white px-4 pb-3 text-center">
              <p className="text-[10px] text-slate-400">Powered by <span className="font-semibold text-slate-600">BienesRaícesHub</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
