import { motion } from 'framer-motion'

const companyLogos = [
  { name: 'Maersk', initials: 'MK' },
  { name: 'MSC', initials: 'MSC' },
  { name: 'CMA CGM', initials: 'CMA' },
  { name: 'Hapag-Lloyd', initials: 'HL' },
  { name: 'TeeKay', initials: 'TK' },
  { name: 'Euronav', initials: 'EN' },
]

export default function TrustBar() {
  return (
    <section className="py-16 border-y border-glass-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-muted text-sm uppercase tracking-wider">
            Trusted by 200+ commercial operators worldwide
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {companyLogos.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="group"
            >
              <div className="w-24 h-12 rounded-lg bg-card/50 border border-glass-border flex items-center justify-center text-muted group-hover:text-text group-hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <span className="font-bold text-lg tracking-wide">{company.initials}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
