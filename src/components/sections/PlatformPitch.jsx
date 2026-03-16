import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Navigation, Ship, BarChart3, Fuel, FileText, 
  Mail, DollarSign, FileCheck, ChevronRight
} from 'lucide-react'

const modules = [
  {
    id: 'voyage',
    name: 'Voyage Optimization',
    icon: Navigation,
    description: 'AI-powered route planning that evaluates 80M+ combinations to find the optimal balance of speed, fuel, and emissions.',
    features: ['Real-time weather updates', 'Fuel model predictions', 'ECDIS export', 'Multi-objective optimization']
  },
  {
    id: 'smartship',
    name: 'SMARTShip™',
    icon: Ship,
    description: 'Industrial IoT platform collecting 5,000+ data points from your vessels for real-time monitoring and predictive insights.',
    features: ['Real-time dashboards', 'Predictive maintenance', 'Automated alerts', 'Hull performance tracking']
  },
  {
    id: 'emissions',
    name: 'Emissions Analytics',
    icon: BarChart3,
    description: 'Comprehensive emissions tracking and compliance reporting for IMO CII, EU ETS, and FuelEU regulations.',
    features: ['CII rating forecasts', 'Audit-ready reports', 'Fleet benchmarking', 'Regulatory compliance']
  },
  {
    id: 'bunker',
    name: 'Bunker Procurement',
    icon: Fuel,
    description: 'Real-time pricing from 170+ ports with arbitrage opportunities and market momentum indicators.',
    features: ['Price forecasting', 'RSI/MACD indicators', 'Best buy alerts', 'Supplier management']
  },
  {
    id: 'reporting',
    name: 'Vessel Reporting',
    icon: FileText,
    description: 'Cloud-based reporting with 200+ validation points, offline support, and seamless data synchronization.',
    features: ['200+ validations', 'Offline capable', 'Multi-user access', 'Auto-population']
  },
  {
    id: 'charter',
    name: 'Charter Select',
    icon: Mail,
    description: 'ML-powered email extraction that automatically parses cargo and position information from communications.',
    features: ['Auto email parsing', 'Data extraction', 'API integration', 'Workflow automation']
  },
]

export default function PlatformPitch() {
  const [activeModule, setActiveModule] = useState(modules[0])

  return (
    <section id="platform" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            One Platform for <span className="gradient-text">All Your Decisions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            See how Astadeus empowers shipping companies to make smarter, faster decisions 
            across the fleet by combining big data, AI, and human expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="space-y-2">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    activeModule.id === module.id
                      ? 'bg-card border border-primary'
                      : 'bg-transparent border border-transparent hover:bg-card/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    activeModule.id === module.id
                      ? 'bg-primary/20'
                      : 'bg-surface'
                  }`}>
                    <module.icon className={`w-5 h-5 ${
                      activeModule.id === module.id ? 'text-primary' : 'text-muted'
                    }`} />
                  </div>
                  <span className={`font-medium ${
                    activeModule.id === module.id ? 'text-text' : 'text-muted'
                  }`}>
                    {module.name}
                  </span>
                  {activeModule.id === module.id && (
                    <ChevronRight className="w-4 h-4 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                    <activeModule.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-text">{activeModule.name}</h3>
                </div>

                <p className="text-muted text-lg mb-8 leading-relaxed">
                  {activeModule.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activeModule.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span className="text-text">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-glass-border flex items-center gap-4">
                  <button className="btn-primary text-sm">
                    Learn More
                  </button>
                  <button className="text-primary hover:text-primary-dark transition-colors text-sm font-medium cursor-pointer">
                    See Demo →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
