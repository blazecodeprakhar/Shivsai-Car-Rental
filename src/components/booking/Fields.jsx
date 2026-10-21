import { AnimatePresence, motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { useId, useState } from 'react'
import { CITIES_LIST } from '../../data/content'

/** Labeled field wrapper with icon */
export function Field({ label, icon: Icon, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className={`field block ${error ? 'animate-shake border-rose-400! bg-rose-50/60!' : ''}`}>
        <span className="field-label">{label}</span>
        <span className="flex items-center gap-2.5">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-brand-600" />}
          {children}
        </span>
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 pl-2 text-xs font-medium text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/** City text input with animated suggestions dropdown */
export function CityInput({ label, value, onChange, placeholder = 'Enter city', error, icon = MapPin, id }) {
  const [focused, setFocused] = useState(false)
  const autoId = useId()
  const q = value.trim().toLowerCase()
  const matches = CITIES_LIST.filter((c) => c.toLowerCase().includes(q) && c.toLowerCase() !== q).slice(0, 6)

  return (
    <div className="relative">
      <Field label={label} icon={icon} error={error}>
        <input
          id={id ?? autoId}
          type="text"
          autoComplete="off"
          className="field-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && focused && matches[0] && q) {
              e.preventDefault()
              onChange(matches[0])
              setFocused(false)
            }
          }}
        />
      </Field>
      <AnimatePresence>
        {focused && matches.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-1.5 shadow-2xl shadow-ink-900/15"
          >
            {matches.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(c)
                    setFocused(false)
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-900 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  <MapPin className="h-3.5 w-3.5 opacity-50" /> {c}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Current local datetime string usable as <input type="datetime-local"> min/value */
export function nowLocal(offsetHours = 0) {
  const d = new Date(Date.now() + offsetHours * 3600_000)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

export function formatDateTime(v) {
  if (!v) return ''
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return v
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: v.length > 10 ? 'numeric' : undefined, minute: v.length > 10 ? '2-digit' : undefined })
}
