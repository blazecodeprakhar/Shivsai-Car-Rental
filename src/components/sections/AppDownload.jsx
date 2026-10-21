import { motion } from 'motion/react'
import { Check, MapPin, Navigation, Star, Send } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '../ui/Motion'
import { GooglePlayIcon, AppleIcon } from '../ui/BrandIcons'
import { site } from '../../data/site'
import { useUI } from '../../context/UIContext'

export default function AppDownload() {
  const [phone, setPhone] = useState('')
  const { toast } = useUI()

  const sendLink = (e) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(phone)) return toast('Enter a valid 10-digit mobile number', 'error')
    toast('Download link sent to your phone!')
    setPhone('')
  }

  return (
    <section className="relative bg-white py-16 sm:py-24" aria-label="Download our app">
      <div className="container-x">
        <Reveal scale={0.96} className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-300 via-brand-500 to-flame-500 px-6 py-14 sm:px-12 lg:px-16 lg:py-0">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(5,7,13,0.25)_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="text-ink-950 lg:py-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-brand-400 uppercase">Get the app</span>
              <h2 className="mt-5 text-3xl leading-[1.1] font-extrabold sm:text-4xl lg:text-5xl">Your ride is just a tap away</h2>
              <p className="mt-4 max-w-md text-ink-950/75">Quick booking, live ride tracking, and exclusive discounts.</p>
              <ul className="mt-6 grid gap-2.5 text-sm font-semibold sm:grid-cols-2">
                {['Live ride tracking', 'App-only discounts', 'Instant invoices', 'One-tap rebooking'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-ink-950 text-brand-400"><Check className="h-3 w-3" strokeWidth={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <form onSubmit={sendLink} className="mt-8 flex max-w-md rounded-full bg-white p-1.5 shadow-xl shadow-ink-950/10">
                <span className="flex items-center pl-4 text-sm font-semibold text-ink-900/50">+91</span>
                <input
                  id="app-phone"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Mobile number"
                  className="w-full min-w-0 bg-transparent px-3 text-sm font-medium text-ink-900 outline-none"
                />
                <button type="submit" className="btn btn-dark shrink-0 px-5 py-2.5">
                  <span className="hidden sm:inline">Get link</span> <Send className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.appLinks.playStore} className="group flex items-center gap-2.5 rounded-2xl bg-ink-950 px-4 py-2.5 text-white transition hover:-translate-y-1">
                  <GooglePlayIcon className="h-6 w-6" />
                  <span className="leading-tight"><span className="block text-[10px] text-white/60">GET IT ON</span><span className="font-semibold">Google Play</span></span>
                </a>
                <a href={site.appLinks.appStore} className="group flex items-center gap-2.5 rounded-2xl bg-ink-950 px-4 py-2.5 text-white transition hover:-translate-y-1">
                  <AppleIcon className="h-6 w-6" />
                  <span className="leading-tight"><span className="block text-[10px] text-white/60">Download on the</span><span className="font-semibold">App Store</span></span>
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="relative flex justify-center lg:pt-16">
              <motion.div
                initial={{ y: 80, rotate: 6 }}
                whileInView={{ y: 0, rotate: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-64 rounded-[2.75rem] border-[10px] border-ink-950 bg-ink-950 shadow-[0_40px_80px_-20px_rgba(5,7,13,0.6)] sm:w-72"
              >
                <div className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink-950" />
                <div className="overflow-hidden rounded-[2.1rem] bg-surface">
                  {/* map */}
                  <div className="relative h-56 overflow-hidden bg-[#e8ecf2]">
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 280 230" preserveAspectRatio="none" aria-hidden>
                      <path d="M0 60 H280 M0 150 H280 M70 0 V230 M200 0 V230" stroke="#fff" strokeWidth="10" />
                      <path d="M0 105 H280 M135 0 V230" stroke="#fff" strokeWidth="5" />
                      <motion.path
                        d="M70 200 V150 H135 V60 H200 V30"
                        fill="none"
                        stroke="#ff8a00"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
                      />
                    </svg>
                    <span className="absolute bottom-6 left-[22%] grid h-7 w-7 place-items-center rounded-full bg-ink-900 text-white shadow-lg"><MapPin className="h-3.5 w-3.5" /></span>
                    <span className="absolute top-5 left-[68%] grid h-7 w-7 animate-bounce place-items-center rounded-full bg-flame-500 text-white shadow-lg"><Navigation className="h-3.5 w-3.5" /></span>
                  </div>
                  {/* sheet */}
                  <div className="-mt-5 rounded-t-3xl bg-white p-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.2)]">
                    <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink-900/15" />
                    <p className="text-[11px] font-semibold text-emerald-600">Driver arriving in 4 min</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-600">RK</span>
                      <span className="flex-1">
                        <span className="block text-sm font-bold text-ink-900">Ramesh Kumar</span>
                        <span className="flex items-center gap-1 text-[11px] text-ink-900/50"><Star className="h-3 w-3 fill-brand-500 text-brand-500" /> 4.9 · White Sedan</span>
                      </span>
                      <span className="rounded-lg bg-surface px-2 py-1 text-[10px] font-bold text-ink-900">KA 01 AB 1234</span>
                    </div>
                    <div className="mt-4 rounded-xl bg-ink-950 py-2.5 text-center text-xs font-semibold text-white">Track ride</div>
                  </div>
                </div>
              </motion.div>
              <div className="glass absolute top-24 -left-2 hidden animate-float rounded-2xl bg-white/70! p-3 text-ink-950 shadow-xl sm:block lg:left-0">
                <p className="text-[10px] font-semibold text-ink-900/60 uppercase">Fare</p>
                <p className="font-display text-xl font-extrabold">₹ 1,249</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
