import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [booking, setBooking] = useState(null) // null = closed, object = prefill data
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const openBooking = useCallback((prefill = {}) => setBooking({ ...prefill }), [])
  const closeBooking = useCallback(() => setBooking(null), [])
  const openEnquiry = useCallback(() => setEnquiryOpen(true), [])
  const closeEnquiry = useCallback(() => setEnquiryOpen(false), [])

  const toast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])

  // lock page scroll while a modal is open
  useEffect(() => {
    const locked = booking !== null || enquiryOpen
    document.body.style.overflow = locked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [booking, enquiryOpen])

  const value = useMemo(
    () => ({ booking, openBooking, closeBooking, enquiryOpen, openEnquiry, closeEnquiry, toasts, toast }),
    [booking, openBooking, closeBooking, enquiryOpen, openEnquiry, closeEnquiry, toasts, toast],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => useContext(UIContext)
