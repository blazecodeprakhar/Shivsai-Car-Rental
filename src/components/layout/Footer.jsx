import { motion } from 'motion/react'
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react'
import { useState } from 'react'
import Logo from '../ui/Logo'
import { FacebookIcon, InstagramIcon, XIcon, YouTubeIcon, LinkedInIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { site } from '../../data/site'
import { NAV_LINKS, SERVICES, CITIES } from '../../data/content'
import { useUI } from '../../context/UIContext'

const socials = [
  { icon: FacebookIcon, href: site.socials.facebook, label: 'Facebook' },
  { icon: InstagramIcon, href: site.socials.instagram, label: 'Instagram' },
  { icon: XIcon, href: site.socials.x, label: 'X' },
  { icon: YouTubeIcon, href: site.socials.youtube, label: 'YouTube' },
  { icon: LinkedInIcon, href: site.socials.linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  const { toast, openBooking } = useUI()
  const [email, setEmail] = useState('')

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Please enter a valid email', 'error')
    toast('Subscribed! Exclusive deals are on their way.')
    setEmail('')
  }

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink-950 pt-20 text-white/70">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

      <div className="container-x relative">
        {/* contact cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: 'Call us 24 × 7', value: site.phone, href: `tel:${site.phoneRaw}` },
            { icon: Mail, label: 'Email us', value: site.email, href: `mailto:${site.email}` },
            { icon: MapPin, label: 'Visit us', value: site.address, href: site.mapLink },
            { icon: Clock, label: 'Working hours', value: site.hours },
          ].map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href?.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="glass group flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-400 to-flame-500 text-ink-950 transition-transform duration-500 group-hover:rotate-[-10deg]">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-white/50">{c.label}</span>
                <span className="mt-0.5 block text-sm leading-snug font-semibold text-white">{c.value}</span>
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:bg-brand-400 hover:text-ink-950"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Book via WhatsApp: {site.phone}</span>
              </a>
            </div>
          </div>

          <FooterCol title="Quick Links" className="lg:col-span-2">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.id} href={`#${l.id}`}>{l.label}</FooterLink>
            ))}
            <FooterLink href={site.partnerLink}>Become a Partner</FooterLink>
          </FooterCol>

          <FooterCol title="Services" className="lg:col-span-2">
            {SERVICES.map((s) => (
              <FooterLink key={s.title} onClick={() => openBooking({ trip: s.trip })}>{s.title}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Top Cities" className="lg:col-span-2">
            {CITIES.slice(0, 7).map((c) => (
              <FooterLink key={c.name} onClick={() => openBooking({ from: c.name })}>Cabs in {c.name}</FooterLink>
            ))}
          </FooterCol>

          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-semibold text-white">Newsletter</h3>
            <p className="mt-4 text-sm">Get exclusive offers & travel tips.</p>
            <form onSubmit={subscribe} className="mt-4 flex rounded-full border border-white/10 bg-white/5 p-1 focus-within:border-brand-400">
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full min-w-0 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button type="submit" aria-label="Subscribe" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-400 text-ink-950 transition hover:scale-110">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-400">Privacy Policy</a>
            <a href="#" className="hover:text-brand-400">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-400">Refund Policy</a>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div aria-hidden className="pointer-events-none relative -mb-6 text-center font-display text-[14vw] leading-none font-extrabold tracking-tighter text-white/[0.03] select-none sm:-mb-10 whitespace-nowrap overflow-hidden">
        Shivsai Car
      </div>
    </footer>
  )
}

function FooterCol({ title, children, className = '' }) {
  return (
    <div className={className}>
      <h3 className="font-display text-base font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, onClick, children }) {
  const cls = 'group inline-flex items-center gap-1.5 text-sm transition-colors hover:text-brand-400 cursor-pointer text-left'
  const inner = (
    <>
      <ArrowRight className="h-3 w-0 opacity-0 transition-all duration-300 group-hover:w-3 group-hover:opacity-100" />
      {children}
    </>
  )
  return <li>{href ? <a href={href} className={cls}>{inner}</a> : <button onClick={onClick} className={cls}>{inner}</button>}</li>
}
