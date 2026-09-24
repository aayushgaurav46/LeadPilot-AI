import { ArrowRight } from 'lucide-react'

function CTA() {
  return (
    <section className="border-t border-line bg-ink">
      <div className="container-px mx-auto max-w-7xl py-20 text-center sm:py-24">
        <h2 className="text-balance font-display text-[2rem] font-extrabold tracking-tight text-white sm:text-[2.5rem]">
          Stop letting valuable leads go cold.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">
          See how an AI-powered lead workflow could fit into your real-estate
          operation.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            Try the Live Demo
            <ArrowRight size={16} />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/5"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
