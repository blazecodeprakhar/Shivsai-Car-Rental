/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS DETAILS - Shivsai Car Rental
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'Shivsai Car Rental',
  nameStart: 'Shivsai ',
  nameEnd: 'Car Rental',
  tagline: 'Rent. Ride. Relax.',
  description:
    'Your trusted partner for local, outstation, and airport cab bookings across India.',

  phone: '+91 93714 12111',
  phoneRaw: '+919371412111',
  whatsapp: '919371412111',
  email: 'hello@shivsaicarrental.com',
  supportEmail: 'support@shivsaicarrental.com',
  address: 'Skyline Business Park, MG Road, Bengaluru, Karnataka 560001',
  mapLink: 'https://maps.google.com/?q=MG+Road+Bengaluru',
  hours: 'Open 24 × 7 | all days',

  socials: {
    facebook: '#',
    instagram: '#',
    x: '#',
    youtube: '#',
    linkedin: '#',
  },
  appLinks: {
    playStore: '#',
    appStore: '#',
  },
  partnerLink: '#',
}

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
