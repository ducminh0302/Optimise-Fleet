import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Anchor, ChevronDown } from 'lucide-react'

const navLinks = [
  { name: 'Platform', href: '#platform' },
  { name: 'Features', href: '#features' },
  { name: 'Demos', href: '#demos' },
  { name: 'About', href: '#about' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-4 left-4 right-4 z-[100] rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'glass shadow-lg shadow-black/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-text">HullQ</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted hover:text-text transition-colors duration-200 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="#contact" className="text-muted hover:text-text transition-colors duration-200 text-sm font-medium">
                Contact
              </a>
              <button className="btn-cta text-sm px-5 py-2.5">
                Book a Demo
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted hover:text-text transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-[90] glass rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted hover:text-text transition-colors duration-200 text-base font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-glass-border" />
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted hover:text-text transition-colors duration-200 text-base font-medium py-2"
              >
                Contact
              </a>
              <button className="btn-cta w-full mt-2">
                Book a Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
