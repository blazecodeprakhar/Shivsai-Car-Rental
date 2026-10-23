import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, ArrowUpRight, Car } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { SectionHeading, Reveal } from '../ui/Motion'
import { CITIES } from '../../data/content'
import { useUI } from '../../context/UIContext'

export default function Cities() {
  const { openBooking } = useUI()
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])

  const onSelect = useCallback(() => embla && setSelected(embla.selectedScrollSnap()), [embla])
  useEffect(() => {
    if (!embla) return
    setSnaps(embla.scrollSnapList())
    embla.on('select', onSelect)
    embla.on('reInit', () => setSnaps(embla.scrollSnapList()))
    return () => embla.off('select', onSelect)
  }, [embla, onSelect])

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28" aria-label="Locations we serve in Pune">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" className="items-center! text-center md:items-start! md:text-left" eyebrow="Pune Coverage" title="Serving" highlight="120+ locations in Pune" text="Pick a location to see cabs, verified fleet and instant pickup near you." />
          <Reveal className="flex gap-2">
            <button onClick={() => embla?.scrollPrev()} aria-label="Previous location" className="grid h-12 w-12 place-items-center rounded-full border border-ink-900/15 text-ink-900 transition hover:border-ink-900 hover:bg-ink-900 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => embla?.scrollNext()} aria-label="Next location" className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-white transition hover:bg-brand-500 hover:text-ink-950">
              <ChevronRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex touch-pan-y">
              {CITIES.map((c) => (
                <div key={c.name} className="min-w-0 shrink-0 grow-0 basis-[82%] pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <button
                    onClick={() => openBooking({ from: c.name })}
                    className={`group relative flex h-80 w-full flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br p-6 text-left text-white ${c.gradient}`}
                  >
                    {/* decorative */}
                    <span className="absolute -top-16 -right-16 h-48 w-48 rounded-full border-[24px] border-white/10 transition-transform duration-700 group-hover:scale-125" />
                    <span className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                    <span className="pointer-events-none absolute right-4 bottom-16 font-display text-[9rem] leading-none font-extrabold text-white/10 transition-transform duration-700 group-hover:-translate-y-2">
                      {c.name[0]}
                    </span>

                    <span className="relative flex items-center justify-between">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">{c.area || 'Pune'}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-900 transition-all duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </span>

                    <span className="relative">
                      <span className="block font-display text-3xl font-bold">{c.name}</span>
                      <span className="mt-3 flex items-center gap-4 text-sm text-white/85">
                        <span className="flex items-center gap-1.5"><Car className="h-4 w-4" /> {c.cars}+ cars</span>
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${i === selected ? 'w-8 bg-brand-500' : 'w-2 bg-ink-900/15 hover:bg-ink-900/30'}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
