import { X, ShieldCheck, ArrowRight } from 'lucide-react'
import { useUI } from '../../context/UIContext'
import { OFFICIAL_TERMS } from '../../data/content'
import { site } from '../../data/site'

export default function TermsModal() {
  const { termsOpen, closeTerms, openBooking } = useUI()

  if (!termsOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-ink-900/10">
        {/* Header */}
        <div className="bg-ink-950 px-6 py-5 text-white sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-brand-400/20 px-2.5 py-0.5 text-xs font-bold text-brand-300 uppercase tracking-wider">
                Official Guidelines
              </span>
              <span className="text-xs text-white/50">· 9 Rules</span>
            </div>
            <button
              type="button"
              onClick={closeTerms}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
              aria-label="Close Terms modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl text-white">
            Terms and Conditions
          </h2>
          <p className="mt-1 text-xs text-white/70">
            {site.name} · Self-Drive Car Rental & Taxi Booking Guidelines
          </p>
        </div>

        {/* 9 Terms List */}
        <div className="p-6 sm:p-8 space-y-3 max-h-[70vh] overflow-y-auto">
          {OFFICIAL_TERMS.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-3.5 rounded-2xl border border-ink-900/8 bg-surface/60 p-4 transition-all hover:bg-white hover:border-brand-500/30 hover:shadow-xs"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500 text-ink-950 text-xs font-black shadow-xs">
                {t.id}
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-ink-950">{t.title}</h3>
                  <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-900 shrink-0">
                    {t.highlight}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-ink-900/85 font-medium">
                  {t.rule}
                </p>
              </div>
            </div>
          ))}

          {/* Quick Summary Pill */}
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-50/80 p-3.5 border border-brand-500/20 text-xs text-brand-950">
            <ShieldCheck className="h-4 w-4 text-brand-600 shrink-0" />
            <span>
              All bookings adhere strictly to these 9 conditions. Please carry original documents at pickup.
            </span>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-ink-900/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => {
                closeTerms()
                openBooking()
              }}
              className="btn btn-primary w-full sm:flex-1 py-3.5 text-sm font-bold"
            >
              Book a Ride Now <ArrowRight className="h-4 w-4 ml-1" />
            </button>
            <button
              type="button"
              onClick={closeTerms}
              className="btn btn-outline w-full sm:w-auto py-3.5 px-6 text-sm font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
