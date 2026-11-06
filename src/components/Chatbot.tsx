import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../seo/site'
import {
  emptyIntent,
  emptyLead,
  sendSunehriMessage,
  type FlowStep,
  type IntentState,
  type LeadDraft,
} from '../lib/sunehriApi'

type Msg = {
  id: string
  role: 'bot' | 'user'
  text: string
}

const FAQ_QUICK = [
  'Just browsing',
  'I want to buy / visit',
  'Store timings',
  'Address',
  'Gold rate',
] as const

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(true)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: `Namaste! I’m Sunehri from ${SITE.shortName}. I can answer quick questions — and if you’re seriously looking for jewellery, I’ll take a few details so our team can help.`,
    },
  ])
  const [lead, setLead] = useState<LeadDraft>(emptyLead())
  const [intent, setIntent] = useState<IntentState>(emptyIntent())
  const [step, setStep] = useState<FlowStep>('chat')
  const [notified, setNotified] = useState(false)
  const [offline, setOffline] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const leadRef = useRef(lead)
  const intentRef = useRef(intent)
  const stepRef = useRef(step)
  const notifiedRef = useRef(notified)
  const messagesRef = useRef(messages)
  leadRef.current = lead
  intentRef.current = intent
  stepRef.current = step
  notifiedRef.current = notified
  messagesRef.current = messages

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 7000)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  const handleUserText = async (raw: string) => {
    const text = raw.trim()
    if (!text || typing) return

    const history = messagesRef.current
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({
        role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text,
      }))

    setMessages((m) => [...m, { id: uid(), role: 'user', text }])
    setInput('')
    setTyping(true)
    setOffline(false)

    try {
      const res = await sendSunehriMessage({
        message: text,
        history,
        lead: leadRef.current,
        intent: intentRef.current,
        step: stepRef.current,
        notified: notifiedRef.current,
      })

      setLead(res.lead)
      setIntent(res.intent)
      setStep(res.step)
      setNotified(res.notified)
      setMessages((m) => [...m, { id: uid(), role: 'bot', text: res.reply }])
    } catch {
      setOffline(true)
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: 'bot',
          text: `I’m having trouble reaching the assistant server. Please try again in a moment, or WhatsApp us at ${SITE.phoneDisplay}.`,
        },
      ])
    } finally {
      setTyping(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void handleUserText(input)
  }

  const wa = `https://wa.me/${SITE.phone.replace('+', '')}`

  return (
    <div className="fixed bottom-5 right-5 z-[120] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      {hint && !open && (
        <div className="animate-fade-up max-w-[230px] rounded-sm border border-gold/30 bg-cream px-3 py-2 text-[12px] text-forest shadow-[0_12px_30px_rgba(11,28,20,0.12)]">
          Hey, how can I help you?
        </div>
      )}

      {open && (
        <div
          className="flex h-[min(540px,72vh)] w-[min(370px,calc(100vw-2rem))] flex-col overflow-hidden rounded-sm border border-forest/10 bg-cream shadow-[0_24px_60px_rgba(11,28,20,0.22)]"
          role="dialog"
          aria-label="Chat with Sunehri"
        >
          <header className="flex items-center justify-between bg-forest px-4 py-3 text-cream">
            <div className="flex items-center gap-3">
              <img
                src="/images/chatbot-avatar.jpg"
                alt=""
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gold/40"
              />
              <div>
                <p className="font-display text-[15px] leading-tight">Sunehri</p>
                <p className="text-[10px] tracking-wide text-cream/60">
                  {SITE.shortName} · {offline ? 'reconnecting…' : 'online'}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="p-1 text-cream/70 transition-colors hover:text-gold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] whitespace-pre-wrap px-3 py-2 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-forest text-cream'
                      : 'border border-forest/10 bg-cream-dark/50 text-forest'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="border border-forest/10 bg-cream-dark/50 px-3 py-2 text-[12px] text-muted">
                  Typing…
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-forest/8 px-3 py-2">
            <div className="flex flex-wrap gap-1.5">
              {FAQ_QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void handleUserText(q)}
                  className="rounded-full border border-gold/35 px-2.5 py-1 text-[10px] tracking-wide text-forest/80 transition-colors hover:border-gold hover:text-gold"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-forest/15 py-1.5 text-center text-[10px] uppercase tracking-[0.12em] text-forest transition-colors hover:border-gold hover:text-gold"
              >
                WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex-1 bg-forest py-1.5 text-center text-[10px] uppercase tracking-[0.12em] text-cream transition-colors hover:bg-forest-mid"
              >
                Book visit
              </Link>
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex border-t border-forest/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[13px] text-forest outline-none placeholder:text-muted"
            />
            <button type="submit" aria-label="Send" className="px-3 text-gold transition-colors hover:text-gold-dark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3.4 20.6L21 12 3.4 3.4l.1 6.7L14 12l-10.5 1.9.1 6.7z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v)
          setHint(false)
        }}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#2a1810] shadow-[0_12px_28px_rgba(11,28,20,0.35)] ring-2 ring-gold/50 transition-transform hover:scale-105"
      >
        {open ? (
          <span className="flex h-full w-full items-center justify-center bg-forest text-cream">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </span>
        ) : (
          <img src="/images/chatbot-avatar.jpg" alt="" className="h-full w-full object-cover" />
        )}
      </button>
    </div>
  )
}
