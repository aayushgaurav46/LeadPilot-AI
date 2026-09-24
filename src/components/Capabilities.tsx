import { capabilities } from '../data/demoData'
import { getIcon } from './iconMap'

function Capabilities() {
  return (
    <section className="section-y border-t border-line bg-canvas-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">Capabilities</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            The core building blocks behind every conversation LeadPilot AI
            handles.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = getIcon(capability.icon)
            return (
              <div key={capability.title} className="bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={18} />
                </span>
                <p className="mt-4 text-[15px] font-bold text-ink">{capability.title}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
                  {capability.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
