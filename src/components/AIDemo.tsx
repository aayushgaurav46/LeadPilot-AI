import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Check, Loader2, RotateCcw, Send, Sparkles, User } from 'lucide-react'
import { demoIncomingLead } from '../data/demoData'

type Message = { id: string; sender: 'lead' | 'ai'; text: string }
type HistoryItem = { role: 'user' | 'assistant'; content: string }
type QResult = { score: number; intent: string; budgetStatus: string; timeline: string; recommendedAction: string }

async function callGemini(history: HistoryItem[], message: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, message }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.text as string
}

function AIDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QResult | null>(null)
  const [booked, setBooked] = useState(false)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const historyRef = useRef<HistoryItem[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const startDemo = async () => {
    setStarted(true)
    setLoading(true)
    setError(null)
    try {
      const intro = `New lead info: Name: ${demoIncomingLead.name}, Property: ${demoIncomingLead.property}, Location: ${demoIncomingLead.location}, Budget: ${demoIncomingLead.budget}, Timeline: ${demoIncomingLead.timeline}. Greet the lead and ask your first qualifying question.`
      const text = await callGemini([], intro)
      historyRef.current = [
        { role: 'user', content: intro },
        { role: 'assistant', content: text },
      ]
      setMessages([{ id: 'm0', sender: 'ai', text }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userText = input.trim()
    const userMsg: Message = { id: `u${Date.now()}`, sender: 'lead', text: userText }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError(null)

    try {
    const text = await callGemini(historyRef.current, userText)
    historyRef.current = [
      ...historyRef.current,
      { role: 'user', content: userText },
      { role: 'assistant', content: text },
    ]

    const resultMatch = text.match(/<RESULT>([\s\S]*?)<\/RESULT>/)
    if (resultMatch) {
      try {
        setResult(JSON.parse(resultMatch[1]) as QResult)
        const cleanText = text.replace(/<RESULT>[\s\S]*?<\/RESULT>/, '').trim()
        if (cleanText) setMessages((prev) => [...prev, { id: `a${Date.now()}`, sender: 'ai', text: cleanText }])
      } catch { /* ignore parse errors */ }
    } else {
      setMessages((prev) => [...prev, { id: `a${Date.now()}`, sender: 'ai', text }])
    }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setMessages([])
    setInput('')
    setLoading(false)
    setResult(null)
    setBooked(false)
    setStarted(false)
    setError(null)
    historyRef.current = []
  }

  return (
    <section id="demo" className="section-y border-t border-line">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
            See the AI handle a lead.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Chat with LeadPilot AI as the lead — it qualifies you in real time using Gemini.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Lead card */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-panel sm:p-7">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">Incoming Lead</p>
              <span className="rounded-md bg-canvas px-2 py-1 text-[11px] font-medium text-ink-faint">Live AI</span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-b border-line-soft pb-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
                <User size={19} />
              </span>
              <div>
                <p className="font-display text-[16px] font-bold text-ink">{demoIncomingLead.name}</p>
                <p className="text-[13px] text-ink-soft">New inquiry · web form</p>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-[13.5px]">
              <div className="flex justify-between"><dt className="text-ink-soft">Property</dt><dd className="font-semibold text-ink">{demoIncomingLead.property}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Location</dt><dd className="font-semibold text-ink">{demoIncomingLead.location}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Budget</dt><dd className="font-semibold text-ink">{demoIncomingLead.budget}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Timeline</dt><dd className="font-semibold text-ink">{demoIncomingLead.timeline}</dd></div>
            </dl>

            {!started ? (
              <button type="button" onClick={startDemo}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent">
                <Sparkles size={16} /> Start AI Qualification
              </button>
            ) : (
              <button type="button" onClick={reset}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-canvas">
                <RotateCcw size={15} /> Reset
              </button>
            )}
          </div>

          {/* Chat panel */}
          <div className="flex flex-col rounded-2xl border border-line bg-canvas-surface shadow-panel">
            <div className="flex items-center gap-2 border-b border-line px-6 py-4">
              <Bot size={16} className="text-accent" />
              <p className="text-[13px] font-semibold text-ink">LeadPilot AI</p>
              {started && !result && <span className="ml-auto text-[11px] text-signal-success font-medium">● Live</span>}
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3 min-h-[280px] max-h-[380px]">
              {!started && (
                <p className="text-[13.5px] text-ink-faint mt-4 text-center">Click "Start AI Qualification" to begin.</p>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'ai' ? 'justify-end' : 'justify-start'}`}>
                  <p className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                    msg.sender === 'ai' ? 'rounded-tr-sm bg-accent text-white' : 'rounded-tl-sm bg-white text-ink border border-line-soft'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              ))}
              {loading && (
                <div className="flex justify-end">
                  <span className="rounded-xl rounded-tr-sm bg-accent px-4 py-2.5">
                    <Loader2 size={14} className="animate-spin text-white" />
                  </span>
                </div>
              )}
              {error && (
                <p className="text-[13px] text-red-500 px-1">{error}</p>
              )}
              <div ref={bottomRef} />
            </div>

            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mx-5 mb-4 rounded-xl border border-line-soft bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-[14px] font-semibold text-signal-success">
                      <Check size={15} strokeWidth={3} /> Lead qualified
                    </p>
                    <p className="text-[13px] text-ink-faint">
                      Score <span className="font-display text-[15px] font-bold text-ink tabular">{result.score}/100</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-[13px]">
                    <div><p className="text-ink-faint uppercase text-[11px] tracking-wide">Intent</p><p className="font-semibold text-ink mt-1">{result.intent}</p></div>
                    <div><p className="text-ink-faint uppercase text-[11px] tracking-wide">Budget</p><p className="font-semibold text-ink mt-1">{result.budgetStatus}</p></div>
                    <div><p className="text-ink-faint uppercase text-[11px] tracking-wide">Timeline</p><p className="font-semibold text-ink mt-1">{result.timeline}</p></div>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-accent/25 bg-accent-soft px-4 py-3">
                    <p className="text-[13px] text-ink">{result.recommendedAction}</p>
                    <button type="button" onClick={() => setBooked(true)} disabled={booked}
                      className="shrink-0 rounded-lg bg-ink px-3 py-2 text-[13px] font-semibold text-white hover:bg-accent disabled:bg-signal-success transition-colors">
                      {booked ? <><Check size={13} className="inline mr-1" />Noted</> : 'Book'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {started && !result && (
              <div className="border-t border-line px-4 py-3 flex gap-2">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Reply as the lead..."
                  className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] text-ink outline-none focus:border-accent" />
                <button type="button" onClick={sendMessage} disabled={loading || !input.trim()}
                  className="flex items-center justify-center rounded-lg bg-accent px-3 py-2 text-white disabled:opacity-50">
                  <Send size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIDemo
