import { ShieldCheck, ArrowRight } from 'lucide-react'
import Modal from './Modal'
import { useUI } from '../../context/UIContext'
import { OFFICIAL_TERMS } from '../../data/content'

export default function TermsModal() {
  const { termsOpen, closeTerms, openBooking } = useUI()

  return (
    <Modal open={termsOpen} onClose={closeTerms} labelledBy="terms-modal-title" maxWidth="max-w-2xl" closeTheme="dark">
      {/* Header */}
      <div className="bg-ink-950 px-6 py-6 text-white sm:px-8 pr-16">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-brand-400/20 px-2.5 py-0.5 text-xs font-bold text-brand-300 uppercase tracking-wider">
            Terms and Conditions
          </span>
          <span className="text-xs text-white/50">· 9 Official Guidelines</span>
        </div>
        <h2 id="terms-modal-title" className="mt-2 text-xl font-bold sm:text-2xl text-white">
          9 Standard Guidelines for Shivsai Rentals
        </h2>
        <p className="mt-1 text-xs text-white/70">
          Clear, transparent, and fair policies for self-drive cars and taxi bookings in Pune.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 pt-2.5 border-t border-white/10 text-[11px] text-brand-300 font-medium">
          <span className="font-semibold text-white">Standard Policy:</span> 24 hrs / 350 km included limit across all vehicles
        </div>
      </div>

      {/* 9 Terms List */}
      <div className="p-6 sm:p-8 space-y-3 max-h-[65vh] overflow-y-auto">
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
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-brand-50/80 p-3.5 border border-brand-500/20 text-xs text-brand-950">
          <ShieldCheck className="h-4 w-4 text-brand-600 shrink-0" />
          <span>
            All bookings adhere strictly to these 9 conditions. Please carry original Aadhaar, PAN and Driving License at pickup.
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
            className="btn btn-primary w-full sm:flex-1 py-3 text-sm font-bold shadow-md shadow-brand-500/20 cursor-pointer"
          >
            Book a Ride Now <ArrowRight className="h-4 w-4 ml-1" />
          </button>
          <button
            type="button"
            onClick={closeTerms}
            className="btn btn-outline w-full sm:w-auto py-3 px-6 text-sm font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
