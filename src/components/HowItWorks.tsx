import { motion } from 'framer-motion'
import { howItWorksSteps } from '../data/demoData'
import { getIcon } from './iconMap'

function HowItWorks() {
  return (
    <section id="how-it-works" className="section-y border-t border-line bg-canvas-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">How it works</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Four steps take a new inquiry from first contact to a qualified
            conversation, without waiting on manual follow-up.
          </p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, i) => {
            const Icon = getIcon(step.icon)
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-accent">
                    <Icon size={19} />
                  </span>
                  <span className="font-display text-sm font-bold text-ink-faint tabular">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
