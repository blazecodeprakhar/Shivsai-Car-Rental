import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, Phone, CheckCircle2, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { site, whatsappLink } from '../../data/site'
import { useUI } from '../../context/UIContext'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)
  const { openEnquiry, toasts } = useUI()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Side enquiry tab */}
      <motion.button
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.2, type: 'spring' }}
        onClick={openEnquiry}
        id="enquiry-tab"
        className="fixed top-1/2 right-0 z-40 origin-bottom-right -translate-y-1/2 rounded-l-xl bg-linear-to-b from-brand-400 to-flame-500 px-2.5 py-4 text-xs font-bold tracking-widest text-ink-950 uppercase shadow-xl transition-all hover:pr-4 [writing-mode:vertical-rl]"
      >
        Enquiry
      </motion.button>

      {/* Bottom-right stack */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-900/10 bg-white text-ink-900 shadow-lg transition hover:-translate-y-1 hover:bg-ink-900 hover:text-white"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href={`tel:${site.phoneRaw}`}
          aria-label="Call now"
          className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-brand-400 shadow-lg transition hover:-translate-y-1 sm:hidden"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={whatsappLink(`Hi ${site.name}, I would like to book a cab.`)}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          id="whatsapp-float"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 animate-float"
        >
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
          <WhatsAppIcon className="relative h-7 w-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 sm:block">
            Chat with us
          </span>
        </a>
      </div>

      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl"
            >
              {t.type === 'error' ? <AlertCircle className="h-5 w-5 text-rose-400" /> : <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
