import { motion } from 'motion/react'
import { SectionHeading } from '../ui/Motion'
import { STEPS } from '../../data/content'

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28" aria-label="How it works">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]" />

      <div className="container-x relative">
        <SectionHeading dark eyebrow="How it works" title="Book your ride in" highlight="4 easy steps" text="From search to destination in minutes, with no apps or sign-ups required." />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="absolute top-10 right-[12.5%] left-[12.5%] hidden h-px bg-white/10 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
              className="h-full origin-left bg-linear-to-r from-brand-400 via-brand-500 to-flame-500"
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                className="group relative text-center"
              >
                <div className="relative mx-auto grid h-20 w-20 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-brand-500/20 opacity-0 transition-opacity duration-500 group-hover:animate-pulse-ring group-hover:opacity-100" />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-ink-800 text-brand-400 transition-all duration-500 group-hover:scale-110 group-hover:border-brand-400 group-hover:bg-linear-to-br group-hover:from-brand-400 group-hover:to-flame-500 group-hover:text-ink-950">
                    <s.icon className="h-8 w-8" />
                  </span>
                  <span className="absolute -top-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-white font-display text-xs font-bold text-ink-950">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-white/55">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
