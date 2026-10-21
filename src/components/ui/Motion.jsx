import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const EASE = [0.22, 1, 0.36, 1]

/** Fade/slide children into view on scroll */
export function Reveal({ children, delay = 0, y = 32, x = 0, scale = 1, className = '', as = 'div' }) {
  const M = motion[as] ?? motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/** Stagger container + item for lists/grids */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/** Section heading with eyebrow, title and description */
export function SectionHeading({ eyebrow, title, highlight, text, align = 'center', dark = false, className = '' }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${dark ? 'border-brand-400/30 bg-brand-400/10 text-brand-300' : ''}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-ink-900'}`}>
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {text && <p className={`text-base leading-relaxed sm:text-lg ${dark ? 'text-white/60' : 'text-ink-900/60'}`}>{text}</p>}
    </Reveal>
  )
}

/** Number that counts up when visible */
export function Counter({ to, decimals = 0, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setVal(v) })
    return () => controls.stop()
  }, [inView, to, duration])
  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
