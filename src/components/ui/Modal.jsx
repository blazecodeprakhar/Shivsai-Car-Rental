import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ open, onClose, children, maxWidth = 'max-w-2xl', labelledBy, closeTheme = 'dark' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
        >
          <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className={`relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${maxWidth}`}
          >
            <button
              onClick={onClose}
              id="modal-close-btn"
              aria-label="Close"
              className={`absolute top-4 right-4 z-30 grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:rotate-90 hover:scale-105 shadow-md ${
                closeTheme === 'dark'
                  ? 'border-white/30 bg-ink-900/90 text-white hover:bg-white hover:text-ink-950 backdrop-blur-md ring-2 ring-white/20'
                  : 'border-ink-900/15 bg-white text-ink-900 hover:bg-ink-900 hover:text-white ring-2 ring-black/5'
              }`}
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
