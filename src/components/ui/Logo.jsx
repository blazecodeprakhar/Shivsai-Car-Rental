import { site } from '../../data/site'

export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <img
      src="/main-logo.jpeg"
      alt={`${site.name} logo`}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      className={`${className} rounded-xl object-cover object-center border border-amber-500/35 shadow-md shadow-amber-500/10 select-none`}
    />
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
