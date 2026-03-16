import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Ship, Fuel, Leaf, ArrowRight, Play } from 'lucide-react'

const metrics = [
  { icon: Ship, label: 'Vessels Optimized', value: 2847, suffix: '+' },
  { icon: Fuel, label: 'MT Fuel Saved', value: 1.2, suffix: 'M', decimals: 1 },
  { icon: Leaf, label: 'Tons CO₂ Avoided', value: 3.8, suffix: 'M', decimals: 1 },
]

function AnimatedCounter({ value, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-gradient" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] animate-gradient" style={{ animationDelay: '-4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
        </div>
        
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 163, 193, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted">AI-Powered Maritime Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-text">Make Maritime</span>
            <br />
            <span className="gradient-text glow-text">Intelligent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
          >
            Optimize voyages, reduce emissions, and maximize fleet efficiency with 
            our all-in-one platform powered by AI and real-time IoT data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button className="btn-cta flex items-center gap-2 text-base px-8 py-4">
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-outline flex items-center gap-2 text-base px-8 py-4">
              <Play className="w-5 h-5" />
              Watch Video
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shrink-0">
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold text-text">
                      <AnimatedCounter 
                        value={metric.value} 
                        suffix={metric.suffix} 
                        decimals={metric.decimals || 0}
                      />
                    </div>
                    <div className="text-sm text-muted">{metric.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
