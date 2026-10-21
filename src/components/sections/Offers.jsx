import { motion } from 'motion/react'
import { Copy, Check, Ticket } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading, staggerParent, staggerItem } from '../ui/Motion'
import { OFFERS } from '../../data/content'
import { useUI } from '../../context/UIContext'

export default function Offers() {
  const [copied, setCopied] = useState(null)
  const { toast } = useUI()

  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* clipboard may be unavailable; still show feedback */
    }
    setCopied(code)
    toast(`Coupon ${code} copied!`)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="offers" className="relative bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Deals & offers" title="Save more on" highlight="every ride" text="Use these promo codes for instant savings on your rides." />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
        >
          {OFFERS.map((o) => (
            <motion.div
              key={o.code}
              variants={staggerItem}
              whileHover={{ y: -8, rotate: -0.5 }}
              className="relative w-[80%] shrink-0 snap-start sm:w-auto"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface/70 border border-ink-900/[0.07] shadow-[0_20px_50px_-30px_rgba(10,15,28,0.2)]">
                <div className={`relative bg-linear-to-br p-6 text-white ${o.color}`}>
                  <span className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/15" />
                  <span className="absolute right-6 bottom-3 h-10 w-10 rounded-full bg-white/10" />
                  <Ticket className="relative h-8 w-8" />
                  <h3 className="relative mt-4 text-xl leading-snug font-bold">{o.title}</h3>
                </div>
                {/* perforation */}
                <div className="relative flex items-center">
                  <span className="absolute -left-3 h-6 w-6 rounded-full bg-white" />
                  <span className="mx-5 w-full border-t-2 border-dashed border-ink-900/10" />
                  <span className="absolute -right-3 h-6 w-6 rounded-full bg-white" />
                </div>
                <div className="flex flex-1 flex-col p-6 pt-4">
                  <p className="text-sm text-ink-900/60">{o.text}</p>
                  <button
                    onClick={() => copy(o.code)}
                    className="group mt-5 flex items-center justify-between rounded-xl border-2 border-dashed border-ink-900/15 bg-surface px-4 py-2.5 transition-colors hover:border-brand-500 hover:bg-brand-50"
                  >
                    <span className="font-display font-bold tracking-widest text-ink-900">{o.code}</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                      {copied === o.code ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
