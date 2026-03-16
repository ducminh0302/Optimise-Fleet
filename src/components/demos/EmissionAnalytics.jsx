import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { BarChart3, Leaf, FileCheck, Globe } from 'lucide-react'
import { generateFleetVessels, generateEmissionsData } from '../../lib/simulation'

const ciiColors = {
  A: '#22C55E',
  B: '#84CC16',
  C: '#F59E0B',
  D: '#F97316',
  E: '#EF4444'
}

const regulations = [
  { id: 'cii', name: 'IMO CII', icon: Globe, description: 'Carbon Intensity Indicator' },
  { id: 'ets', name: 'EU ETS', icon: Leaf, description: 'Emissions Trading System' },
  { id: 'fueleu', name: 'FuelEU', icon: FileCheck, description: 'Maritime Fuel Regulation' }
]

function CIIBadge({ rating }) {
  return (
    <span 
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold text-white"
      style={{ backgroundColor: ciiColors[rating] }}
    >
      {rating}
    </span>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-glass-border rounded-lg p-3 shadow-xl">
        <p className="text-xs text-muted mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} tons
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function EmissionAnalytics() {
  const [activeRegulation, setActiveRegulation] = useState('cii')
  const [selectedVessel, setSelectedVessel] = useState(null)
  
  const vessels = useMemo(() => generateFleetVessels(8), [])
  const emissionsData = useMemo(() => generateEmissionsData(vessels), [vessels])
  
  const selectedEmissions = selectedVessel 
    ? emissionsData.find(e => e.vessel === selectedVessel)?.data 
    : emissionsData[0]?.data

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted">Interactive Demo</span>
          </div>
          <h2 className="section-title mb-4">EcoMetrics Ledger</h2>
          <p className="section-subtitle mx-auto">
            Track CII ratings, monitor compliance, and analyze CO₂ emissions across your fleet.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {regulations.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegulation(reg.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                activeRegulation === reg.id
                  ? 'bg-primary text-white'
                  : 'glass text-muted hover:text-text'
              }`}
            >
              <reg.icon className="w-4 h-4" />
              <span className="font-medium">{reg.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Fleet CII Ratings</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted border-b border-glass-border">
                      <th className="pb-3 font-medium">Vessel</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium text-center">CII</th>
                      <th className="pb-3 font-medium text-right">CO₂ Today</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vessels.map((vessel, index) => (
                      <motion.tr
                        key={vessel.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        onClick={() => setSelectedVessel(vessel.name)}
                        className={`border-b border-glass-border/50 cursor-pointer transition-colors ${
                          selectedVessel === vessel.name 
                            ? 'bg-primary/10' 
                            : 'hover:bg-card/50'
                        }`}
                      >
                        <td className="py-3">
                          <div className="font-medium text-text text-sm">{vessel.name}</div>
                        </td>
                        <td className="py-3 text-sm text-muted">{vessel.type}</td>
                        <td className="py-3 text-center">
                          <CIIBadge rating={vessel.cii} />
                        </td>
                        <td className="py-3 text-right text-sm text-text">
                          {vessel.co2Today} tons
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-glass-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">CII Rating Legend:</span>
                  <div className="flex gap-2">
                    {Object.entries(ciiColors).map(([rating, color]) => (
                      <div key={rating} className="flex items-center gap-1">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-muted">{rating}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text">Monthly CO₂ Emissions</h3>
                  <p className="text-sm text-muted">
                    {selectedVessel || emissionsData[0]?.vessel || 'Select a vessel'}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeRegulation}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-medium"
                  >
                    {regulations.find(r => r.id === activeRegulation)?.name}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedEmissions} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#4A6785" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#4A6785" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine 
                      y={1500} 
                      stroke="#F59E0B" 
                      strokeDasharray="5 5"
                      label={{ value: 'Target', position: 'right', fill: '#F59E0B', fontSize: 10 }}
                    />
                    <Bar 
                      dataKey="co2" 
                      name="CO₂ Emissions"
                      fill="#0EA5E9" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-card rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-text">
                    {selectedEmissions?.reduce((sum, d) => sum + d.co2, 0).toLocaleString() || 0}
                  </div>
                  <div className="text-xs text-muted">Total (6mo)</div>
                </div>
                <div className="bg-card rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-accent">-12%</div>
                  <div className="text-xs text-muted">vs Last Year</div>
                </div>
                <div className="bg-card rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-success">On Track</div>
                  <div className="text-xs text-muted">2026 Target</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
