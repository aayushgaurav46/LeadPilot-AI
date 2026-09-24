import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { heroLead } from '../data/demoData'

function ScoreRing({ score }: { score: number }) {
  return (
    <div
      className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#2452E8 ${score}%, #E4E7EC ${score}% 100%)`,
      }}
      role="img"
      aria-label={`AI lead score ${score} out of 100`}
    >
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white">
        <span className="font-display text-[15px] font-bold text-ink tabular">{score}</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-px mx-auto grid max-w-7xl items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28">
        <div>
          <h1 className="text-balance font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[3.1rem] lg:text-[3.4rem]">
            Turn more real estate leads into appointments.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-lg">
            LeadPilot AI responds to new inquiries, qualifies prospects, automates
            follow-ups, and helps real-estate teams turn conversations into
            appointments.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-accent"
            >
              Try the Live Demo
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink/20 hover:bg-canvas"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-8 text-[13px] text-ink-faint">
            Portfolio demo product — interactions below use simulated data.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-panelLg sm:p-6"
        >
          <div className="flex items-center justify-between border-b border-line-soft pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-success" />
              </span>
              <span className="text-[13px] font-medium text-ink-soft">New lead · just now</span>
            </div>
            <span className="rounded-md bg-signal-successSoft px-2 py-1 text-[11px] font-semibold text-signal-success">
              {heroLead.status}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-5">
            <div>
              <p className="font-display text-lg font-bold text-ink">{heroLead.name}</p>
              <p className="mt-1 text-[13.5px] text-ink-soft">Interested in {heroLead.interestedIn}</p>
              <div className="mt-3 flex gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-faint">Budget</p>
                  <p className="text-[13.5px] font-semibold text-ink">{heroLead.budget}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-faint">Timeline</p>
                  <p className="text-[13.5px] font-semibold text-ink">{heroLead.timeline}</p>
                </div>
              </div>
            </div>
            <ScoreRing score={heroLead.score} />
          </div>

          <ul className="space-y-2.5 border-t border-line-soft pt-4">
            {heroLead.checklist.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                className="flex items-center gap-2.5 text-[13.5px] text-ink"
              >
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-signal-successSoft text-signal-success">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
