import { motion } from 'framer-motion'
import { 
  Navigation, Ship, BarChart3, Fuel, FileText, 
  Mail, DollarSign, FileCheck, ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Navigation,
    name: 'Quantum Voyage AI',
    description: 'AI-powered route planning evaluating 80M+ combinations for optimal fuel, emissions, and timing.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Ship,
    name: 'NeuroShip Sentinel',
    description: 'Industrial IoT platform with 5,000+ real-time data points and predictive maintenance.',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    icon: BarChart3,
    name: 'HullMatrix Insights',
    description: 'Monitor hull performance, fuel efficiency, and system-level vessel insights.',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: Fuel,
    name: 'EcoMetrics Ledger',
    description: 'Comprehensive tracking and compliance reporting for CII, EU ETS, and FuelEU.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FileText,
    name: 'BridgeSync Cloud',
    description: 'Cloud-based reporting with 200+ validation points and offline support.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Mail,
    name: 'TradeBridge ML',
    description: 'ML-powered email parsing for automatic cargo and position extraction.',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: DollarSign,
    name: 'BunkerOracle Hub',
    description: 'Real-time pricing from 170+ ports with arbitrage and market indicators.',
    color: 'from-orange-500 to-amber-500'
  },
  {
    icon: FileCheck,
    name: 'HyperLedger eBDN',
    description: 'Digital Bunker Delivery Notes with secure, tamper-proof documentation.',
    color: 'from-rose-500 to-pink-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Complete <span className="gradient-text">Maritime Suite</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Everything you need to optimize operations, reduce costs, and stay compliant — 
            all in one integrated platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={itemVariants}
              className="group card p-8 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors tracking-tight">
                {feature.name}
              </h3>
              
              <p className="text-base text-muted leading-relaxed mb-6 flex-grow">
                {feature.description}
              </p>
              
              <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
