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
  'Akurdi', 'Aundh', 'Balewadi', 'Baner', 'Bavdhan', 'Bhosari', 'Bibwewadi', 'Camp', 'Chakan',
  'Chandan Nagar', 'Chinchwad', 'Deccan Gymkhana', 'Dhanori', 'Dighi', 'Hadapsar', 'Hinjewadi Phase 1',
  'Hinjewadi Phase 2', 'Hinjewadi Phase 3', 'Kalyani Nagar', 'Karve Nagar', 'Kasba Peth', 'Katraj',
  'Khadki', 'Kharadi', 'Kondhwa', 'Koregaon Park', 'Kothrud', 'Magarpatta City', 'Manjri', 'Marketyard',
  'Model Colony', 'Moshi', 'Nigdi', 'Pashan', 'Phursungi', 'Pimple Gurav', 'Pimple Nilakh',
  'Pimple Saudagar', 'Pimpri', 'Pune Airport', 'Pune Station', 'Ravet', 'Sadashiv Peth', 'Sahakar Nagar',
  'Salunke Vihar', 'Sangvi', 'Senapati Bapat Road', 'Shivajinagar', 'Sinhagad Road', 'Swargate',
  'Talawade', 'Tathawade', 'Thergaon', 'Undri', 'Vadgaon Budruk', 'Viman Nagar', 'Vishrantwadi', 'Wadgaon Sheri',
  'Wakad', 'Wagholi', 'Warje', 'Yerwada', 'Mumbai', 'Navi Mumbai', 'Thane', 'Lonavala', 'Mahabaleshwar',
  'Shirdi', 'Nashik', 'Alibaug', 'Goa', 'Kolhapur', 'Satara', 'Lavasa',
]

/* ─────────────── Stats ─────────────── */
export const STATS = [
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Google Rating', sub: 'Verified reviews' },
  { value: 99.4, decimals: 1, suffix: '%', label: 'On-Time Dispatch', sub: 'Guaranteed arrival' },
  { value: 18, suffix: '+', label: 'Verified Cars', sub: 'In pristine condition' },
  { value: 5, suffix: 'K+', label: 'Happy Rides', sub: 'And counting' },
]

/* ─────────────── Services ─────────────── */
export const SERVICES = [
  {
    icon: Clock,
    title: 'Local Pune Rentals',
    text: 'Hourly packages for city tours, shopping, and business in Pune.',
    tag: 'From ₹999',
    trip: 'local',
  },
  {
    icon: ArrowRight,
    title: 'One Way Drops',
    text: 'One-way drops from Pune to Mumbai, Nashik, Shirdi & more.',
    tag: 'Save 40%',
    trip: 'oneway',
  },
  {
    icon: Repeat,
    title: 'Round Trips',
    text: 'Multi-day outstation road trips with a dedicated driver from Pune.',
    tag: 'Multi-day',
    trip: 'round',
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    text: 'On-time 24x7 pickups & drops for Pune and Mumbai airports.',
    tag: '24 × 7',
    trip: 'airport',
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    text: 'Pune IT park business travel with monthly billing & GST invoices.',
    tag: 'B2B',
    trip: 'local',
  },
  {
    icon: Heart,
    title: 'Weddings & Events',
    text: 'Premium fleet coordination for your special celebrations.',
    tag: 'Premium',
    trip: 'local',
  },
]

/* ─────────────── Fleet ─────────────── */
export { FLEET, FLEET_FILTERS, FLEET_TERMS } from './fleetData'

/* ─────────────── Steps ─────────────── */
export const STEPS = [
  { icon: Search, title: 'Choose your trip', text: 'Select trip type, Pune location, and date.' },
  { icon: CarFront, title: 'Select vehicle', text: 'Pick from hatchbacks, sedans, or SUVs.' },
  { icon: BadgeCheck, title: 'Confirm booking', text: 'Send details to WhatsApp for instant booking.' },
  { icon: Smile, title: 'Enjoy the ride', text: 'Verified driver arrives on time. Relax and ride.' },
]

/* ─────────────── Pune Locations ─────────────── */
export const CITIES = [
  { name: 'Vadgaon Budruk', area: 'Sinhgad Rd / Hub', cars: 18, gradient: 'from-amber-500 via-orange-600 to-red-600' },
  { name: 'Hinjewadi', area: 'IT Park / West Pune', cars: 18, gradient: 'from-blue-600 via-indigo-600 to-violet-700' },
  { name: 'Baner', area: 'West Pune', cars: 15, gradient: 'from-emerald-500 via-teal-600 to-cyan-700' },
  { name: 'Wakad', area: 'PCMC / West Pune', cars: 16, gradient: 'from-orange-500 via-rose-500 to-fuchsia-600' },
  { name: 'Viman Nagar', area: 'Airport Zone', cars: 14, gradient: 'from-sky-500 via-blue-600 to-indigo-700' },
  { name: 'Koregaon Park', area: 'Central Pune', cars: 12, gradient: 'from-violet-500 via-purple-600 to-pink-600' },
  { name: 'Kothrud', area: 'West Pune', cars: 14, gradient: 'from-fuchsia-600 via-pink-600 to-rose-600' },
  { name: 'Kharadi', area: 'EON IT Park', cars: 15, gradient: 'from-teal-500 via-emerald-600 to-green-700' },
  { name: 'Hadapsar', area: 'Magarpatta City', cars: 16, gradient: 'from-pink-500 via-rose-500 to-orange-500' },
  { name: 'Shivajinagar', area: 'Central Pune', cars: 18, gradient: 'from-purple-600 via-indigo-600 to-blue-700' },
  { name: 'Pimpri-Chinchwad', area: 'PCMC Industrial', cars: 15, gradient: 'from-cyan-500 via-sky-600 to-blue-700' },
  { name: 'Aundh', area: 'West Pune', cars: 12, gradient: 'from-lime-600 via-emerald-600 to-teal-700' },
  { name: 'Kalyani Nagar', area: 'East Pune', cars: 14, gradient: 'from-rose-500 via-red-600 to-amber-600' },
]

