import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, ArrowRight, Sparkles } from 'lucide-react'

const roles = [
  'Fleet Manager',
  'Operations Director',
  'Technical Superintendent',
  'Commercial Manager',
  'Sustainability Officer',
  'Other'
]

export default function CTASection() {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    role: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.company) {
      newErrors.company = 'Company name is required'
    }
    if (!formData.role) {
      newErrors.role = 'Please select your role'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({ email: '', company: '', role: '' })
    }, 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="py-24 bg-surface relative overflow-hidden w-full">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted">Start Your Journey</span>
          </div>
          
          <h2 className="section-title mb-4">
            Ready to <span className="gradient-text">Transform Your Fleet?</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Book a personalized demo and discover how Astadeus can optimize your maritime operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-10">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-2">Thank You!</h3>
                  <p className="text-muted">
                    We've received your request. Our team will contact you within 24 hours to schedule your demo.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2 text-left">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`w-full px-4 py-3 bg-card border rounded-xl text-text placeholder:text-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${
                          errors.email ? 'border-danger focus:border-danger focus:ring-danger' : 'border-glass-border'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-danger text-xs mt-1 text-left">{errors.email}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="company" className="block text-sm font-medium text-text mb-2 text-left">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your shipping company"
                        className={`w-full px-4 py-3 bg-card border rounded-xl text-text placeholder:text-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${
                          errors.company ? 'border-danger focus:border-danger focus:ring-danger' : 'border-glass-border'
                        }`}
                      />
                      {errors.company && (
                        <p className="text-danger text-xs mt-1 text-left">{errors.company}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="role" className="block text-sm font-medium text-text mb-2 text-left">
                      Your Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-card border rounded-xl text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer appearance-none ${
                        errors.role ? 'border-danger focus:border-danger focus:ring-danger' : 'border-glass-border'
                      } ${!formData.role ? 'text-subtle' : ''}`}
                    >
                      <option value="" disabled>Select your role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    {errors.role && (
                      <p className="text-danger text-xs mt-1 text-left">{errors.role}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-cta flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Book Your Demo
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted">
                    By submitting, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
