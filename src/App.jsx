import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import PlatformPitch from './components/sections/PlatformPitch'
import VoyageOptimizer from './components/demos/VoyageOptimizer'
import FleetDashboard from './components/demos/FleetDashboard'
import EmissionAnalytics from './components/demos/EmissionAnalytics'
import BunkerPricer from './components/demos/BunkerPricer'
import SMARTShipMonitor from './components/demos/SMARTShipMonitor'
import FeaturesGrid from './components/sections/FeaturesGrid'
import Stats from './components/sections/Stats'
import Testimonials from './components/sections/Testimonials'
import CTASection from './components/sections/CTASection'

function App() {
  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-24">
        <Hero />
        <PlatformPitch />
        
        <VoyageOptimizer />
        <FleetDashboard />
        <EmissionAnalytics />
        <BunkerPricer />
        <SMARTShipMonitor />
        
        <FeaturesGrid />
        <Stats />
        <Testimonials />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
