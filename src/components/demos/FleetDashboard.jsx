import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Ship, Anchor, Fuel, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { generateFuelTimeSeries, generateFleetVessels, generateFleetStats } from '../../lib/simulation'

const statusColors = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger'
}

function StatCard({ icon: Icon, label, value, suffix, trend, trendUp }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl p-4 border border-glass-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-success' : 'text-danger'}`}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-text">
        {value}
        {suffix && <span className="text-sm font-normal text-muted ml-1">{suffix}</span>}
      </div>
      <div className="text-sm text-muted">{label}</div>
    </motion.div>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-glass-border rounded-lg p-3 shadow-xl">
        <p className="text-xs text-muted mb-1">{label}</p>
        <p className="text-sm font-semibold text-text">
          {payload[0].value.toFixed(1)} MT/h
        </p>
      </div>
    )
  }
  return null
}

export default function FleetDashboard() {
  const [fuelData, setFuelData] = useState(() => generateFuelTimeSeries(24))
  const [stats, setStats] = useState(() => generateFleetStats())
  const vessels = useMemo(() => generateFleetVessels(6), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFuelData(prev => {
        const newData = [...prev.slice(1)]
        const lastValue = prev[prev.length - 1].value
        const newValue = Math.max(35, Math.min(70, lastValue + (Math.random() - 0.5) * 6))
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          value: parseFloat(newValue.toFixed(1)),
          baseline: 50
        })
        return newData
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Ship className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted">Interactive Demo</span>
          </div>
          <h2 className="section-title mb-4">Fleet Dashboard</h2>
          <p className="section-subtitle mx-auto">
            Real-time fleet monitoring with live data updates every 3 seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Ship}
            label="Vessels at Sea"
            value={stats.atSea}
            trend="+3 today"
            trendUp={true}
          />
          <StatCard
            icon={Anchor}
            label="In Port"
            value={stats.inPort}
            trend="-2 today"
            trendUp={false}
          />
          <StatCard
            icon={Fuel}
            label="Fuel Saved Today"
            value={stats.fuelSavedToday}
            suffix="MT"
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            icon={AlertTriangle}
            label="Active Alerts"
            value={stats.activeAlerts}
            trend="-5 resolved"
            trendUp={true}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text">Fleet Fuel Consumption</h3>
                  <p className="text-sm text-muted">Real-time aggregate (MT/h)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted">Live</span>
                </div>
              </div>
              
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fuelData}>
                    <defs>
                      <linearGradient id="fuelGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#4A6785" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis 
                      stroke="#4A6785" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      domain={[30, 75]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="#4A6785"
                      strokeDasharray="5 5"
                      fill="none"
                      strokeWidth={1}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0EA5E9"
                      fillOpacity={1}
                      fill="url(#fuelGradient)"
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-primary rounded" />
                  <span>Actual Consumption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 border-t border-dashed border-subtle" />
                  <span>Baseline (50 MT/h)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl p-6 h-full">
              <h3 className="text-lg font-semibold text-text mb-4">Vessel Status</h3>
              
              <div className="space-y-3">
                {vessels.map((vessel, index) => (
                  <motion.div
                    key={vessel.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg"
                  >
                    <div className={`w-2 h-2 rounded-full ${statusColors[vessel.statusColor]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text truncate">
                        {vessel.name}
                      </div>
                      <div className="text-xs text-muted">
                        {vessel.status} • {vessel.speed} kn
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted">Efficiency</div>
                      <div className={`text-sm font-medium ${
                        vessel.fuelEfficiency >= 100 ? 'text-success' : 
                        vessel.fuelEfficiency >= 90 ? 'text-warning' : 'text-danger'
                      }`}>
                        {vessel.fuelEfficiency}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
