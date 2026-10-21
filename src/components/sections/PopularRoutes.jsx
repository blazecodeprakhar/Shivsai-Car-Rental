import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading, Reveal } from '../ui/Motion'
import { ROUTE_TABS } from '../../data/content'
import { useUI } from '../../context/UIContext'

export default function PopularRoutes() {
  const [tab, setTab] = useState(ROUTE_TABS[0].id)
  const { openBooking } = useUI()
  const current = ROUTE_TABS.find((t) => t.id === tab)

  return (
    <section id="routes" className="relative bg-surface py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Popular routes" title="Top routes our" highlight="riders love" text="Fixed starting fares for top routes. Tap to book instantly." />

        <Reveal className="mt-10 flex justify-center">
          <div role="tablist" className="inline-flex gap-1 rounded-full border border-ink-900/10 bg-surface p-1.5">
            {ROUTE_TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                id={`routes-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-7 ${tab === t.id ? 'text-ink-950' : 'text-ink-900/60 hover:text-ink-900'}`}
              >
                {tab === t.id && <motion.span layoutId="routes-pill" className="absolute inset-0 rounded-full bg-linear-to-r from-brand-400 to-brand-500 shadow-md shadow-brand-500/30" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {current.routes.map(([from, to, price]) => (
              <motion.button
                key={from + to}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                onClick={() =>
                  openBooking({
                    trip: tab,
                    from: tab === 'airport' ? from.replace(' Airport', '') : from,
                    to: tab === 'airport' ? to : to,
                  })
                }
                className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-900/[0.08] bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:bg-brand-50/50 hover:shadow-lg hover:shadow-brand-500/10"
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-2 truncate text-sm font-semibold text-ink-900">
                    {from}
                    <span className="relative flex w-6 shrink-0 items-center">
                      <span className="h-px w-full bg-ink-900/20" />
                      <ArrowRight className="absolute -right-1 h-3.5 w-3.5 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    {to}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-900/50">
                    Starting at <span className="font-bold text-ink-900">₹{price.toLocaleString('en-IN')}</span>
                  </span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-ink-900 transition-all duration-300 group-hover:bg-ink-900 group-hover:text-brand-400">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
