import { Bot, Calendar, CircleDashed, Clock, Inbox, Snowflake, Target, UserRound } from 'lucide-react'

const oldWay = [
  { icon: Inbox, label: 'New lead arrives' },
  { icon: UserRound, label: 'Agent is busy' },
  { icon: Clock, label: 'Response delayed' },
  { icon: Snowflake, label: 'Lead goes cold' },
]

const aiWay = [
  { icon: Inbox, label: 'New lead arrives' },
  { icon: Bot, label: 'AI responds instantly' },
  { icon: CircleDashed, label: 'Lead gets qualified' },
  { icon: Target, label: 'Follow-up continues' },
  { icon: Calendar, label: 'Appointment opportunity' },
]

function FlowColumn({
  title,
  steps,
  tone,
}: {
  title: string
  steps: { icon: typeof Inbox; label: string }[]
  tone: 'muted' | 'accent'
}) {
  const isAccent = tone === 'accent'
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 ${
        isAccent ? 'border-accent/25 bg-accent/[0.03]' : 'border-line bg-canvas-surface'
      }`}
    >
      <p
        className={`text-[13px] font-semibold uppercase tracking-wide ${
          isAccent ? 'text-accent' : 'text-ink-faint'
        }`}
      >
        {title}
      </p>
      <ol className="mt-5 space-y-0">
        {steps.map((step, i) => {
          const Icon = step.icon
          const isLast = i === steps.length - 1
          return (
            <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[19px] top-10 h-[calc(100%-1.4rem)] w-px ${
                    isAccent ? 'bg-accent/20' : 'bg-line'
                  }`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                  isAccent
                    ? 'border-accent/30 bg-white text-accent'
                    : 'border-line bg-white text-ink-faint'
                }`}
              >
                <Icon size={17} />
              </span>
              <span
                className={`pt-2 text-[15px] font-medium ${
                  isAccent ? 'text-ink' : 'text-ink-soft'
                } ${!isAccent && isLast ? 'text-ink' : ''}`}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Problem() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-balance text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.35rem]">
            Every missed follow-up is a missed opportunity.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Real-estate inquiries often arrive faster than they can be answered.
            Here is what changes when an AI system handles the first response.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <FlowColumn title="Without AI" steps={oldWay} tone="muted" />
          <FlowColumn title="With LeadPilot AI" steps={aiWay} tone="accent" />
        </div>
      </div>
    </section>
  )
}

export default Problem
