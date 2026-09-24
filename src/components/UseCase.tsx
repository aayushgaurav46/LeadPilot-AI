import { motion } from 'framer-motion'
import { useCaseTimeline } from '../data/demoData'

function UseCase() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
              From first message to qualified conversation.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              A minute-by-minute look at how a single inquiry moves through the
              system.
            </p>
          </div>
          <span className="inline-flex h-fit shrink-0 items-center rounded-md border border-line bg-canvas-surface px-2.5 py-1 text-[11.5px] font-semibold text-ink-faint">
            Example workflow
          </span>
        </div>

        <ol className="mx-auto mt-14 max-w-2xl">
          {useCaseTimeline.map((event, i) => {
            const isLast = i === useCaseTimeline.length - 1
            return (
              <motion.li
                key={`${event.time}-${event.title}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative flex gap-5 pb-9 last:pb-0"
              >
                {!isLast && (
                  <span
                    className="absolute left-[3px] top-3 h-[calc(100%-0.5rem)] w-px bg-line"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
                <div className="flex-1">
                  <p className="tabular text-[12.5px] font-semibold uppercase tracking-wide text-ink-faint">
                    {event.time}
                  </p>
                  <p className="mt-1 text-[15.5px] font-bold text-ink">{event.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{event.detail}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default UseCase
