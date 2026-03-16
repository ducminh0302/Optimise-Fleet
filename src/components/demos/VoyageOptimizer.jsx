import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet'
import { Navigation, Fuel, Leaf, Clock, DollarSign, Zap, TrendingDown, Award } from 'lucide-react'
import { generateRouteOptions } from '../../lib/simulation'
import 'leaflet/dist/leaflet.css'

const routeColors = {
  fast: '#EF4444',
  optimal: '#22C55E', 
  eco: '#0EA5E9'
}

const routeCoordinates = {
  fast: [
    [51.9225, 4.4792],
    [48.8566, -5.0000],
    [36.7783, -10.0000],
    [14.5995, -20.0000],
    [-6.1745, -5.0000],
    [-33.9249, 18.4241],
    [-6.1745, 55.0000],
    [1.2644, 103.8200]
  ],
  optimal: [
    [51.9225, 4.4792],
    [36.7783, -10.5000],
    [14.5995, -17.4467],
    [-6.1745, -10.0000],
    [-33.9249, 18.4241],
    [-6.1745, 50.0000],
    [1.2644, 103.8200]
  ],
  eco: [
    [51.9225, 4.4792],
    [43.0000, -9.0000],
    [32.0000, -16.0000],
    [14.5995, -20.0000],
    [-10.0000, -5.0000],
    [-33.9249, 18.4241],
    [-20.0000, 40.0000],
    [-6.1745, 60.0000],
    [1.2644, 103.8200]
  ]
}

const ports = {
  rotterdam: { name: 'Rotterdam', coords: [51.9225, 4.4792] },
  singapore: { name: 'Singapore', coords: [1.2644, 103.8200] }
}

export default function VoyageOptimizer() {
  const [selectedRoute, setSelectedRoute] = useState('optimal')
  const routes = useMemo(() => generateRouteOptions(), [])

  const selectedRouteData = routes.find(r => r.id === selectedRoute)

  return (
    <section id="demos" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted">Interactive Demo</span>
          </div>
          <h2 className="section-title mb-4">Voyage Optimization</h2>
          <p className="section-subtitle mx-auto">
            Select a route strategy and see real-time calculations for fuel, emissions, and cost.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-3"
          >
            <div className="glass rounded-xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-muted mb-3">Route Strategy</h3>
              <div className="space-y-2">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                      selectedRoute === route.id
                        ? 'bg-card border-2 border-primary'
                        : 'bg-card/50 border-2 border-transparent hover:bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: routeColors[route.id] }}
                      />
                      <div>
                        <div className="font-medium text-text text-sm">{route.name}</div>
                        <div className="text-xs text-muted">{route.description}</div>
                      </div>
                      {route.recommended && (
                        <Award className="w-4 h-4 text-accent ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-muted mb-3">Route Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Origin</span>
                  <span className="text-text font-medium">Rotterdam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Destination</span>
                  <span className="text-text font-medium">Singapore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Distance</span>
                  <span className="text-text font-medium">{selectedRouteData?.distance} nm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Avg Speed</span>
                  <span className="text-text font-medium">{selectedRouteData?.avgSpeed} kn</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl overflow-hidden h-[400px]">
              <MapContainer
                center={[10, 50]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {Object.entries(routeCoordinates).map(([routeId, coords]) => (
                  <Polyline
                    key={routeId}
                    positions={coords}
                    pathOptions={{
                      color: routeColors[routeId],
                      weight: selectedRoute === routeId ? 4 : 2,
                      opacity: selectedRoute === routeId ? 1 : 0.3,
                      dashArray: routeId === 'eco' ? '10, 10' : undefined
                    }}
                  />
                ))}

                {Object.entries(ports).map(([portId, port]) => (
                  <CircleMarker
                    key={portId}
                    center={port.coords}
                    radius={8}
                    pathOptions={{
                      fillColor: '#0EA5E9',
                      fillOpacity: 1,
                      color: '#fff',
                      weight: 2
                    }}
                  >
                    <Popup>
                      <span className="font-semibold">{port.name}</span>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
            
            <div className="flex gap-4 mt-4 justify-center">
              {Object.entries(routeColors).map(([id, color]) => (
                <div key={id} className="flex items-center gap-2 text-xs text-muted">
                  <div 
                    className="w-4 h-1 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span className="capitalize">{id}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoute}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-xl p-4"
              >
                <h3 className="text-sm font-semibold text-muted mb-4">Voyage Estimate</h3>
                
                <div className="space-y-4">
                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted text-xs mb-1">
                      <Fuel className="w-4 h-4" />
                      <span>Fuel Consumption</span>
                    </div>
                    <div className="text-2xl font-bold text-text">
                      {selectedRouteData?.fuel} <span className="text-sm font-normal text-muted">MT</span>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted text-xs mb-1">
                      <Leaf className="w-4 h-4" />
                      <span>CO₂ Emissions</span>
                    </div>
                    <div className="text-2xl font-bold text-text">
                      {selectedRouteData?.co2} <span className="text-sm font-normal text-muted">tons</span>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted text-xs mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Estimated Time</span>
                    </div>
                    <div className="text-2xl font-bold text-text">
                      {selectedRouteData?.eta}
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted text-xs mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Estimated Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      ${selectedRouteData?.cost.toLocaleString()}
                    </div>
                  </div>
                </div>

                {selectedRouteData?.recommended && (
                  <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                      <Award className="w-4 h-4" />
                      Recommended Route
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Best balance of time, cost, and emissions
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
