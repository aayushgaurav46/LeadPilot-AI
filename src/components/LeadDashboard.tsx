import { useMemo, useState } from 'react'
import { dashboardLeads } from '../data/demoData'
import type { DashboardFilter, DashboardLead, IntentLevel, LeadStatus } from '../data/types'

const filters: DashboardFilter[] = ['All', 'High Intent', 'Follow-up', 'Qualified']

const intentStyles: Record<IntentLevel, string> = {
  High: 'text-signal-success',
  Medium: 'text-signal-warning',
  Low: 'text-ink-faint',
}

const statusStyles: Record<LeadStatus, string> = {
  Qualified: 'bg-signal-successSoft text-signal-success',
  'Follow-up': 'bg-signal-warningSoft text-signal-warning',
  New: 'bg-accent-soft text-accent',
}

function matchesFilter(lead: DashboardLead, filter: DashboardFilter) {
  if (filter === 'All') return true
  if (filter === 'High Intent') return lead.intent === 'High'
  return lead.status === filter
}

function LeadDashboard() {
  const [filter, setFilter] = useState<DashboardFilter>('All')

  const filteredLeads = useMemo(
    () => dashboardLeads.filter((lead) => matchesFilter(lead, filter)),
    [filter],
  )

  return (
    <section id="product" className="section-y border-t border-line bg-canvas-surface">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="text-[2rem] font-extrabold tracking-tight sm:text-[2.35rem]">
              Lead intelligence dashboard
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
              Every lead scored and organized in one place, so your team knows
              exactly who to talk to next.
            </p>
          </div>
          <span className="inline-flex h-fit shrink-0 items-center rounded-md border border-line bg-canvas px-2.5 py-1 text-[11.5px] font-semibold text-ink-faint">
            Demo Data
          </span>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
                filter === f
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-white text-ink-soft hover:border-ink/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table — sm and up */}
        <div className="mt-6 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-panel sm:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-canvas text-[12px] uppercase tracking-wide text-ink-faint">
                <th className="px-5 py-3.5 font-semibold">Lead</th>
                <th className="px-5 py-3.5 font-semibold">Property</th>
                <th className="px-5 py-3.5 font-semibold">Budget</th>
                <th className="px-5 py-3.5 font-semibold">Intent</th>
                <th className="px-5 py-3.5 font-semibold">Score</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-line-soft last:border-none hover:bg-canvas/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[11.5px] font-bold text-accent">
                        {lead.initials}
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold text-ink">{lead.name}</p>
                        <p className="text-[12.5px] text-ink-faint">{lead.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[13.5px] text-ink-soft">{lead.propertyType}</td>
                  <td className="px-5 py-4 text-[13.5px] font-medium text-ink">{lead.budget}</td>
                  <td className={`px-5 py-4 text-[13.5px] font-semibold ${intentStyles[lead.intent]}`}>
                    {lead.intent}
                  </td>
                  <td className="px-5 py-4 text-[13.5px] font-semibold text-ink tabular">{lead.score}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-md px-2.5 py-1 text-[12px] font-semibold ${statusStyles[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-[13.5px] text-ink-faint">
                    No demo leads match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <div className="mt-6 space-y-3 sm:hidden">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="rounded-xl border border-line bg-white p-4 shadow-panel">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                    {lead.initials}
                  </span>
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink">{lead.name}</p>
                    <p className="text-[12.5px] text-ink-faint">{lead.location}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${statusStyles[lead.status]}`}
                >
                  {lead.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line-soft pt-3">
                <div>
                  <p className="text-[10.5px] uppercase tracking-wide text-ink-faint">Budget</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink">{lead.budget}</p>
                </div>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wide text-ink-faint">Intent</p>
                  <p className={`mt-0.5 text-[13px] font-semibold ${intentStyles[lead.intent]}`}>
                    {lead.intent}
                  </p>
                </div>
                <div>
                  <p className="text-[10.5px] uppercase tracking-wide text-ink-faint">Score</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-ink tabular">{lead.score}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredLeads.length === 0 && (
            <p className="rounded-xl border border-line bg-white p-6 text-center text-[13.5px] text-ink-faint">
              No demo leads match this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default LeadDashboard
