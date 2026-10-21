import { site } from '../../data/site'

export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg-brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd25c" />
          <stop offset="0.55" stopColor="#ffad0a" />
          <stop offset="1" stopColor="#ff6a1a" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#lg-brand)" />
      {/* Stylized road 'S' monogram for Shivsai */}
      <path d="M33 16c-3-3.2-8-4.2-12.5-2.2-5 2.2-5.8 7.2-2.5 10.2 3.6 3.2 11.5 4.2 11.5 8.5 0 4.5-4.2 6.8-10.5 6.2-4.5-.4-7.5-2.6-9.5-5.7" fill="none" stroke="#05070d" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.5 14v2.5M26.5 22.5l-1.5 2.5M22.5 31.5v2.5" stroke="#05070d" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ dark = true, className = '' }) {
  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`} aria-label={`${site.name} home`}>
      <span className="transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
        <LogoMark />
      </span>
      <span className={`font-display text-2xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
        {site.nameStart}
        <span className="text-gradient">{site.nameEnd}</span>
      </span>
    </a>
  )
}
