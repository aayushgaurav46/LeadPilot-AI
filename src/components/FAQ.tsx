import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '../data/demoData'

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-y border-t border-line">
      <div className="container-px mx-auto max-w-3xl">
        <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            const panelId = `faq-panel-${i}`
            const buttonId = `faq-button-${i}`
            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15.5px] font-semibold text-ink">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-ink-faint transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-ink-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
