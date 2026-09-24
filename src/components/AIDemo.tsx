import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Calendar,
  Check,
  DollarSign,
  Home,
  Loader2,
  MapPin,
  RotateCcw,
  Sparkles,
  User,
} from 'lucide-react'
import {
  demoConversation,
  demoIncomingLead,
  demoProcessingSteps,
  demoQualificationResult,
} from '../data/demoData'

type Phase = 'idle' | 'processing' | 'result'

const STEP_DELAY_MS = 750

function AIDemo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [activeStep, setActiveStep] = useState(-1)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    if (phase !== 'processing') return undefined

    if (activeStep < demoProcessingSteps.length - 1) {
      const timer = setTimeout(() => setActiveStep((i) => i + 1), STEP_DELAY_MS)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => setPhase('result'), STEP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [phase, activeStep])

  const runDemo = () => {
    setBooked(false)
    setPhase('processing')
    setActiveStep(0)
  }

  const resetDemo = () => {
    setPhase('idle')
    setActiveStep(-1)
    setBooked(false)
  }

  const infoRows = [
    { icon: Home, label: 'Property', value: demoIncomingLead.property },
    { icon: MapPin, label: 'Location', value: demoIncomingLead.location },
    { icon: DollarSign, label: 'Budget', value: demoIncomingLead.budget },
    { icon: Calendar, label: 'Timeline', value: demoIncomingLead.timeline },
  ]

  return (
    <section id="demo" className="section-y border-t border-line">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
            See the AI handle a lead.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            This is a live, interactive walkthrough using simulated lead data — run
            it to see the qualification process end to end.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Incoming lead card */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-panel sm:p-7">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
                Incoming Lead
              </p>
              <span className="rounded-md bg-canvas px-2 py-1 text-[11px] font-medium text-ink-faint">
                Demo
              </span>
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

            <dl className="mt-5 space-y-4">
              {infoRows.map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-canvas text-ink-faint">
                    <row.icon size={15} />
                  </span>
                  <div className="flex w-full items-center justify-between">
                    <dt className="text-[13.5px] text-ink-soft">{row.label}</dt>
                    <dd className="text-[13.5px] font-semibold text-ink">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={runDemo}
              disabled={phase === 'processing'}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === 'processing' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Running qualification...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Run AI Qualification
                </>
              )}
            </button>

            {phase === 'result' && (
              <button
                type="button"
                onClick={resetDemo}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-canvas"
              >
                <RotateCcw size={15} />
                Run Demo Again
              </button>
            )}
          </div>

          {/* Processing / result panel */}
          <div className="rounded-2xl border border-line bg-canvas-surface p-6 shadow-panel sm:p-7">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-ink-faint">
              AI Processing
            </p>

            <ol className="mt-5 space-y-3">
              {demoProcessingSteps.map((step, i) => {
                const isDone = phase === 'result' || (phase === 'processing' && i < activeStep)
                const isActive = phase === 'processing' && i === activeStep
                return (
                  <li
                    key={step.id}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-[14px] transition-colors ${
                      isActive
                        ? 'border-accent/30 bg-accent-soft text-ink'
                        : isDone
                          ? 'border-line-soft bg-white text-ink-soft'
                          : 'border-line-soft bg-white text-ink-faint'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        isDone
                          ? 'bg-signal-success text-white'
                          : isActive
                            ? 'bg-accent text-white'
                            : 'bg-line'
                      }`}
                    >
                      {isDone ? (
                        <Check size={12} strokeWidth={3} />
                      ) : isActive ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : null}
                    </span>
                    {step.label}
                  </li>
                )
              })}
            </ol>

            <AnimatePresence>
              {phase === 'result' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 space-y-6"
                >
                  {/* Qualification summary */}
                  <div className="rounded-xl border border-line-soft bg-white p-5">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-2 text-[14px] font-semibold text-signal-success">
                        <Check size={15} strokeWidth={3} /> Lead qualified
                      </p>
                      <p className="text-[13px] text-ink-faint">
                        AI Lead Score{' '}
                        <span className="font-display text-[15px] font-bold text-ink tabular">
                          {demoQualificationResult.score}/100
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-ink-faint">Intent</p>
                        <p className="mt-1 text-[13.5px] font-semibold text-ink">
                          {demoQualificationResult.intent}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-ink-faint">Budget</p>
                        <p className="mt-1 text-[13.5px] font-semibold text-ink">
                          {demoQualificationResult.budgetStatus}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-ink-faint">Timeline</p>
                        <p className="mt-1 text-[13.5px] font-semibold text-ink">
                          {demoQualificationResult.timeline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Conversation */}
                  <div className="rounded-xl border border-line-soft bg-white p-5">
                    <p className="text-[13px] font-semibold text-ink-faint">Conversation</p>
                    <div className="mt-4 space-y-3">
                      {demoConversation.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'ai' ? 'justify-end' : 'justify-start'}`}
                        >
                          <p
                            className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                              message.sender === 'ai'
                                ? 'rounded-tr-sm bg-accent text-white'
                                : 'rounded-tl-sm bg-canvas text-ink'
                            }`}
                          >
                            {message.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended next step */}
                  <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-accent/25 bg-accent-soft p-5 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-[13px] font-semibold text-accent">Recommended next step</p>
                      <p className="mt-1 text-[14px] text-ink">
                        {demoQualificationResult.recommendedAction}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBooked(true)}
                      disabled={booked}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:bg-signal-success disabled:opacity-100"
                    >
                      {booked ? (
                        <>
                          <Check size={14} strokeWidth={3} /> Appointment noted
                        </>
                      ) : (
                        'Book Appointment'
                      )}
                    </button>
                  </div>
                  {booked && (
                    <p className="text-[12.5px] text-ink-faint">
                      Demo only — no real appointment was booked.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {phase === 'idle' && (
              <p className="mt-6 text-[13.5px] text-ink-faint">
                Click "Run AI Qualification" to see the AI analyze this lead, score
                intent, and draft a live response.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIDemo
