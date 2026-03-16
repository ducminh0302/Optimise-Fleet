import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Navigation, Ship, BarChart3, Fuel, FileText, 
  Mail, DollarSign, FileCheck, ChevronRight
} from 'lucide-react'

const modules = [
  {
    id: 'voyage',
    name: 'Quantum Voyage AI',
    icon: Navigation,
    description: 'AI-powered route planning that evaluates 80M+ combinations to find the optimal balance of speed, fuel, and emissions.',
    features: ['Real-time weather updates', 'Fuel model predictions', 'ECDIS export', 'Multi-objective optimization']
  },
  {
    id: 'smartship',
    name: 'NeuroShip Sentinel',
    icon: Ship,
    description: 'Industrial IoT platform collecting 5,000+ data points from your vessels for real-time monitoring and predictive insights.',
    features: ['Real-time dashboards', 'Predictive maintenance', 'Automated alerts', 'Hull performance tracking']
  },
  {
    id: 'emissions',
    name: 'EcoMetrics Ledger',
    icon: BarChart3,
    description: 'Comprehensive emissions tracking and compliance reporting for IMO CII, EU ETS, and FuelEU regulations.',
    features: ['CII rating forecasts', 'Audit-ready reports', 'Fleet benchmarking', 'Regulatory compliance']
  },
  {
    id: 'bunker',
    name: 'BunkerOracle Hub',
    icon: Fuel,
    description: 'Real-time pricing from 170+ ports with arbitrage opportunities and market momentum indicators.',
    features: ['Price forecasting', 'RSI/MACD indicators', 'Best buy alerts', 'Supplier management']
  },
  {
    id: 'reporting',
    name: 'BridgeSync Cloud',
    icon: FileText,
    description: 'Cloud-based reporting with 200+ validation points, offline support, and seamless data synchronization.',
    features: ['200+ validations', 'Offline capable', 'Multi-user access', 'Auto-population']
  },
  {
    id: 'charter',
    name: 'TradeBridge ML',
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
            className="lg:col-span-1 flex flex-col justify-center"
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
                  <span className={`font-semibold text-lg transition-colors ${
                    activeModule.id === module.id ? 'text-primary' : 'text-muted group-hover:text-text'
                  }`}>
                    {module.name}
                  </span>
                  <ChevronRight className={`w-5 h-5 ml-auto transition-all ${
                    activeModule.id === module.id ? 'text-primary opacity-100 translate-x-0' : 'text-muted opacity-0 -translate-x-2'
                  }`} />
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
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                    <activeModule.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-text tracking-tight">{activeModule.name}</h3>
                </div>

                <p className="text-muted text-lg mb-10 leading-relaxed max-w-2xl">
                  {activeModule.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activeModule.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="flex items-center gap-4 bg-surface/30 p-4 rounded-xl border border-glass-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      <span className="text-text font-medium">{feature}</span>
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
