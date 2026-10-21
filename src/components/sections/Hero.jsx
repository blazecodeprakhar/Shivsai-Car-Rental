import { motion } from 'motion/react'
import { ArrowRight, Phone, ShieldCheck, Car, Clock } from 'lucide-react'
import BookingWidget from '../booking/BookingWidget'
import { site } from '../../data/site'
import { FLEET, MARQUEE_ITEMS } from '../../data/content'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <>
      <section id="home" className="relative isolate overflow-hidden bg-[#070b14] pt-28 pb-16 sm:pt-32 lg:min-h-[92svh] lg:pt-36 lg:pb-20 flex items-center">
        {/* Subtle, clean modern dark backdrop */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(245,158,11,0.12),rgba(7,11,20,0))]" />
        <div className="bg-grid absolute inset-0 -z-10 opacity-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />
        <div className="absolute top-1/4 -right-32 -z-10 h-72 w-72 rounded-full bg-brand-500/10 blur-[100px]" />
        <div className="absolute bottom-10 -left-32 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="container-x w-full grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,540px)] lg:gap-14">
          {/* Copy */}
          <div className="text-center lg:text-left">
            {/* Simple status badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Shivsai Fleet · 18 Verified Cars Ready</span>
            </motion.div>

            {/* Headline in two clean lines */}
            <h1 className="mt-5 text-[2.75rem] leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl">
              <span className="block">Your journey,</span>
              <span className="block text-gradient">our wheels.</span>
            </h1>

            {/* Direct, clean copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0"
            >
              <span className="block">Self-drive rentals & taxi cabs with transparent pricing.</span>
              <span className="block text-white/50 text-sm sm:text-base mt-0.5">Rates start from ₹12/km or ₹2,000/day. Real cars & fast pickup.</span>
            </motion.p>

            {/* Clean CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a href="#fleet" id="hero-explore" className="btn btn-primary px-7 py-3.5 text-sm font-bold shadow-lg shadow-brand-500/25">
                View All 18 Cars <ArrowRight className="h-4 w-4 ml-1" />
              </a>
              <a href={`tel:${site.phoneRaw}`} id="hero-call" className="btn btn-ghost px-7 py-3.5 text-sm font-semibold border border-white/15 hover:bg-white/10">
                <Phone className="h-4 w-4 text-brand-400" /> {site.phone}
              </a>
            </motion.div>

            {/* Highlights strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10 lg:justify-start text-xs text-white/60"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                <span>Original Docs Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-brand-400" />
                <span>350 Km / Day Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-400" />
                <span>24x7 Direct Dispatch</span>
              </div>
            </motion.div>
          </div>

          {/* Simple, focused booking widget */}
          <div id="book" className="w-full">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* Horizontal running line / infinite marquee */}
      <div className="relative z-10 -mt-px overflow-hidden bg-[#070b14] py-5">
        <div className="-rotate-1 bg-linear-to-r from-brand-400 via-brand-500 to-flame-500 py-3 shadow-[0_10px_40px_-10px_rgba(255,140,0,0.6)]">
          <div className="flex w-max animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-6 px-6 font-display text-base font-bold tracking-wider whitespace-nowrap text-ink-950 uppercase sm:text-lg">
                {item}
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current shrink-0" aria-hidden>
                  <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