/* ─────────────── Offers ─────────────── */
export const OFFERS = [
  { code: 'FIRST20', title: '20% off first ride', text: 'Instant discount on your first booking in Pune.', color: 'from-brand-400 to-flame-500' },
  { code: 'ONEWAY15', title: 'Flat 15% on One Way', text: 'Extra savings on Pune to Mumbai & outstation trips.', color: 'from-sky-400 to-indigo-600' },
  { code: 'AIRPORT99', title: '₹99 off Airport ride', text: 'Instant savings on all Pune airport transfers.', color: 'from-emerald-400 to-teal-600' },
  { code: 'WEEKEND', title: '₹750 off weekend trips', text: 'Special discount on weekend trips to Lonavala & Mahabaleshwar.', color: 'from-fuchsia-500 to-rose-600' },
]

/* ─────────────── Why us ─────────────── */
export const FEATURES = [
  { icon: ShieldCheck, title: 'Safety First', text: 'GPS tracked & sanitized vehicles.' },
  { icon: BadgeCheck, title: 'Verified Drivers', text: 'Background checked & courteous professionals.' },
  { icon: Wallet, title: 'Fixed Fares', text: 'All-inclusive rates with zero hidden charges.' },
  { icon: Headphones, title: '24 × 7 Support', text: 'Live call & WhatsApp support anytime.' },
  { icon: Sparkles, title: 'Clean Fleet', text: 'Fresh, spotless, and inspected cars.' },
  { icon: MapPin, title: 'All Pune & PCMC', text: 'Serving 120+ locations across Pune.' },
]

/* ─────────────── Routes ─────────────── */
export const ROUTE_TABS = [
  {
    id: 'oneway',
    label: 'One Way Drops',
    routes: [
      ['Pune', 'Mumbai Airport', 2399], ['Pune', 'Navi Mumbai', 1999], ['Pune', 'Thane', 2299], ['Pune', 'Lonavala', 1499],
      ['Pune', 'Mahabaleshwar', 2499], ['Pune', 'Shirdi', 2799], ['Pune', 'Nashik', 2999], ['Pune', 'Alibaug', 2899],
      ['Pune', 'Kolhapur', 3699], ['Pune', 'Satara', 1999], ['Pune', 'Goa', 7499], ['Pune', 'Solapur', 3999],
    ],
  },
  {
    id: 'round',
    label: 'Round Trips',
    routes: [
      ['Pune', 'Mahabaleshwar', 4999], ['Pune', 'Lonavala & Khandala', 2999], ['Pune', 'Shirdi & Shani Shingnapur', 5499], ['Pune', 'Goa Beach Tour', 14999],
      ['Pune', 'Alibaug Coastal', 5999], ['Pune', 'Nashik & Trimbakeshwar', 6499], ['Pune', 'Lavasa Hill City', 2499], ['Pune', 'Kolhapur & Panhala', 7999],
    ],
  },
  {
    id: 'airport',
    label: 'Airport Cabs',
    routes: [
      ['Pune Airport', 'Hinjewadi', 899], ['Pune Airport', 'Wakad', 849], ['Pune Airport', 'Kothrud', 699], ['Pune Airport', 'Baner', 749],
      ['Pune Airport', 'Magarpatta / Hadapsar', 599], ['Pune Airport', 'Pimpri-Chinchwad', 799], ['Mumbai Airport', 'Pune City', 2499], ['Mumbai Airport', 'Hinjewadi', 2399],
    ],
  },
]

/* ─────────────── Testimonials ─────────────── */
export const TESTIMONIALS = [
  { name: 'Ananya Sharma', role: 'Baner → Mumbai Airport', text: 'Booked a one-way cab to Mumbai Airport at the last minute and the driver arrived 10 minutes early. Spotless car and exact fare as quoted.', rating: 5 },
  { name: 'Rahul Verma', role: 'Hinjewadi Tech Park', text: 'We use Shivsai Car Rental for our company team travel and client airport pickups in Pune. Dedicated service and reliable drivers every single time.', rating: 5 },
  { name: 'Priya Nair', role: 'Pune Airport Transfer', text: 'My flight to Pune was delayed by 2 hours and the driver still waited at Lohegaon without any extra charge. Truly exceptional and reliable service.', rating: 5 },
  { name: 'Karan Mehta', role: 'Pune → Mahabaleshwar', text: 'A weekend family trip from Kothrud to Mahabaleshwar. The driver knew all the ghat routes thoroughly and car was in brand new condition!', rating: 5 },
  { name: 'Sneha Iyer', role: 'Local Pune Rental', text: 'The 8-hour package was perfect for my meetings from Viman Nagar to Hinjewadi. WhatsApp booking was instantaneous.', rating: 5 },
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
