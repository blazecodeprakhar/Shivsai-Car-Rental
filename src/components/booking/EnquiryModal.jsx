import { User, Phone, Mail, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'
import Modal from '../ui/Modal'
import { Field } from './Fields'
import { useUI } from '../../context/UIContext'
import { site, whatsappLink } from '../../data/site'

export default function EnquiryModal() {
  const { enquiryOpen, closeEnquiry } = useUI()
  return (
    <Modal open={enquiryOpen} onClose={closeEnquiry} labelledBy="enquiry-title" maxWidth="max-w-lg">
      <EnquiryForm />
    </Modal>
  )
}

function EnquiryForm() {
  const { closeEnquiry, toast } = useUI()
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit number'
    setErrors(errs)
    if (Object.keys(errs).length) return
    const text = [
      `*Enquiry - ${site.name}*`,
      `───────────────────────`,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* +91 ${form.phone}`,
      form.email && `✉️ *Email:* ${form.email}`,
      form.message && `💬 *Message:* ${form.message}`,
    ].filter(Boolean).join('\n')
    window.open(whatsappLink(text), '_blank')
    toast('Redirecting to WhatsApp...')
    closeEnquiry()
  }

  return (
    <div className="p-6 sm:p-8">
      <span className="eyebrow">We reply in minutes</span>
      <h2 id="enquiry-title" className="mt-3 text-2xl font-bold text-ink-900 sm:text-3xl">Send us an enquiry</h2>
      <p className="mt-1 text-sm text-ink-900/55">Corporate travel, bulk bookings or anything else, just ask.</p>
      <form onSubmit={submit} className="mt-6 space-y-3" noValidate>
        <Field label="Name" icon={User} error={errors.name}>
          <input id="enq-name" className="field-input" placeholder="Your name" value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Mobile" icon={Phone} error={errors.phone}>
          <input id="enq-phone" className="field-input" inputMode="numeric" maxLength={10} placeholder="10-digit mobile" value={form.phone} onChange={(e) => set('phone')({ target: { value: e.target.value.replace(/\D/g, '') } })} />
        </Field>
        <Field label="Email (optional)" icon={Mail}>
          <input id="enq-email" type="email" className="field-input" placeholder="you@email.com" value={form.email} onChange={set('email')} />
        </Field>
        <Field label="Message" icon={MessageSquare}>
          <textarea id="enq-message" rows={3} className="field-input resize-none" placeholder="Tell us about your travel plan" value={form.message} onChange={set('message')} />
        </Field>
        <button type="submit" id="enq-submit" className="btn btn-primary w-full py-3.5">
          Send Enquiry <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
