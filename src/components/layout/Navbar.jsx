import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Menu, X, Phone, ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
import { NAV_LINKS } from '../../data/content'
import { site } from '../../data/site'
import { useUI } from '../../context/UIContext'

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

const ids = NAV_LINKS.map((n) => n.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const { openBooking, openTerms } = useUI()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-[#070b14]/95 shadow-2xl shadow-black/60 backdrop-blur-md'
            : 'border-b border-white/[0.08] bg-[#070b14]/85 backdrop-blur-md'
        }`}
      >
        {/* Top utility strip - Location & 350 km daily limit */}
        <div className="border-b border-white/[0.08] bg-[#03060f]/90 py-1.5 text-[11px] sm:text-xs">
          <div className="container-x flex items-center justify-between gap-3 text-white/80">
            <a
              href={site.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-0 items-center gap-1.5 text-white/85 transition-colors hover:text-brand-300"
              title="Open location on Google Maps"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-400 transition-transform group-hover:scale-110" />
              <span className="font-bold text-brand-300">Location:</span>
              <span className="truncate font-medium text-white/95">
                {site.address}
              </span>
              <span className="hidden text-white/30 md:inline">·</span>
              <span className="hidden text-white/60 md:inline">
                Serving 120+ Pickup Locations Across Pune
              </span>
            </a>

            <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => openTerms()}
                className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                title="View 9 Rental Terms and Conditions"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Limit: 350 km / Day
              </button>
              <span className="hidden text-white/30 sm:inline">|</span>
              <button
                type="button"
                onClick={() => openTerms()}
                className="hidden text-white/75 hover:text-brand-300 text-[11px] font-semibold sm:inline transition-colors cursor-pointer"
              >
                9 Terms
              </button>
              <span className="hidden text-white/30 md:inline">|</span>
              <span className="hidden font-medium text-white/60 md:inline">Open 24 × 7</span>
            </div>
          </div>
        </div>

        <nav
          className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-3.5 sm:py-4'
          }`}
          aria-label="Main"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id} className="relative">
                <a
                  href={`#${l.id}`}
                  id={`nav-${l.id}`}
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active === l.id ? 'text-ink-950' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-brand-400 to-brand-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${site.phoneRaw}`}
              id="nav-call"
              className="group hidden items-center gap-2.5 text-white md:flex"
              aria-label="Call us"
            >
              <span className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-brand-400 group-hover:bg-brand-400/10">
                <Phone className="h-4 w-4 text-brand-400 transition-transform group-hover:rotate-12" />
              </span>
              <span className="hidden flex-col leading-tight xl:flex">
                <span className="text-[11px] text-white/50">24 × 7 Helpline</span>
                <span className="text-sm font-semibold">{site.phone}</span>
              </span>
            </a>
            <button onClick={() => openBooking()} id="nav-book" className="btn btn-primary hidden sm:inline-flex">
              Book a Ride <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href={`tel:${site.phoneRaw}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-brand-400 md:hidden"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              id="nav-menu-toggle"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-linear-to-r from-brand-400 to-flame-500" />
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink-950/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[70] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-ink-950 p-6 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-transform hover:rotate-90"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <motion.ul
                className="relative mt-10 flex flex-col gap-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {NAV_LINKS.map((l, i) => (
                  <motion.li key={l.id} variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-semibold transition-colors ${
                        active === l.id ? 'bg-white/10 text-brand-400' : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <span>
                        <span className="mr-3 text-xs text-white/30">0{i + 1}</span>
                        {l.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-50" />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="relative mt-auto space-y-3 pt-8 text-sm text-white/60">
                <a href={`tel:${site.phoneRaw}`} className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-400" /> {site.phone}</a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand-400" /> {site.email}</a>
                <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {site.address}</p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    openTerms()
                  }}
                  className="flex items-center justify-between w-full rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Standard Limit: 350 Km / Day
                  </span>
                  <span className="text-[11px] font-bold text-brand-300 underline">9 Terms</span>
                </button>
                <button
                  onClick={() => {
                    setOpen(false)
                    openBooking()
                  }}
                  className="btn btn-primary mt-4 w-full"
                >
                  Book a Ride <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
