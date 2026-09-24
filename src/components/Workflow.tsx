import { workflowNodes } from '../data/demoData'
import { getIcon } from './iconMap'

function Connector({ index }: { index: number }) {
  return (
    <div
      className="relative h-px w-8 shrink-0 self-center overflow-hidden bg-line sm:w-10"
      aria-hidden="true"
    >
      <span
        className="absolute inset-y-0 left-0 w-4 bg-accent"
        style={{ animation: 'flow 2.2s ease-in-out infinite', animationDelay: `${index * 0.25}s` }}
      />
    </div>
  )
}

function Workflow() {
  return (
    <section className="section-y border-t border-line">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
            The automation workflow
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Every lead moves through the same reliable sequence, from first
            message to an updated record in your CRM.
          </p>
        </div>

        <div className="mt-12 -mx-6 overflow-x-auto scrollbar-none px-6 sm:mx-0 sm:px-0">
          <div className="mx-auto flex w-max items-stretch gap-0">
            {workflowNodes.map((node, i) => {
              const Icon = getIcon(node.icon)
              const isLast = i === workflowNodes.length - 1
              return (
                <div key={node.id} className="flex items-stretch">
                  <div className="flex w-[168px] flex-col items-start rounded-xl border border-line bg-white p-4 shadow-panel sm:w-[176px]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon size={17} />
                    </span>
                    <p className="mt-3 text-[14px] font-bold text-ink">{node.title}</p>
                    <p className="mt-1 text-[12.5px] leading-snug text-ink-soft">{node.description}</p>
                  </div>
                  {!isLast && <Connector index={i} />}
                </div>
              )
            })}
          </div>
        </div>
        <p className="mt-4 text-[12.5px] text-ink-faint lg:hidden">Scroll to see the full workflow →</p>
      </div>
    </section>
  )
}

export default Workflow
