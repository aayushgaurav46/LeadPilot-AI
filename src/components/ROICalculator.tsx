import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { roiDefaults } from '../data/demoData'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-US')

// Illustrative uplift assumption used only to demonstrate how the calculator works.
const ILLUSTRATIVE_UPLIFT_POINTS = 4

function ROICalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(roiDefaults.monthlyLeads)
  const [avgDealValue, setAvgDealValue] = useState(roiDefaults.avgDealValue)
  const [currentApptRate, setCurrentApptRate] = useState(roiDefaults.currentApptRate)

  const results = useMemo(() => {
    const potentialRate = Math.min(currentApptRate + ILLUSTRATIVE_UPLIFT_POINTS, 30)
    const currentAppointments = Math.round((monthlyLeads * currentApptRate) / 100)
    const potentialAppointments = Math.round((monthlyLeads * potentialRate) / 100)
    const additionalAppointments = Math.max(potentialAppointments - currentAppointments, 0)
    const potentialPipelineValue = additionalAppointments * avgDealValue

    return {
      potentialRate,
      currentAppointments,
      potentialAppointments,
      additionalAppointments,
      potentialPipelineValue,
    }
  }, [monthlyLeads, avgDealValue, currentApptRate])

  return (
    <section id="roi" className="section-y border-t border-line bg-canvas-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
            Estimate the potential impact
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
            Adjust the inputs to see an illustrative view of how lead volume and
            appointment rate could translate into pipeline.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Inputs */}
          <div className="space-y-7 rounded-2xl border border-line bg-white p-6 shadow-panel sm:p-7">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="monthlyLeads" className="text-[13.5px] font-semibold text-ink">
                  Monthly Leads
                </label>
                <span className="font-display text-[15px] font-bold text-ink tabular">
                  {numberFormatter.format(monthlyLeads)}
                </span>
              </div>
              <input
                id="monthlyLeads"
                type="range"
                min={10}
                max={2000}
                step={10}
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="avgDealValue" className="text-[13.5px] font-semibold text-ink">
                  Average Deal Value
                </label>
                <span className="font-display text-[15px] font-bold text-ink tabular">
                  {currencyFormatter.format(avgDealValue)}
                </span>
              </div>
              <input
                id="avgDealValue"
                type="range"
                min={100000}
                max={2000000}
                step={10000}
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="apptRate" className="text-[13.5px] font-semibold text-ink">
                  Current Appointment Rate
                </label>
                <span className="font-display text-[15px] font-bold text-ink tabular">
                  {currentApptRate}%
                </span>
              </div>
              <input
                id="apptRate"
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={currentApptRate}
                onChange={(e) => setCurrentApptRate(Number(e.target.value))}
                className="mt-3 w-full accent-accent"
              />
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-panel sm:p-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-canvas p-4">
                <p className="text-[12px] text-ink-faint">Current appointments / mo</p>
                <p className="mt-1.5 font-display text-2xl font-extrabold text-ink tabular">
                  {numberFormatter.format(results.currentAppointments)}
                </p>
              </div>
              <div className="rounded-xl bg-canvas p-4">
                <p className="text-[12px] text-ink-faint">Potential additional appts</p>
                <p className="mt-1.5 font-display text-2xl font-extrabold text-accent tabular">
                  +{numberFormatter.format(results.additionalAppointments)}
                </p>
              </div>
              <div className="rounded-xl bg-canvas p-4">
                <p className="text-[12px] text-ink-faint">Illustrative appt. rate</p>
                <p className="mt-1.5 font-display text-2xl font-extrabold text-ink tabular">
                  {results.potentialRate}%
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-accent/25 bg-accent-soft p-5">
              <p className="text-[13px] font-medium text-accent">Potential additional pipeline value</p>
              <p className="mt-2 font-display text-3xl font-extrabold text-ink tabular sm:text-4xl">
                {currencyFormatter.format(results.potentialPipelineValue)}
              </p>
              <p className="mt-1 text-[13px] text-ink-soft">per month, at your current average deal value</p>
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-line-soft bg-canvas p-3.5">
              <Info size={16} className="mt-0.5 shrink-0 text-ink-faint" />
              <p className="text-[12.5px] leading-relaxed text-ink-faint">
                Illustrative estimate — not a guaranteed result. Figures assume a
                hypothetical {ILLUSTRATIVE_UPLIFT_POINTS}-point increase in
                appointment rate to demonstrate how the calculator works, and do
                not represent actual outcomes for any customer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ROICalculator
