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
    'Your trusted partner for local, outstation, and airport cab bookings across 120+ locations in Pune and Maharashtra.',

  phone: '+91 93714 12111',
  phoneRaw: '+919371412111',
  whatsapp: '919371412111',
  email: 'hello@shivsaicarrental.com',
  supportEmail: 'support@shivsaicarrental.com',
  address: 'Shop No 1, Sinhgad Institute Rd, Campus, Vadgaon Budruk, Pune, Maharashtra 411041',
  mapLink: 'https://maps.google.com/?q=Shop+No+1+Sinhgad+Institute+Rd+Campus+Vadgaon+Budruk+Pune+Maharashtra+411041',
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
