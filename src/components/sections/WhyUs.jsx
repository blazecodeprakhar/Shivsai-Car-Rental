import { motion } from 'motion/react'
import { ShieldCheck, Headphones, Star } from 'lucide-react'
import { SectionHeading, Reveal, staggerParent, staggerItem } from '../ui/Motion'
import { FEATURES } from '../../data/content'

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28" aria-label="Why choose us">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-flame-500/10 blur-[140px]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Visual */}
        <Reveal x={-40} y={0} className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-lg">
            <div className="absolute -inset-4 animate-spin-slow rounded-[2.5rem] border border-dashed border-brand-500/25" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <img src="/cars_assets/thar-diesel-42---550000/img-1.webp" alt="Shivsai Verified Fleet vehicle" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} className="aspect-[4/5] w-full object-cover object-center transition-transform duration-[2s] hover:scale-105 pointer-events-none select-none" />
              <div className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="font-display text-2xl font-bold text-white">10+ years on the road</p>
                <p className="text-sm text-white/70">Trusted by families and businesses</p>
              </div>
            </div>

            {/* floating badges */}
            <div className="glass absolute top-8 -left-4 flex animate-float items-center gap-3 rounded-2xl bg-ink-900/70! p-3.5 pr-5 shadow-2xl sm:-left-10">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400"><ShieldCheck className="h-5 w-5" /></span>
              <span><span className="block text-sm font-bold text-white">100% Verified</span><span className="text-xs text-white/50">Drivers & cars</span></span>
            </div>
            <div className="glass absolute -right-4 bottom-28 flex animate-float-slow items-center gap-3 rounded-2xl bg-ink-900/70! p-3.5 pr-5 shadow-2xl sm:-right-10">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/20 text-brand-400"><Headphones className="h-5 w-5" /></span>
              <span><span className="block text-sm font-bold text-white">24 × 7 Support</span><span className="text-xs text-white/50">Avg. reply 2 min</span></span>
            </div>
            <div className="absolute -top-6 right-6 grid h-24 w-24 animate-float place-items-center rounded-full bg-linear-to-br from-brand-400 to-flame-500 text-center text-ink-950 shadow-2xl shadow-brand-500/40">
              <span>
                <span className="flex items-center justify-center gap-0.5 font-display text-2xl font-extrabold">4.8<Star className="h-4 w-4 fill-current" /></span>
                <span className="block text-[10px] font-semibold uppercase">Rated</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading dark align="left" eyebrow="Why choose us" title="Travel that feels" highlight="effortless" text="Safe, punctual, and transparent rides with zero hassle." />
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[0.06]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-400/10 text-brand-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-400 group-hover:text-ink-950">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
