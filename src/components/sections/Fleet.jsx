import { AnimatePresence, motion } from 'motion/react'
import {
  Users,
  Fuel,
  Snowflake,
  ArrowRight,
  Info,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  FileText,
} from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from '../ui/Motion'
import { FLEET, FLEET_FILTERS, FLEET_TERMS } from '../../data/content'
import { useUI } from '../../context/UIContext'
import { site, whatsappLink } from '../../data/site'
import { WhatsAppIcon } from '../ui/BrandIcons'

export default function Fleet() {
  const [filter, setFilter] = useState('All')
  const [activeCarPhotos, setActiveCarPhotos] = useState(null)
  const [termsModalCar, setTermsModalCar] = useState(null)
  const { openBooking } = useUI()

  const cars = filter === 'All' ? FLEET : FLEET.filter((c) => c.category === filter)

  const openWhatsAppForCar = (car) => {
    const text = [
      `*Car Booking Inquiry - ${site.name}*`,
      `───────────────────────`,
      `🚗 *Vehicle:* ${car.name} (${car.variant})`,
      `💰 *Rate:* ${car.priceDisplay}`,
      `🛣️ *Limit:* ${car.kmLimit}`,
      `⛽ *Variant:* ${car.variant}`,
      `👥 *Seating:* ${car.seats} Seater`,
      `───────────────────────`,
      `Hello Shivsai Car Rental, I want to book this car. Please confirm availability.`,
    ].join('\n')
    window.open(whatsappLink(text), '_blank')
  }

  return (
    <section id="fleet" className="relative bg-white py-20 sm:py-28">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            className="items-center! text-center lg:items-start! lg:text-left max-w-none!"
            eyebrow="Our Verified Fleet"
            title="Available Cars &"
            highlight="Transparent Pricing"
          />

          {/* Filters */}
          <div className="no-scrollbar -mx-4 flex max-w-[100vw] gap-1 overflow-x-auto px-4 lg:mx-0 lg:px-0 lg:shrink-0">
            <div className="flex gap-1 rounded-full border border-ink-900/10 bg-surface p-1.5 shadow-xs">
              {FLEET_FILTERS.map((f) => {
                const count = f === 'All' ? FLEET.length : FLEET.filter((c) => c.category === f).length
                return (
                  <button
                    key={f}
                    id={`fleet-filter-${f.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors sm:px-4 sm:text-sm ${
                      filter === f ? 'text-white' : 'text-ink-900/60 hover:text-ink-900'
                    }`}
                  >
                    {filter === f && (
                      <motion.span
                        layoutId="fleet-pill"
                        className="absolute inset-0 rounded-full bg-ink-900 shadow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f} <span className="opacity-60 text-[11px]">({count})</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {cars.map((c) => (
              <CarCard
                key={c.id}
                car={c}
                onSelect={() => openBooking({ car: c.id })}
                onWhatsApp={() => openWhatsAppForCar(c)}
                onViewPhotos={() => setActiveCarPhotos(c)}
                onViewTerms={() => setTermsModalCar(c)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global Terms Summary Strip */}
        <div className="mt-16 rounded-3xl border border-ink-900/10 bg-surface/70 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-brand-600 uppercase">
                <FileText className="h-4 w-4" />
                Standard Rental Terms
              </div>
              <h3 className="text-lg font-bold text-ink-900 sm:text-xl">Simple, honest, and transparent guidelines</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 text-xs text-ink-900/75">
              <div className="rounded-xl bg-white p-3 border border-ink-900/5 shadow-xs">
                <p className="font-bold text-ink-900">⏱️ 24 Hrs / 350 Km</p>
                <p className="mt-0.5 text-ink-900/60">350 km standard limit (300 km for premium). ₹150/hr overtime.</p>
              </div>
              <div className="rounded-xl bg-white p-3 border border-ink-900/5 shadow-xs">
                <p className="font-bold text-ink-900">🏍️ Flexible Deposit</p>
                <p className="mt-0.5 text-ink-900/60">Deposit customer's 2-wheeler or ₹10,000 refundable deposit.</p>
              </div>
              <div className="rounded-xl bg-white p-3 border border-ink-900/5 shadow-xs">
                <p className="font-bold text-ink-900">📄 Required Documents</p>
                <p className="mt-0.5 text-ink-900/60">Original Aadhaar card, PAN card, and Driving Licence at pickup.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Photo Modal */}
      {activeCarPhotos && (
        <PhotoModal car={activeCarPhotos} onClose={() => setActiveCarPhotos(null)} />
      )}

      {/* Terms Info Modal */}
      {termsModalCar && (
        <TermsModal car={termsModalCar} onClose={() => setTermsModalCar(null)} onBook={() => {
          const car = termsModalCar
          setTermsModalCar(null)
          openBooking({ car: car.id })
        }} />
      )}
    </section>
  )
}

function CarCard({ car, onSelect, onWhatsApp, onViewPhotos, onViewTerms }) {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0)

  const nextPhoto = (e) => {
    e?.stopPropagation()
    setSelectedPhotoIdx((prev) => (prev + 1) % car.images.length)
  }
  const prevPhoto = (e) => {
    e?.stopPropagation()
    setSelectedPhotoIdx((prev) => (prev === 0 ? car.images.length - 1 : prev - 1))
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-900/[0.08] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-[0_25px_50px_-20px_rgba(10,15,28,0.2)]"
    >
      {/* Image container with drag to switch and anti-download protection */}
      <div
        className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-zinc-100 via-slate-50 to-amber-50/40 p-3 select-none"
        onContextMenu={(e) => e.preventDefault()}
      >
        <motion.div
          key={selectedPhotoIdx}
          drag={car.images.length > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -25 || info.velocity.x < -150) {
              nextPhoto()
            } else if (info.offset.x > 25 || info.velocity.x > 150) {
              prevPhoto()
            }
          }}
          className={`h-full w-full select-none ${
            car.images.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          <img
            src={car.images[selectedPhotoIdx] || car.image}
            alt={car.name}
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none h-full w-full rounded-2xl object-cover object-center select-none"
          />
        </motion.div>

        {/* Quick Prev / Next Arrow overlays for desktop hover */}
        {car.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-ink-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-500 hover:text-ink-950 shadow-md backdrop-blur-sm z-20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-ink-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-500 hover:text-ink-950 shadow-md backdrop-blur-sm z-20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Category & Badge */}
        <div className="absolute top-5 left-5 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
          <span className="rounded-full bg-ink-950/85 px-3 py-1 text-[11px] font-bold text-brand-300 shadow-md backdrop-blur-md">
            {car.badge}
          </span>
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink-900 shadow-sm backdrop-blur-md">
            {car.category}
          </span>
        </div>

        {/* Photo Gallery Trigger Badge */}
        <button
          type="button"
          onClick={onViewPhotos}
          className="absolute top-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-ink-950/80 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md backdrop-blur-md transition-colors hover:bg-ink-950 z-10"
        >
          <Camera className="h-3.5 w-3.5 text-brand-400" />
          <span>{car.images.length} {car.images.length === 1 ? 'Photo' : 'Photos'}</span>
        </button>

        {/* Photo thumbnail indicator dots (if multiple) */}
        {car.images.length > 1 && (
          <div className="absolute bottom-5 inset-x-0 flex justify-center gap-1.5 z-10">
            <div className="flex gap-1.5 rounded-full bg-ink-950/60 p-1 backdrop-blur-md">
              {car.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPhotoIdx(i)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    selectedPhotoIdx === i ? 'w-5 bg-brand-400' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Name and Price */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-ink-950 leading-snug sm:text-xl">{car.name}</h3>
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-500/20">{car.variant}</span>
            </div>
            <p className="mt-0.5 text-xs text-ink-900/55 line-clamp-1">{car.tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display text-2xl font-black text-ink-950">{car.priceDisplay.split(' ')[0]}</p>
            <p className="text-[11px] font-semibold text-brand-600">{car.priceDisplay.split(' ').slice(1).join(' ')}</p>
          </div>
        </div>

        {/* Allowance pill */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-ink-900/75">
            <Gauge className="h-3.5 w-3.5 text-brand-600" />
            {car.kmLimit}
          </span>
          <span className="font-semibold text-ink-900/60">Extra: {car.extraKm}</span>
        </div>

        {/* Feature Specs Grid */}
        <ul className="mt-4 grid grid-cols-4 gap-2 border-y border-ink-900/[0.07] py-3 text-center">
          <li className="flex flex-col items-center gap-1">
            <Users className="h-4 w-4 text-brand-600" />
            <span className="text-[11px] font-semibold text-ink-900">{car.seats} Seats</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <Fuel className="h-4 w-4 text-brand-600" />
            <span className="text-[11px] font-semibold text-ink-900">{car.fuel.split(' ')[0]}</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <Snowflake className="h-4 w-4 text-brand-600" />
            <span className="text-[11px] font-semibold text-ink-900">AC</span>
          </li>
          <li className="flex flex-col items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            <span className="text-[11px] font-semibold text-ink-900">Verified</span>
          </li>
        </ul>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={onSelect}
            id={`book-btn-${car.id}`}
            className="btn btn-dark flex-1 py-3 text-xs font-bold sm:text-sm hover:bg-linear-to-r hover:from-brand-500 hover:to-flame-500 hover:text-ink-950 transition-all shadow-xs"
          >
            Book Car
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>

          <button
            type="button"
            onClick={onWhatsApp}
            title="Book directly on WhatsApp"
            aria-label="Book on WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366] text-white shadow-xs hover:bg-[#20bd5a] transition-all hover:scale-105"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onViewTerms}
            title="View Rental Terms & Deposit Info"
            aria-label="Rental terms"
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink-900/10 bg-white text-ink-900/70 hover:bg-surface hover:text-ink-900 transition-colors"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

function PhotoModal({ car, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const prev = () => setCurrentIdx((i) => (i === 0 ? car.images.length - 1 : i - 1))
  const next = () => setCurrentIdx((i) => (i === car.images.length - 1 ? 0 : i + 1))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-ink-950 border border-white/10 shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-white">
          <div>
            <h4 className="text-base font-bold sm:text-lg">{car.name}</h4>
            <p className="text-xs text-white/60">
              Photo {currentIdx + 1} of {car.images.length} · {car.priceDisplay}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Photo Display with drag gesture & anti-download protection */}
        <div
          className="relative flex aspect-[16/10] sm:aspect-[16/9] max-h-[65vh] w-full items-center justify-center bg-black/50 p-2 sm:p-4 select-none overflow-hidden"
          onContextMenu={(e) => e.preventDefault()}
        >
          <motion.div
            key={currentIdx}
            drag={car.images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -30 || info.velocity.x < -180) next()
              else if (info.offset.x > 30 || info.velocity.x > 180) prev()
            }}
            className="flex h-full w-full items-center justify-center select-none cursor-grab active:cursor-grabbing"
          >
            <img
              src={car.images[currentIdx]}
              alt={`${car.name} angle ${currentIdx + 1}`}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="pointer-events-none max-h-full max-w-full rounded-xl object-contain shadow-2xl select-none"
            />
          </motion.div>

          {car.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-4 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-ink-900/80 text-white shadow-lg backdrop-blur hover:bg-brand-500 hover:text-ink-950 transition-colors z-20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-4 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-ink-900/80 text-white shadow-lg backdrop-blur hover:bg-brand-500 hover:text-ink-950 transition-colors z-20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail row */}
        {car.images.length > 1 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-white/10 bg-ink-900/80 p-3 sm:p-4">
            {car.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIdx(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  currentIdx === i ? 'border-brand-400 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TermsModal({ car, onClose, onBook }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-ink-900/10">
        <div className="bg-ink-950 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Rental Policy</span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <h4 className="mt-1 text-xl font-bold">{car.name}</h4>
          <p className="text-xs text-white/60">Rate: {car.priceDisplay} · {car.kmLimit}</p>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2.5 text-xs sm:text-sm text-ink-900/80">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Included Kilometer Limit:</strong> {car.kmLimit}. Extra running charged at {car.extraKm}.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Overtime Charge:</strong> ₹150 per hour if trip exceeds 24 hours.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Security Deposit:</strong> Customer's bike / 2-wheeler OR ₹10,000 cash/online deposit.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Documents Required:</strong> Please carry original Aadhaar card, PAN card, and Driving Licence at the time of pickup.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Fuel Policy:</strong> Maintain initial level of fuel. Extra fuel left is non-refundable.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Damage & Safety:</strong> Strict zero drink and drive policy. Customer is fully responsible for any damages.</span>
            </div>
          </div>

          <div className="pt-3 border-t border-ink-900/10 flex items-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="btn btn-primary flex-1 py-3 text-xs font-bold sm:text-sm"
            >
              Continue to Book
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline py-3 text-xs font-bold sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
