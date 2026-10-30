import { motion } from 'motion/react'
import { Calendar, User, Phone, MapPin, Navigation, Users, Check, PhoneCall, Car, ChevronLeft, ChevronRight, Fuel } from 'lucide-react'
import { useState, useRef } from 'react'
import Modal from '../ui/Modal'
import { Field, CityInput, nowLocal, formatDateTime, addDaysToDateTime } from './Fields'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { useUI } from '../../context/UIContext'
import { FLEET, TRIP_TYPES, LOCAL_PACKAGES, ROAD_PACKAGES } from '../../data/content'
import { site, whatsappLink } from '../../data/site'

export default function BookingModal() {
  const { booking, closeBooking } = useUI()
  return (
    <Modal open={booking !== null} onClose={closeBooking} labelledBy="booking-title" maxWidth="max-w-3xl" closeTheme="dark">
      {booking && <BookingForm key={JSON.stringify(booking)} prefill={booking} />}
    </Modal>
  )
}

function BookingForm({ prefill }) {
  const { closeBooking, toast, openTerms } = useUI()
  const [form, setForm] = useState({
    trip: prefill.trip ?? 'oneway',
    from: prefill.from ?? '',
    to: prefill.to ?? '',
    date: prefill.date ?? nowLocal(3),
    returnDate: prefill.returnDate ?? '',
    dropDate: prefill.dropDate ?? (prefill.trip === 'road' ? (prefill.returnDate || addDaysToDateTime(prefill.date ?? nowLocal(3), 3)) : ''),
    pkg: prefill.pkg ?? (prefill.trip === 'road' ? ROAD_PACKAGES[2] : LOCAL_PACKAGES[2]),
    roadPkg: prefill.roadPkg ?? (prefill.trip === 'road' && prefill.pkg ? prefill.pkg : ROAD_PACKAGES[2]),
    car: prefill.car ?? FLEET[0]?.id ?? 'swift-diesel',
    fuelType: prefill.fuelType ?? 'Diesel',
    name: '',
    phone: '',
  })
  const [errors, setErrors] = useState({})
  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const carScrollRef = useRef(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasMovedRef = useRef(false)

  const scrollCars = (direction) => {
    if (!carScrollRef.current) return
    const scrollAmount = direction === 'left' ? -340 : 340
    carScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const handleMouseDown = (e) => {
    if (!carScrollRef.current) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    dragStartXRef.current = e.pageX - carScrollRef.current.offsetLeft
    scrollLeftRef.current = carScrollRef.current.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !carScrollRef.current) return
    e.preventDefault()
    const x = e.pageX - carScrollRef.current.offsetLeft
    const walk = (x - dragStartXRef.current) * 1.5
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true
    }
    carScrollRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const needsDrop = ['oneway', 'round', 'road'].includes(form.trip)
  const tripLabel = TRIP_TYPES.find((t) => t.id === form.trip)?.label
  const car = FLEET.find((c) => c.id === form.car) || FLEET[0]
  const activeFuel = car?.availableFuels
    ? car.availableFuels.find((f) => f.type === form.fuelType) || car.availableFuels[0]
    : null
  const currentPriceDisplay = activeFuel ? activeFuel.priceDisplay : car?.priceDisplay
  const currentVariantDisplay = activeFuel ? activeFuel.label : car?.variant

  const validate = () => {
    const e = {}
    if (!form.from.trim()) e.from = 'Pickup location is required'
    if (needsDrop && !form.to.trim()) e.to = 'Drop location is required'
    if (!form.date) e.date = 'Choose a pickup date'
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) e.phone = 'Enter a valid 10-digit mobile number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const message = () =>
    [
      `*New Booking Request - ${site.name}*`,
      `───────────────────────`,
      `🚗 *Trip Type:* ${tripLabel}`,
      `📍 *Pickup Location:* ${form.from}`,
      needsDrop && `🏁 *${form.trip === 'road' ? 'Destination' : 'Drop Location'}:* ${form.to}`,
      form.trip === 'local' && `⏱️ *Package:* ${form.pkg}`,
      form.trip === 'road' && `📦 *Package:* ${form.roadPkg || form.pkg}`,
      `📅 *${form.trip === 'road' ? 'Booking Date & Time' : 'Date & Time'}:* ${formatDateTime(form.date)}`,
      form.trip === 'round' && form.returnDate && `🔄 *Return Date:* ${formatDateTime(form.returnDate)}`,
      form.trip === 'road' && (form.dropDate || form.returnDate) && `🏁 *Drop Date & Time:* ${formatDateTime(form.dropDate || form.returnDate)}`,
      `🚘 *Vehicle:* ${car?.name} (${currentVariantDisplay}) - ${currentPriceDisplay}`,
      activeFuel && `⛽ *Fuel Type Selected:* ${activeFuel.type}`,
      car?.kmLimit && `🛣️ *Limit / Allowance:* ${car?.kmLimit}`,
      `───────────────────────`,
      `👤 *Customer:* ${form.name}`,
      `📞 *Phone:* +91 ${form.phone}`,
    ]
      .filter(Boolean)
      .join('\n')

  const submit = (mode) => {
    if (!validate()) return
    if (mode === 'whatsapp') {
      window.open(whatsappLink(message()), '_blank')
      toast('Redirecting to WhatsApp with your ride details...')
    } else {
      toast('Thanks! We will call you at +91 93714 12111 shortly.')
    }
    closeBooking()
  }

  return (
    <div>
      <div className="relative overflow-hidden bg-ink-950 px-6 pt-7 pb-6 text-white sm:px-8">
        <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
        <p className="text-xs font-semibold tracking-widest text-brand-400 uppercase">Quick booking</p>
        <h2 id="booking-title" className="mt-1 text-2xl font-bold sm:text-3xl">Complete your ride details</h2>
        {/* trip type chips */}
        <div className="no-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1">
          {TRIP_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => set('trip')(t.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                form.trip === t.id ? 'text-ink-950' : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {form.trip === t.id && (
                <motion.span layoutId="modal-trip" className="absolute inset-0 rounded-full bg-brand-400" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <t.icon className="relative h-4 w-4" />
              <span className="relative">{t.short}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => (e.preventDefault(), submit('whatsapp'))} className="space-y-5 px-6 py-6 sm:px-8" noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <CityInput label={form.trip === 'airport' ? 'Airport / Location' : 'Pickup Location'} placeholder="Enter Pune location" value={form.from} onChange={set('from')} error={errors.from} id="bk-from" />
          {needsDrop ? (
            <CityInput label="Drop Location / City" placeholder="Enter destination or city" value={form.to} onChange={set('to')} error={errors.to} icon={Navigation} id="bk-to" />
          ) : form.trip === 'local' ? (
            <Field label="Package" icon={Users}>
              <select className="field-input cursor-pointer" value={form.pkg} onChange={(e) => set('pkg')(e.target.value)}>
                {LOCAL_PACKAGES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
          ) : (
            <Field label="Pickup / Drop Address" icon={MapPin}>
              <input className="field-input" placeholder="Area, landmark" value={form.to} onChange={(e) => set('to')(e.target.value)} />
            </Field>
          )}
          <Field label={form.trip === 'road' ? 'Booking Date – Time' : 'Pickup Date & Time'} icon={Calendar} error={errors.date}>
            <input type="datetime-local" className="field-input" min={nowLocal()} value={form.date} onChange={(e) => {
              const newDate = e.target.value
              if (form.trip === 'road') {
                const days = parseInt(form.roadPkg, 10) || 3
                setForm((f) => ({ ...f, date: newDate, dropDate: addDaysToDateTime(newDate, days) }))
              } else {
                set('date')(newDate)
              }
            }} />
          </Field>
          {form.trip === 'round' && (
            <Field label="Return Date" icon={Calendar}>
              <input type="date" className="field-input" min={form.date.slice(0, 10)} value={form.returnDate} onChange={(e) => set('returnDate')(e.target.value)} />
            </Field>
          )}
          {form.trip === 'road' && (
            <>
              <Field label="Package" icon={Users}>
                <select
                  className="field-input cursor-pointer"
                  value={form.roadPkg}
                  onChange={(e) => {
                    const newPkg = e.target.value
                    const days = parseInt(newPkg, 10) || 1
                    setForm((f) => ({
                      ...f,
                      roadPkg: newPkg,
                      dropDate: addDaysToDateTime(f.date, days),
                    }))
                  }}
                >
                  {ROAD_PACKAGES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Drop Date – Time" icon={Calendar}>
                <input
                  type="datetime-local"
                  className="field-input"
                  min={form.date || nowLocal()}
                  value={form.dropDate}
                  onChange={(e) => set('dropDate')(e.target.value)}
                />
              </Field>
            </>
          )}
        </div>

        {/* Car picker */}
        <div>
          <div className="flex items-center justify-between mb-2 pl-1">
            <div className="flex items-center gap-2">
              <p className="field-label mb-0">Select vehicle ({FLEET.length} available)</p>
              <span className="hidden sm:inline-block text-[11px] font-medium text-ink-900/40">· Drag or use arrows</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs text-brand-600 font-semibold">Real photos & fixed rates</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollCars('left')}
                  id="car-scroll-left"
                  aria-label="Previous cars"
                  className="grid h-7 w-7 place-items-center rounded-full border border-ink-900/15 bg-white text-ink-900 shadow-xs hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition-all active:scale-90"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCars('right')}
                  id="car-scroll-right"
                  aria-label="Next cars"
                  className="grid h-7 w-7 place-items-center rounded-full border border-ink-900/15 bg-white text-ink-900 shadow-xs hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition-all active:scale-90"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative group/cars">
            {/* Floating Left Button */}
            <button
              type="button"
              onClick={() => scrollCars('left')}
              aria-label="Scroll left"
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:grid h-9 w-9 place-items-center rounded-full border border-ink-900/15 bg-white/95 text-ink-900 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:border-brand-500 hover:bg-brand-500 hover:text-ink-950 active:scale-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Floating Right Button */}
            <button
              type="button"
              onClick={() => scrollCars('right')}
              aria-label="Scroll right"
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:grid h-9 w-9 place-items-center rounded-full border border-ink-900/15 bg-white/95 text-ink-900 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:border-brand-500 hover:bg-brand-500 hover:text-ink-950 active:scale-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Draggable Carousel Track */}
            <div
              ref={carScrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="no-scrollbar -mx-6 flex snap-x gap-3 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8 cursor-grab active:cursor-grabbing select-none"
            >
              {FLEET.map((c) => {
                const active = form.car === c.id
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => {
                      if (hasMovedRef.current) return
                      set('car')(c.id)
                    }}
                    className={`relative w-44 shrink-0 snap-start rounded-2xl border-2 p-2.5 text-left transition-all duration-300 select-none ${
                      active ? 'border-brand-500 bg-brand-50/60 shadow-lg shadow-brand-500/20' : 'border-ink-900/10 hover:border-ink-900/25 bg-white'
                    }`}
                  >
                    {active && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 z-10 grid h-5 w-5 place-items-center rounded-full bg-brand-500 text-white shadow-sm pointer-events-none">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </motion.span>
                    )}
                    <div className="h-20 w-full overflow-hidden rounded-xl bg-surface select-none" onContextMenu={(e) => e.preventDefault()}>
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className="pointer-events-none h-full w-full object-cover object-center select-none"
                      />
                    </div>
                    <span className="mt-2 block text-xs font-bold text-ink-900 truncate" title={`${c.name} (${c.variant})`}>{c.name} <span className="text-amber-800 font-semibold">({c.variant})</span></span>
                    <div className="mt-0.5 flex items-baseline justify-between">
                      <span className="text-xs font-extrabold text-ink-950">{c.priceDisplay.split(' ')[0]}</span>
                      <span className="text-[10px] font-medium text-ink-900/60">{c.seats} seats</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* If the selected car has fuel options (Mahindra Thar), show Handwritten Note & Change Fuel Type */}
          {car?.availableFuels && (
            <div className="mt-3.5 space-y-3">
              {/* Authentic Handwritten Sticky Note */}
              <div className="relative mx-auto rounded-2xl border border-[#fef08a] bg-[#fff9c4] p-4 text-ink-950 shadow-md rotate-[-0.75deg] transition-all hover:rotate-0">
                {/* Frosted Scotch Tape */}
                <div className="absolute -top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rounded-xs border border-black/5 bg-white/80 shadow-xs backdrop-blur-xs rotate-[1.5deg]" />

                <div className="flex items-start gap-3 pt-1">
                  <span className="text-2xl leading-none select-none">📌</span>
                  <div className="pt-0.5">
                    <p className="font-['Caveat',cursive] text-xl font-bold leading-snug tracking-wide text-[#172554] sm:text-2xl">
                      "Note: This car is available in both Diesel and Petrol variants. Please select your preferred fuel type below."
                    </p>
                  </div>
                </div>
              </div>

              {/* Change Fuel Type Option Box */}
              <div className="rounded-2xl border border-ink-900/10 bg-surface/80 p-3.5 sm:p-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-brand-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-ink-950">
                      Change Fuel Type
                    </span>
                  </div>
                  <span className="rounded-full bg-brand-100/80 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800">
                    Petrol or Diesel Available
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {car.availableFuels.map((f) => {
                    const isSelected = (form.fuelType || 'Diesel') === f.type
                    return (
                      <button
                        type="button"
                        key={f.type}
                        onClick={() => set('fuelType')(f.type)}
                        className={`flex flex-col items-start rounded-xl border-2 p-3 text-left transition-all ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/80 shadow-sm'
                            : 'border-ink-900/10 bg-white hover:border-ink-900/25'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className="text-sm font-bold text-ink-950">{f.label}</span>
                          {isSelected && <Check className="h-4 w-4 text-brand-600" strokeWidth={3} />}
                        </div>
                        <span className="mt-1 font-display text-base font-extrabold text-ink-950">
                          {f.priceDisplay}
                        </span>
                        <span className="mt-0.5 text-[11px] leading-tight text-ink-900/60">
                          {f.description}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Your Name" icon={User} error={errors.name}>
            <input className="field-input" id="bk-name" placeholder="Full name" value={form.name} onChange={(e) => set('name')(e.target.value)} />
          </Field>
          <Field label="Mobile Number" icon={Phone} error={errors.phone}>
            <span className="text-[15px] font-medium text-ink-900/50">+91</span>
            <input className="field-input" id="bk-phone" inputMode="numeric" maxLength={10} placeholder="93714 12111" value={form.phone} onChange={(e) => set('phone')(e.target.value.replace(/\D/g, ''))} />
          </Field>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-surface/80 px-3.5 py-2 text-xs border border-ink-900/10">
          <span className="text-ink-900/70 font-medium">9 Terms Apply: 350 km/day · Bike or ₹20k deposit</span>
          <button type="button" onClick={() => openTerms()} className="font-bold text-brand-600 hover:underline cursor-pointer">
            View 9 Terms
          </button>
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <button type="submit" id="bk-whatsapp" className="btn flex-1 bg-[#25D366] py-4 text-base font-bold text-white shadow-lg shadow-[#25D366]/35 hover:-translate-y-0.5 hover:bg-[#20bd5a] transition-all">
            <WhatsAppIcon className="h-5 w-5" /> Send Details on WhatsApp
          </button>
          <button type="button" id="bk-callback" onClick={() => submit('callback')} className="btn btn-dark py-4 text-sm">
            <PhoneCall className="h-4 w-4" /> Request Callback
          </button>
        </div>
        <p className="text-center text-xs text-ink-900/50">Instant response on WhatsApp · 24 × 7 Direct Dispatch</p>
      </form>
    </div>
  )
}
