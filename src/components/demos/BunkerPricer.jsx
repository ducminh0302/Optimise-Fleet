import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Scatter
} from 'recharts'
import { Fuel, TrendingUp, TrendingDown, MapPin, DollarSign, Activity } from 'lucide-react'
import { generateBunkerPrices, PORTS } from '../../lib/simulation'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-glass-border rounded-lg p-3 shadow-xl">
        <p className="text-xs text-muted mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-text">
            ${data.price.toFixed(2)}/MT
          </p>
          <p className={`text-xs ${data.rsi < 30 ? 'text-success' : data.rsi > 70 ? 'text-danger' : 'text-muted'}`}>
            RSI: {data.rsi.toFixed(1)}
          </p>
          {data.isBestBuy && (
            <p className="text-xs text-accent font-medium">
              Best Buy Signal
            </p>
          )}
        </div>
      </div>
    )
  }
  return null
}

export default function BunkerPricer() {
  const [selectedPort, setSelectedPort] = useState('rotterdam')
  const priceData = useMemo(() => generateBunkerPrices(selectedPort, 30), [selectedPort])
  
  const currentPrice = priceData[priceData.length - 1]
  const previousPrice = priceData[priceData.length - 2]
  const priceChange = currentPrice.price - previousPrice.price
  const priceChangePercent = ((priceChange / previousPrice.price) * 100).toFixed(2)
  
  const bestBuyPoints = priceData.filter(d => d.isBestBuy)
  const lowestPrice = Math.min(...priceData.map(d => d.price))
  const highestPrice = Math.max(...priceData.map(d => d.price))

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
            <Fuel className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted">Interactive Demo</span>
          </div>
          <h2 className="section-title mb-4">Bunker Pricer</h2>
          <p className="section-subtitle mx-auto">
            Real-time fuel pricing with market indicators and best-buy signals across 170+ ports.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="glass rounded-xl p-4">
              <label className="block text-sm text-muted mb-2">Select Port</label>
              <select
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                className="w-full bg-card border border-glass-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors cursor-pointer"
              >
                {Object.entries(PORTS).map(([key, port]) => (
                  <option key={key} value={key}>{port.name}</option>
                ))}
              </select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPort}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-muted text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{PORTS[selectedPort].name}</span>
                </div>
                
                <div className="text-3xl font-bold text-text mb-1">
                  ${currentPrice.price.toFixed(2)}
                  <span className="text-sm font-normal text-muted">/MT</span>
                </div>
                
                <div className={`flex items-center gap-1 text-sm ${
                  priceChange >= 0 ? 'text-danger' : 'text-success'
                }`}>
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent}%)
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="glass rounded-xl p-4">
              <h4 className="text-sm font-semibold text-text mb-3">Market Indicators</h4>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted">RSI (14)</span>
                    <span className={`font-medium ${
                      currentPrice.rsi < 30 ? 'text-success' : 
                      currentPrice.rsi > 70 ? 'text-danger' : 'text-text'
                    }`}>
                      {currentPrice.rsi.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 bg-card rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        currentPrice.rsi < 30 ? 'bg-success' : 
                        currentPrice.rsi > 70 ? 'bg-danger' : 'bg-primary'
                      }`}
                      style={{ width: `${currentPrice.rsi}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-subtle mt-1">
                    <span>Oversold</span>
                    <span>Overbought</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-glass-border">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted">30-Day Range</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-success">${lowestPrice.toFixed(2)}</span>
                    <span className="text-danger">${highestPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {bestBuyPoints.length > 0 && (
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent font-medium text-sm mb-2">
                  <Activity className="w-4 h-4" />
                  Best Buy Signals
                </div>
                <p className="text-xs text-muted">
                  {bestBuyPoints.length} optimal buying {bestBuyPoints.length === 1 ? 'opportunity' : 'opportunities'} detected in the last 30 days when RSI dropped below 30.
                </p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-text">Price History & RSI</h3>
                  <p className="text-sm text-muted">VLSFO 0.5% - Last 30 days</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span>Price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span>Best Buy</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={priceData}>
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#4A6785" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      interval={4}
                    />
                    <YAxis 
                      yAxisId="price"
                      stroke="#4A6785" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={['dataMin - 20', 'dataMax + 20']}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis 
                      yAxisId="rsi"
                      orientation="right"
                      stroke="#4A6785" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                      hide
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <ReferenceLine 
                      yAxisId="rsi"
                      y={30} 
                      stroke="#22C55E" 
                      strokeDasharray="3 3"
                      strokeOpacity={0.5}
                    />
                    <ReferenceLine 
                      yAxisId="rsi"
                      y={70} 
                      stroke="#EF4444" 
                      strokeDasharray="3 3"
                      strokeOpacity={0.5}
                    />
                    
                    <Area
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      stroke="#0EA5E9"
                      fill="url(#priceGradient)"
                      strokeWidth={2}
                    />
                    
                    <Scatter
                      yAxisId="price"
                      dataKey={(entry) => entry.isBestBuy ? entry.price : null}
                      fill="#00D4AA"
                      shape="circle"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-4 bg-card rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xs text-muted mb-1">Avg Price</div>
                    <div className="text-lg font-semibold text-text">
                      ${(priceData.reduce((sum, d) => sum + d.price, 0) / priceData.length).toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">Low</div>
                    <div className="text-lg font-semibold text-success">${lowestPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">High</div>
                    <div className="text-lg font-semibold text-danger">${highestPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted mb-1">Volatility</div>
                    <div className="text-lg font-semibold text-text">
                      ±{PORTS[selectedPort].volatility}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
