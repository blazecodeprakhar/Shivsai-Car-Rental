import { motion } from 'motion/react'
import { Star, ShieldCheck, Car, Smile } from 'lucide-react'
import { Counter, staggerParent, staggerItem } from '../ui/Motion'
import { STATS } from '../../data/content'

const icons = [
  <svg key="g" viewBox="0 0 24 24" className="h-6 w-6"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8" /><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24" /><path fill="#FBBC05" d="M5.3 14.3a7.200 7.200 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8z" /><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9" /></svg>,
  <ShieldCheck key="p" className="h-6 w-6 text-emerald-500" />,
  <Car key="m" className="h-6 w-6 text-sky-500" />,
  <Smile key="s" className="h-6 w-6 text-brand-600" />,
]

export default function Stats() {
  return (
    <section className="relative bg-white py-16 sm:py-20" aria-label="Our numbers">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="container-x grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-surface/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(255,150,0,0.35)] sm:p-7"
          >
            <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/30" />
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {icons[i]}
              </span>
              {i === 0 && (
                <span className="flex gap-0.5 text-brand-500">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3 w-3 fill-current" />)}
                </span>
              )}
              {i === 1 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Guaranteed
                </span>
              )}
              {i === 2 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-bold text-sky-600">
                  Top Condition
                </span>
              )}
              {i === 3 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[11px] font-bold text-brand-600">
                  Trusted
                </span>
              )}
            </div>
            <p className="mt-5 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
              <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-900">{s.label}</p>
            <p className="text-xs text-ink-900/50">{s.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
