import {
  Clock,
  ArrowRight,
  Repeat,
  Mountain,
  Plane,
  Briefcase,
  Heart,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Wallet,
  Sparkles,
  MapPin,
  Search,
  CarFront,
  Smile,
} from 'lucide-react'

/* ─────────────── Navigation ─────────────── */
export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'fleet', label: 'Fleet' },
  { id: 'routes', label: 'Routes' },
  { id: 'offers', label: 'Offers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

/* ─────────────── Booking trip types ─────────────── */
export const TRIP_TYPES = [
  { id: 'local', label: 'Local Rental', short: 'Rentals', icon: Clock },
  { id: 'oneway', label: 'One Way', short: 'One Way', icon: ArrowRight },
  { id: 'round', label: 'Round Trip', short: 'Round Trip', icon: Repeat },
  { id: 'road', label: 'Road Trip', short: 'Road Trip', icon: Mountain },
  { id: 'airport', label: 'Airport Transfer', short: 'Airport', icon: Plane },
]

export const LOCAL_PACKAGES = ['4 Hrs / 40 Km', '6 Hrs / 60 Km', '8 Hrs / 80 Km', '10 Hrs / 100 Km', '12 Hrs / 120 Km']

export const CITIES_LIST = [
  'Agra', 'Ahmedabad', 'Amritsar', 'Bengaluru', 'Bhopal', 'Chandigarh', 'Chennai', 'Coimbatore',
  'Dehradun', 'Delhi', 'Goa', 'Gurugram', 'Haridwar', 'Hyderabad', 'Indore', 'Jaipur', 'Jodhpur',
  'Kochi', 'Kolkata', 'Lucknow', 'Manali', 'Mumbai', 'Mysuru', 'Noida', 'Ooty', 'Pune', 'Rishikesh',
  'Shimla', 'Udaipur', 'Varanasi',
]

/* ─────────────── Stats ─────────────── */
export const STATS = [
  { value: 4.8, decimals: 1, suffix: '/5', label: 'Google Rating', sub: '12k+ reviews' },
  { value: 4.7, decimals: 1, suffix: '/5', label: 'Play Store', sub: '50k+ downloads' },
  { value: 120, suffix: '+', label: 'Cities Covered', sub: 'Across India' },
  { value: 1, suffix: 'M+', label: 'Happy Rides', sub: 'And counting' },
]

/* ─────────────── Services ─────────────── */
export const SERVICES = [
  {
    icon: Clock,
    title: 'Local Rentals',
    text: 'Hourly packages for city tours, shopping, and meetings.',
    tag: 'From ₹999',
    trip: 'local',
  },
  {
    icon: ArrowRight,
    title: 'One Way Drops',
    text: 'Inter-city drops. Pay only for one side.',
    tag: 'Save 40%',
    trip: 'oneway',
  },
  {
    icon: Repeat,
    title: 'Round Trips',
    text: 'Multi-day outstation trips with a dedicated driver.',
    tag: 'Multi-day',
    trip: 'round',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    text: 'On-time 24x7 pickups & drops with flight tracking.',
    tag: '24 × 7',
    trip: 'airport',
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    text: 'Business travel with monthly billing & GST invoices.',
    tag: 'B2B',
    trip: 'local',
  },
  {
    icon: Heart,
    title: 'Weddings & Events',
    text: 'Premium fleet coordination for your special day.',
    tag: 'Premium',
    trip: 'local',
  },
]

/* ─────────────── Fleet ─────────────── */
export { FLEET, FLEET_FILTERS, FLEET_TERMS } from './fleetData'

/* ─────────────── Steps ─────────────── */
export const STEPS = [
  { icon: Search, title: 'Choose your trip', text: 'Select trip type, city, and date.' },
  { icon: CarFront, title: 'Select vehicle', text: 'Pick from hatchbacks, sedans, or SUVs.' },
  { icon: BadgeCheck, title: 'Confirm booking', text: 'Send details to WhatsApp for instant booking.' },
  { icon: Smile, title: 'Enjoy the ride', text: 'Verified driver arrives on time. Relax and ride.' },
]

/* ─────────────── Cities ─────────────── */
export const CITIES = [
  { name: 'Delhi NCR', state: 'Delhi', cars: 320, from: 11, gradient: 'from-orange-500 via-rose-500 to-fuchsia-600' },
  { name: 'Mumbai', state: 'Maharashtra', cars: 280, from: 12, gradient: 'from-sky-500 via-blue-600 to-indigo-700' },
  { name: 'Bengaluru', state: 'Karnataka', cars: 260, from: 11, gradient: 'from-emerald-500 via-teal-600 to-cyan-700' },
  { name: 'Jaipur', state: 'Rajasthan', cars: 140, from: 10, gradient: 'from-pink-500 via-rose-500 to-orange-500' },
  { name: 'Hyderabad', state: 'Telangana', cars: 190, from: 11, gradient: 'from-violet-500 via-purple-600 to-indigo-700' },
  { name: 'Goa', state: 'Goa', cars: 110, from: 12, gradient: 'from-amber-400 via-orange-500 to-red-500' },
  { name: 'Chennai', state: 'Tamil Nadu', cars: 170, from: 11, gradient: 'from-cyan-500 via-sky-600 to-blue-700' },
  { name: 'Kolkata', state: 'West Bengal', cars: 150, from: 10, gradient: 'from-lime-500 via-emerald-600 to-teal-700' },
]

/* ─────────────── Offers ─────────────── */
export const OFFERS = [
  { code: 'FIRST20', title: '20% off first ride', text: 'Instant discount on your first booking.', color: 'from-brand-400 to-flame-500' },
  { code: 'ONEWAY15', title: 'Flat 15% on One Way', text: 'Extra savings on outstation one-way trips.', color: 'from-sky-400 to-indigo-600' },
  { code: 'AIRPORT99', title: '₹99 off Airport ride', text: 'Instant savings on all airport transfers.', color: 'from-emerald-400 to-teal-600' },
  { code: 'WEEKEND', title: '₹750 off weekend trips', text: 'Special discount on weekend round trips.', color: 'from-fuchsia-500 to-rose-600' },
]

/* ─────────────── Why us ─────────────── */
export const FEATURES = [
  { icon: ShieldCheck, title: 'Safety First', text: 'GPS tracked & sanitized vehicles.' },
  { icon: BadgeCheck, title: 'Verified Drivers', text: 'Background checked & courteous professionals.' },
  { icon: Wallet, title: 'Fixed Fares', text: 'All-inclusive rates with zero hidden charges.' },
  { icon: Headphones, title: '24 × 7 Support', text: 'Live call & WhatsApp support anytime.' },
  { icon: Sparkles, title: 'Clean Fleet', text: 'Fresh, spotless, and inspected cars.' },
  { icon: MapPin, title: 'Pan-India', text: 'Available across 120+ cities.' },
]

/* ─────────────── Routes ─────────────── */
export const ROUTE_TABS = [
  {
    id: 'oneway',
    label: 'One Way',
    routes: [
      ['Delhi', 'Agra', 2499], ['Delhi', 'Jaipur', 3299], ['Mumbai', 'Pune', 2199], ['Bengaluru', 'Mysuru', 2299],
      ['Chennai', 'Pondicherry', 2599], ['Delhi', 'Chandigarh', 3499], ['Hyderabad', 'Vijayawada', 3999], ['Jaipur', 'Udaipur', 4499],
      ['Delhi', 'Dehradun', 3899], ['Bengaluru', 'Coorg', 3999], ['Mumbai', 'Nashik', 2899], ['Lucknow', 'Varanasi', 3799],
    ],
  },
  {
    id: 'round',
    label: 'Round Trip',
    routes: [
      ['Delhi', 'Manali', 14999], ['Delhi', 'Shimla', 9999], ['Bengaluru', 'Ooty', 8999], ['Mumbai', 'Goa', 15999],
      ['Delhi', 'Rishikesh', 7499], ['Chennai', 'Kodaikanal', 10999], ['Jaipur', 'Jodhpur', 8499], ['Pune', 'Mahabaleshwar', 5999],
    ],
  },
  {
    id: 'airport',
    label: 'Airport',
    routes: [
      ['Delhi Airport', 'Gurugram', 899], ['Delhi Airport', 'Noida', 1099], ['Mumbai Airport', 'Navi Mumbai', 999], ['Bengaluru Airport', 'Whitefield', 1199],
      ['Hyderabad Airport', 'HITEC City', 1099], ['Chennai Airport', 'OMR', 999], ['Pune Airport', 'Hinjewadi', 899], ['Goa Airport', 'Calangute', 1499],
    ],
  },
]

/* ─────────────── Testimonials ─────────────── */
export const TESTIMONIALS = [
  { name: 'Ananya Sharma', role: 'Delhi → Jaipur', text: 'Booked a one-way cab at the last minute and the driver arrived 10 minutes early. Car was spotless and the fare was exactly what was quoted.', rating: 5 },
  { name: 'Rahul Verma', role: 'Corporate client', text: 'We moved our entire team travel to them. Monthly invoicing and a dedicated manager make life so much easier.', rating: 5 },
  { name: 'Priya Nair', role: 'Airport transfer', text: 'My flight was delayed by 2 hours and the driver still waited without any extra charge. Truly reliable service.', rating: 5 },
  { name: 'Karan Mehta', role: 'Mumbai → Goa', text: 'A week-long road trip with a super friendly driver who knew all the best places. Will definitely book again!', rating: 4 },
  { name: 'Sneha Iyer', role: 'Local rental', text: 'The 8 hour package was perfect for my shopping and meetings day. WhatsApp booking took less than a minute.', rating: 5 },
]

/* ─────────────── FAQ ─────────────── */
export const FAQS = [
  { q: 'How do I book a car?', a: 'Choose your trip, enter details, and tap WhatsApp to confirm instantly.' },
  { q: 'Are tolls and taxes included?', a: 'One-way fares are all-inclusive. Round trip tolls and parking follow actual toll receipts.' },
  { q: 'Can I cancel or reschedule my ride?', a: 'Free cancellation up to 6 hours before pickup. Reschedule anytime.' },
  { q: 'What payment methods do you accept?', a: 'UPI, credit/debit cards, net banking, or cash upon trip completion.' },
  { q: 'Are your drivers verified?', a: 'Yes, all drivers undergo police background checks and identity verification.' },
  { q: 'Do you provide self-drive cars?', a: 'We provide chauffeur-driven cabs only for a comfortable, stress-free journey.' },
]

/* ─────────────── Marquee ─────────────── */
export const MARQUEE_ITEMS = ['Local Rentals', 'One Way Drops', 'Round Trips', 'Airport Transfers', 'Corporate Travel', 'Wedding Cars', 'Road Trips', '24 × 7 Support']
