import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingActions from './components/layout/FloatingActions'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Services from './components/sections/Services'
import Fleet from './components/sections/Fleet'
import HowItWorks from './components/sections/HowItWorks'
import Cities from './components/sections/Cities'
import Offers from './components/sections/Offers'
import WhyUs from './components/sections/WhyUs'
import PopularRoutes from './components/sections/PopularRoutes'
import Testimonials from './components/sections/Testimonials'
import FAQ from './components/sections/FAQ'
import CTA from './components/sections/CTA'
import BookingModal from './components/booking/BookingModal'
import EnquiryModal from './components/booking/EnquiryModal'
import { UIProvider } from './context/UIContext'

export default function App() {
  return (
    <UIProvider>
      <div className="relative min-h-screen bg-white text-ink-900 selection:bg-brand-400 selection:text-ink-950">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <Stats />
          <Services />
          <Fleet />
          <HowItWorks />
          <Cities />
          <PopularRoutes />
          <WhyUs />
          <Offers />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Controls: WhatsApp, Quick Enquiry, Back to top */}
        <FloatingActions />

        {/* Interactive Modals */}
        <BookingModal />
        <EnquiryModal />
      </div>
    </UIProvider>
  )
}
