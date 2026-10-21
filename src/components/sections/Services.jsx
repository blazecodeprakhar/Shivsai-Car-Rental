import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading, staggerParent, staggerItem } from '../ui/Motion'
import { SERVICES } from '../../data/content'
import { useUI } from '../../context/UIContext'

export default function Services() {
  const { openBooking } = useUI()

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="services" className="bg-dots relative bg-surface py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we offer"
          title="Reliable cars for"
          highlight="every journey"
          text="Affordable rental packages for local, outstation, and airport travel."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {SERVICES.map((s, i) => (
            <motion.button
              type="button"
              key={s.title}
              variants={staggerItem}
              onMouseMove={onMove}
              onClick={() => openBooking({ trip: s.trip })}
              id={`service-${i}`}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-25px_rgba(10,15,28,0.35)] sm:p-8"
            >
              {/* spotlight */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(255,173,10,0.14), transparent 45%)' }}
              />
              <span className="absolute top-0 left-0 h-1 w-0 bg-linear-to-r from-brand-400 to-flame-500 transition-all duration-700 group-hover:w-full" />

              <div className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-900 text-brand-400 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-linear-to-br group-hover:from-brand-400 group-hover:to-flame-500 group-hover:text-ink-950">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">{s.tag}</span>
              </div>
              <h3 className="relative mt-6 text-xl font-bold text-ink-900">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-900/60">{s.text}</p>
              <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-colors group-hover:text-brand-600">
                Book now
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="pointer-events-none absolute -right-4 -bottom-6 font-display text-8xl font-extrabold text-ink-900/[0.04] transition-colors duration-500 group-hover:text-brand-500/10">
                0{i + 1}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
