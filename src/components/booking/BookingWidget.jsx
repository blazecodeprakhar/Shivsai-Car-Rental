import { AnimatePresence, motion } from 'motion/react'
import { Calendar, Navigation, Package, Search, MapPin, Timer, PlaneLanding, PlaneTakeoff, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Field, CityInput, nowLocal } from './Fields'
import { TRIP_TYPES, LOCAL_PACKAGES } from '../../data/content'
import { useUI } from '../../context/UIContext'

const initial = () => ({
  from: '',
  to: '',
  date: nowLocal(3),
  returnDate: '',
  pkg: LOCAL_PACKAGES[2],
  days: '3',
  airportMode: 'pickup',
})

export default function BookingWidget() {
  const [trip, setTrip] = useState('local')
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const { openBooking } = useUI()

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSearch = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.from.trim()) errs.from = 'Please enter a city'
    if (['oneway', 'round', 'road'].includes(trip) && !form.to.trim()) errs.to = 'Please enter destination'
    setErrors(errs)
    if (Object.keys(errs).length) return
    openBooking({
      trip,
      from: form.from,
      to: trip === 'airport' ? form.to : form.to,
      date: form.date,
      returnDate: form.returnDate,
      pkg: form.pkg,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-linear-to-br from-brand-400/60 via-transparent to-flame-500/50 opacity-70 blur-xl" />
      <div className="relative rounded-[1.75rem] border border-white/60 bg-white/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-4">
        {/* Tabs */}
        <div role="tablist" aria-label="Trip type" className="grid grid-cols-5 gap-1 rounded-2xl bg-surface p-1.5">
          {TRIP_TYPES.map((t) => {
            const active = trip === t.id
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                id={`tab-${t.id}`}
                type="button"
                onClick={() => {
                  setTrip(t.id)
                  setErrors({})
                }}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-[11px] font-semibold transition-colors sm:text-xs ${
                  active ? 'text-ink-950' : 'text-ink-900/55 hover:text-ink-900'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="trip-tab"
                    className="absolute inset-0 rounded-xl bg-linear-to-br from-brand-300 to-brand-500 shadow-lg shadow-brand-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <t.icon className={`relative h-5 w-5 transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
                <span className="relative leading-tight">{t.short}</span>
              </button>
            )
          })}
        </div>

        <form onSubmit={onSearch} className="px-1 pt-4 pb-1 sm:px-2" noValidate>
          <AnimatePresence mode="wait">
            <motion.div
              key={trip}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {trip === 'airport' && (
                <div className="grid grid-cols-2 gap-1 rounded-2xl bg-surface p-1 sm:col-span-2">
                  {[
                    { id: 'pickup', label: 'Pickup from Airport', icon: PlaneLanding },
                    { id: 'drop', label: 'Drop to Airport', icon: PlaneTakeoff },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => set('airportMode')(m.id)}
                      className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                        form.airportMode === m.id ? 'bg-ink-900 text-white shadow-md' : 'text-ink-900/60 hover:text-ink-900'
                      }`}
                    >
                      <m.icon className="h-4 w-4" /> {m.label}
                    </button>
                  ))}
                </div>
              )}

              <CityInput
                id="w-from"
                label={trip === 'airport' ? 'Airport City' : trip === 'local' ? 'Pickup City' : 'From'}
                placeholder="Enter city"
                value={form.from}
                onChange={set('from')}
                error={errors.from}
              />

              {['oneway', 'round', 'road'].includes(trip) && (
                <CityInput id="w-to" label={trip === 'road' ? 'Destination' : 'To'} placeholder="Enter destination" icon={Navigation} value={form.to} onChange={set('to')} error={errors.to} />
              )}

              {trip === 'local' && (
                <Field label="Package" icon={Package}>
                  <select id="w-pkg" className="field-input cursor-pointer" value={form.pkg} onChange={(e) => set('pkg')(e.target.value)}>
                    {LOCAL_PACKAGES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
              )}

              {trip === 'airport' && (
                <Field label={form.airportMode === 'pickup' ? 'Drop Address' : 'Pickup Address'} icon={MapPin}>
                  <input id="w-address" className="field-input" placeholder="Area, landmark" value={form.to} onChange={(e) => set('to')(e.target.value)} />
                </Field>
              )}

              <Field label={trip === 'road' ? 'Start Date' : 'Pickup Date & Time'} icon={Calendar} className={trip === 'local' || trip === 'oneway' || trip === 'airport' ? 'sm:col-span-2' : ''}>
                <input id="w-date" type="datetime-local" className="field-input" min={nowLocal()} value={form.date} onChange={(e) => set('date')(e.target.value)} />
              </Field>

              {trip === 'round' && (
                <Field label="Return Date" icon={Calendar}>
                  <input id="w-return" type="date" className="field-input" min={form.date.slice(0, 10)} value={form.returnDate} onChange={(e) => set('returnDate')(e.target.value)} />
                </Field>
              )}

              {trip === 'road' && (
                <Field label="Trip Duration" icon={Timer}>
                  <select id="w-days" className="field-input cursor-pointer" value={form.days} onChange={(e) => set('days')(e.target.value)}>
                    {Array.from({ length: 14 }, (_, i) => i + 2).map((d) => (
                      <option key={d} value={d}>{d} Days</option>
                    ))}
                  </select>
                </Field>
              )}
            </motion.div>
          </AnimatePresence>

          <button type="submit" id="w-search" className="btn btn-primary mt-4 w-full py-4 text-base">
            <Search className="h-5 w-5" /> Search Cabs
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-900/50">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Best price guarantee · No hidden charges
          </p>
        </form>
      </div>
    </motion.div>
  )
}
