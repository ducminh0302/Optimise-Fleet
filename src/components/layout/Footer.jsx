import { Anchor, Linkedin, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const footerLinks = {
  platform: {
    title: 'Platform',
    links: [
      { name: 'Voyage Optimization', href: '#' },
      { name: 'SMARTShip', href: '#' },
      { name: 'Emissions Analytics', href: '#' },
      { name: 'Bunker Procurement', href: '#' },
      { name: 'Vessel Reporting', href: '#' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'News', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Contact', href: '#' },
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Knowledge Hub', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Webinars', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'API', href: '#' },
    ]
  }
}

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-surface border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text">Astadeus</span>
            </a>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-sm">
              The all-in-one maritime intelligence platform. Optimize voyages, reduce emissions, 
              and make data-driven decisions across your entire fleet.
            </p>
            
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-text mb-3">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 bg-card border border-glass-border rounded-lg text-sm text-text placeholder:text-subtle focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2.5 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
              {subscribed && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent text-sm mt-2"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-card border border-glass-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold text-text mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-text transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-subtle">
            © {new Date().getFullYear()} Astadeus. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted hover:text-text transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted hover:text-text transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted hover:text-text transition-colors cursor-pointer">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
