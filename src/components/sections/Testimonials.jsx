import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: "Astadeus has transformed how we manage our fleet. The AI-powered optimization has reduced our fuel consumption by 8% in just six months.",
    author: "Marcus Hansen",
    role: "Fleet Director",
    company: "Nordic Shipping Lines"
  },
  {
    quote: "The real-time IoT monitoring gives us unprecedented visibility into vessel performance. We've prevented three major equipment failures using predictive alerts.",
    author: "Sarah Chen",
    role: "Operations Manager",
    company: "Pacific Marine Services"
  },
  {
    quote: "Compliance reporting used to take days. With Astadeus, our CII and EU ETS reports are generated automatically and ready for audit within hours.",
    author: "Thomas Mueller",
    role: "Sustainability Officer",
    company: "European Cargo Group"
  },
  {
    quote: "The bunker procurement module alone has saved us $2.3M this year through better price timing and arbitrage opportunities.",
    author: "James Rodriguez",
    role: "Procurement Director",
    company: "Global Tanker Fleet"
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPaused])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-background w-full">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Hear from maritime professionals who have transformed their operations with Astadeus.
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="glass rounded-2xl p-8 md:p-16 min-h-[360px] flex items-center justify-center relative shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center w-full px-12 md:px-24 relative z-10"
              >
                <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
                
                <blockquote className="text-2xl md:text-3xl lg:text-4xl text-text leading-[1.6] mb-10 max-w-4xl mx-auto font-medium">
                  "{testimonials[current].quote}"
                </blockquote>
                
                <div>
                  <div className="text-lg font-semibold text-text">
                    {testimonials[current].author}
                  </div>
                  <div className="text-muted">
                    {testimonials[current].role}, {testimonials[current].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-glass-border flex items-center justify-center text-muted hover:text-text hover:border-primary transition-all cursor-pointer z-20 hover:scale-110 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card border border-glass-border flex items-center justify-center text-muted hover:text-text hover:border-primary transition-all cursor-pointer z-20 hover:scale-110 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === current 
                  ? 'bg-primary w-6' 
                  : 'bg-subtle hover:bg-muted'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
