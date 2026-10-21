import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading, Reveal } from '../ui/Motion'
import { TESTIMONIALS } from '../../data/content'

const avatarColors = ['from-brand-300 to-flame-500', 'from-sky-300 to-indigo-500', 'from-emerald-300 to-teal-500', 'from-pink-300 to-rose-500', 'from-violet-300 to-purple-500']

export default function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })])

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28" aria-label="Testimonials">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="Loved by" highlight="5,000+ riders" text="What our riders say about travelling with us." />
      </div>

      <Reveal delay={0.1} className="mt-14">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-[88%] px-2.5 sm:basis-[60%] lg:basis-[38%] xl:basis-[32%]">
                <figure className="group relative flex h-full flex-col rounded-3xl border border-ink-900/[0.06] bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(10,15,28,0.35)] sm:p-8">
                  <Quote className="absolute top-6 right-6 h-12 w-12 text-brand-500/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`h-4 w-4 ${k < t.rating ? 'fill-brand-500 text-brand-500' : 'text-ink-900/15'}`} />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink-900/75">“{t.text}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-900/[0.06] pt-5">
                    <span className={`grid h-11 w-11 place-items-center rounded-full bg-linear-to-br text-sm font-bold text-white ${avatarColors[i % avatarColors.length]}`}>
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">{t.name}</span>
                      <span className="text-xs text-ink-900/50">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <button onClick={() => embla?.scrollPrev()} aria-label="Previous testimonial" className="grid h-12 w-12 place-items-center rounded-full border border-ink-900/15 bg-white text-ink-900 transition hover:bg-ink-900 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => embla?.scrollNext()} aria-label="Next testimonial" className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-white transition hover:bg-brand-500 hover:text-ink-950">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Reveal>
    </section>
  )
}
