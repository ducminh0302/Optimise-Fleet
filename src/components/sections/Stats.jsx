import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { 
    value: 80, 
    suffix: 'M+', 
    label: 'Route Combinations Evaluated',
    description: 'Per voyage optimization'
  },
  { 
    value: 5000, 
    suffix: '+', 
    label: 'Real-time Data Points',
    description: 'From each vessel'
  },
  { 
    value: 170, 
    suffix: '+', 
    label: 'Global Ports',
    description: 'With bunker pricing'
  },
  { 
    value: 10, 
    suffix: '%', 
    prefix: '5-',
    label: 'Fuel Savings',
    description: 'Average reduction'
  }
]

function AnimatedCounter({ value, prefix = '', suffix = '', inView }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

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
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Proven <span className="gradient-text">Results</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Industry-leading platform trusted by commercial operators worldwide.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-8 text-center relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="text-5xl md:text-6xl font-extrabold gradient-text mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                <AnimatedCounter 
                  value={stat.value} 
                  prefix={stat.prefix}
                  suffix={stat.suffix} 
                  inView={inView}
                />
              </div>
              <div className="text-xl font-bold text-text mb-2">
                {stat.label}
              </div>
              <div className="text-base text-muted">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
