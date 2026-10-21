import { ArrowUpRight, Phone } from 'lucide-react'
import { Reveal } from '../ui/Motion'
import { site } from '../../data/site'
import { useUI } from '../../context/UIContext'

export default function CTA() {
  const { openBooking } = useUI()
  return (
    <section className="relative bg-white pb-20 sm:pb-28" aria-label="Book now">
      <div className="container-x">
        <Reveal scale={0.96} className="relative overflow-hidden rounded-[2.5rem] bg-ink-950 px-6 py-14 text-center sm:px-12 sm:py-20">
          <img src="/cars_assets/creata---300000/img-1.webp" alt="" loading="lazy" draggable={false} onContextMenu={(e) => e.preventDefault()} className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none select-none" />
          <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/30 blur-[100px]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl leading-[1.1] font-extrabold text-white sm:text-5xl">
              Ready for your next <span className="text-gradient">journey?</span>
            </h2>
            <p className="mt-4 text-white/70 sm:text-lg">Book in under a minute with verified drivers & transparent fares.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => openBooking()} id="cta-book" className="btn btn-primary px-8 py-4 text-base">
                Book Your Ride <ArrowUpRight className="h-5 w-5" />
              </button>
              <a href={`tel:${site.phoneRaw}`} className="btn btn-ghost px-8 py-4 text-base">
                <Phone className="h-5 w-5 text-brand-400" /> {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
