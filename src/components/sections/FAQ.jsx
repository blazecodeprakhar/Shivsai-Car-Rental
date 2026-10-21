import { AnimatePresence, motion } from 'motion/react'
import { Plus, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading, Reveal } from '../ui/Motion'
import { FAQS } from '../../data/content'
import { site, whatsappLink } from '../../data/site'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative bg-white py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" className="items-center! text-center lg:items-start! lg:text-left" eyebrow="FAQ" title="Questions?" highlight="We've got answers" text="Quick answers to frequently asked questions." />
          <Reveal delay={0.15} className="mt-8 rounded-3xl bg-ink-950 p-6 text-white">
            <p className="font-display text-lg font-semibold">Still have questions?</p>
            <p className="mt-1 text-sm text-white/60">Our travel experts are available round the clock.</p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <a href={`tel:${site.phoneRaw}`} className="btn btn-primary flex-1"><Phone className="h-4 w-4" /> Call us</a>
              <a href={whatsappLink('Hi, I have a question about booking.')} target="_blank" rel="noreferrer" className="btn btn-ghost flex-1"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${isOpen ? 'border-brand-500/40 bg-brand-50/40' : 'border-ink-900/[0.08] bg-white hover:border-ink-900/20'}`}>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-display text-base font-semibold text-ink-900 sm:text-lg">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? 'bg-brand-500 text-ink-950' : 'bg-surface text-ink-900'}`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-6 text-sm leading-relaxed text-ink-900/65 sm:px-6">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
