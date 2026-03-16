import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import { 
  Ship, AlertTriangle, AlertCircle, Info, Bell, 
  Gauge, Droplets, Navigation, Shield, Zap
} from 'lucide-react'
import { generateSMARTShipMetrics, generateAlerts, generateCriticalAlert } from '../../lib/simulation'

const alertIcons = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertCircle
}

const alertColors = {
  info: 'text-primary border-primary/30 bg-primary/10',
  warning: 'text-warning border-warning/30 bg-warning/10',
  critical: 'text-danger border-danger/30 bg-danger/10'
}

function GaugeCard({ metric, color }) {
  const percentage = (metric.value / metric.max) * 100
  const gaugeData = [{ value: percentage, fill: color }]
  
  return (
    <div className="bg-card rounded-xl p-4 border border-glass-border">
      <div className="h-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={10}
            data={gaugeData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background={{ fill: '#112844' }}
              dataKey="value"
              cornerRadius={5}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text">{metric.value}</span>
          <span className="text-xs text-muted">{metric.unit}</span>
        </div>
      </div>
      <div className="text-center mt-2">
        <div className="text-sm font-medium text-text">{metric.label}</div>
        {metric.status === 'warning' && (
          <span className="text-xs text-warning">Above threshold</span>
        )}
      </div>
    </div>
  )
}

export default function SMARTShipMonitor() {
  const [metrics, setMetrics] = useState(() => generateSMARTShipMetrics())
  const [alerts, setAlerts] = useState(() => generateAlerts(5))
  const alertContainerRef = useRef(null)

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(generateSMARTShipMetrics())
    }, 5000)

    const alertsInterval = setInterval(() => {
      const newAlert = {
        ...generateAlerts(1)[0],
        id: `alert-auto-${Date.now()}`
      }
      setAlerts(prev => [newAlert, ...prev].slice(0, 10))
    }, 4000)

    return () => {
      clearInterval(metricsInterval)
      clearInterval(alertsInterval)
    }
  }, [])

  const handleSimulateAlert = () => {
    const criticalAlert = generateCriticalAlert()
    setAlerts(prev => [criticalAlert, ...prev].slice(0, 10))
    
    if (alertContainerRef.current) {
      alertContainerRef.current.scrollTop = 0
    }
  }

  const gaugeColors = {
    engineRpm: '#0EA5E9',
    fuelFlow: '#00D4AA',
    speed: '#F59E0B',
    hullIndex: '#22C55E'
  }

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
            <Ship className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted">Interactive Demo</span>
          </div>
          <h2 className="section-title mb-4">SMARTShip™ Monitor</h2>
          <p className="section-subtitle mx-auto">
            Industrial IoT platform with 5,000+ real-time data points and predictive alerts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text">Vessel Telemetry</h3>
                  <p className="text-sm text-muted">MV Pacific Guardian • Live Data</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted">Connected</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GaugeCard metric={metrics.engineRpm} color={gaugeColors.engineRpm} />
                <GaugeCard metric={metrics.fuelFlow} color={gaugeColors.fuelFlow} />
                <GaugeCard metric={metrics.speed} color={gaugeColors.speed} />
                <GaugeCard metric={metrics.hullIndex} color={gaugeColors.hullIndex} />
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card/50 rounded-lg p-3 flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-xs text-muted">Engine Load</div>
                    <div className="text-sm font-medium text-text">78%</div>
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-3 flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-xs text-muted">Fuel Temp</div>
                    <div className="text-sm font-medium text-text">42°C</div>
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-3 flex items-center gap-3">
                  <Navigation className="w-5 h-5 text-warning" />
                  <div>
                    <div className="text-xs text-muted">Heading</div>
                    <div className="text-sm font-medium text-text">127° SE</div>
                  </div>
                </div>
                <div className="bg-card/50 rounded-lg p-3 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-success" />
                  <div>
                    <div className="text-xs text-muted">Status</div>
                    <div className="text-sm font-medium text-success">Normal</div>
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
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-text">Alert Feed</h3>
                </div>
                <span className="text-xs text-muted bg-card px-2 py-1 rounded">
                  {alerts.length} alerts
                </span>
              </div>
              
              <div 
                ref={alertContainerRef}
                className="flex-1 overflow-y-auto space-y-2 max-h-[340px] pr-2"
              >
                <AnimatePresence initial={false}>
                  {alerts.map((alert) => {
                    const AlertIcon = alertIcons[alert.type]
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-3 rounded-lg border ${alertColors[alert.type]}`}
                      >
                        <div className="flex items-start gap-2">
                          <AlertIcon className="w-4 h-4 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{alert.message}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {alert.vessel} • {alert.timestamp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              <button
                onClick={handleSimulateAlert}
                className="mt-4 w-full py-3 px-4 bg-danger/20 hover:bg-danger/30 border border-danger/50 rounded-lg text-danger font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                Simulate Critical Alert
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
