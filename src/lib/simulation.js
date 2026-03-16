const VESSEL_NAMES = [
  'MV Atlantic Pioneer', 'MV Pacific Guardian', 'MV Nordic Explorer',
  'MV Eastern Star', 'MV Western Wind', 'MV Southern Cross',
  'MV Arctic Voyager', 'MV Coral Discoverer', 'MV Ocean Titan',
  'MV Sea Venture', 'MV Global Navigator', 'MV Maritime Spirit'
]

const VESSEL_TYPES = ['Tanker', 'Bulk Carrier', 'Container', 'LNG Carrier', 'VLCC']

const PORTS = {
  rotterdam: { name: 'Rotterdam', basePrice: 485, volatility: 15 },
  singapore: { name: 'Singapore', basePrice: 520, volatility: 20 },
  fujairah: { name: 'Fujairah', basePrice: 505, volatility: 18 },
  houston: { name: 'Houston', basePrice: 475, volatility: 12 }
}

const ALERT_TYPES = [
  { type: 'info', messages: [
    'Vessel speed adjusted to optimize fuel consumption',
    'Weather data updated for route optimization',
    'Hull performance data synchronized',
    'New voyage recommendation available'
  ]},
  { type: 'warning', messages: [
    'High sea state detected - route adjustment recommended',
    'Fuel consumption exceeding baseline by 8%',
    'Engine temperature approaching upper threshold',
    'Port congestion detected at destination'
  ]},
  { type: 'critical', messages: [
    'Critical: Anomaly detected in main engine sensors',
    'Urgent: Weather advisory - storm warning ahead',
    'Alert: Fuel quality deviation detected',
    'Warning: CII rating projected to drop to D'
  ]}
]

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1))
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateFuelTimeSeries(hours = 24) {
  const data = []
  const now = new Date()
  let baseValue = randomBetween(45, 55)
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now - i * 60 * 60 * 1000)
    const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    
    baseValue += randomBetween(-3, 3)
    baseValue = Math.max(35, Math.min(70, baseValue))
    
    data.push({
      time: timeStr,
      value: parseFloat(baseValue.toFixed(1)),
      baseline: 50
    })
  }
  
  return data
}

export function generateBunkerPrices(portKey = 'rotterdam', days = 30) {
  const port = PORTS[portKey] || PORTS.rotterdam
  const data = []
  const now = new Date()
  let price = port.basePrice
  let rsi = 50
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000)
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    
    const change = randomBetween(-port.volatility, port.volatility)
    price += change
    price = Math.max(port.basePrice * 0.8, Math.min(port.basePrice * 1.3, price))
    
    rsi += randomBetween(-10, 10)
    rsi = Math.max(10, Math.min(90, rsi))
    
    data.push({
      date: dateStr,
      price: parseFloat(price.toFixed(2)),
      rsi: parseFloat(rsi.toFixed(1)),
      isBestBuy: rsi < 30
    })
  }
  
  return data
}

export function generateFleetVessels(count = 8) {
  const vessels = []
  const usedNames = new Set()
  
  for (let i = 0; i < count; i++) {
    let name = pick(VESSEL_NAMES)
    while (usedNames.has(name)) {
      name = pick(VESSEL_NAMES)
    }
    usedNames.add(name)
    
    const statusRoll = Math.random()
    let status, statusColor
    if (statusRoll < 0.6) {
      status = 'At Sea'
      statusColor = 'success'
    } else if (statusRoll < 0.85) {
      status = 'In Port'
      statusColor = 'warning'
    } else {
      status = 'Maintenance'
      statusColor = 'danger'
    }
    
    const ciiRatings = ['A', 'B', 'C', 'D', 'E']
    const ciiWeights = [0.15, 0.35, 0.30, 0.15, 0.05]
    const ciiRoll = Math.random()
    let cumulative = 0
    let cii = 'C'
    for (let j = 0; j < ciiWeights.length; j++) {
      cumulative += ciiWeights[j]
      if (ciiRoll < cumulative) {
        cii = ciiRatings[j]
        break
      }
    }
    
    vessels.push({
      id: `vessel-${i + 1}`,
      name,
      type: pick(VESSEL_TYPES),
      status,
      statusColor,
      cii,
      fuelEfficiency: parseFloat(randomBetween(85, 105).toFixed(1)),
      speed: parseFloat(randomBetween(10, 16).toFixed(1)),
      destination: pick(['Rotterdam', 'Singapore', 'Houston', 'Shanghai', 'Antwerp', 'Los Angeles']),
      eta: `${randomInt(1, 14)}d ${randomInt(0, 23)}h`,
      co2Today: randomInt(80, 200),
      fuelToday: parseFloat(randomBetween(40, 120).toFixed(1))
    })
  }
  
  return vessels
}

export function generateEmissionsData(vessels) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  
  return vessels.map(vessel => ({
    vessel: vessel.name,
    cii: vessel.cii,
    data: months.map(month => ({
      month,
      co2: randomInt(800, 2500),
      target: randomInt(1000, 1800)
    }))
  }))
}

export function generateSMARTShipMetrics() {
  return {
    engineRpm: {
      value: randomInt(70, 95),
      max: 100,
      unit: '%',
      label: 'Engine RPM',
      status: 'normal'
    },
    fuelFlow: {
      value: parseFloat(randomBetween(2.5, 4.5).toFixed(1)),
      max: 6,
      unit: 'MT/h',
      label: 'Fuel Flow',
      status: randomBetween(0, 1) > 0.8 ? 'warning' : 'normal'
    },
    speed: {
      value: parseFloat(randomBetween(11, 15).toFixed(1)),
      max: 20,
      unit: 'kn',
      label: 'Speed',
      status: 'normal'
    },
    hullIndex: {
      value: randomInt(75, 98),
      max: 100,
      unit: '%',
      label: 'Hull Index',
      status: randomBetween(0, 1) > 0.9 ? 'warning' : 'normal'
    }
  }
}

export function generateAlerts(count = 5) {
  const alerts = []
  const now = new Date()
  
  for (let i = 0; i < count; i++) {
    const typeRoll = Math.random()
    let alertType
    if (typeRoll < 0.6) {
      alertType = ALERT_TYPES[0]
    } else if (typeRoll < 0.9) {
      alertType = ALERT_TYPES[1]
    } else {
      alertType = ALERT_TYPES[2]
    }
    
    const timestamp = new Date(now - i * randomInt(60, 600) * 1000)
    
    alerts.push({
      id: `alert-${Date.now()}-${i}`,
      type: alertType.type,
      message: pick(alertType.messages),
      vessel: pick(VESSEL_NAMES),
      timestamp: timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      })
    })
  }
  
  return alerts
}

export function generateCriticalAlert() {
  const criticalType = ALERT_TYPES[2]
  return {
    id: `alert-${Date.now()}`,
    type: 'critical',
    message: pick(criticalType.messages),
    vessel: pick(VESSEL_NAMES),
    timestamp: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }
}

export function generateRouteOptions() {
  return [
    {
      id: 'fast',
      name: 'Fastest Route',
      description: 'Minimum transit time',
      fuel: randomInt(280, 320),
      co2: randomInt(850, 950),
      eta: '6d 4h',
      cost: randomInt(145000, 165000),
      distance: 3420,
      avgSpeed: 14.2
    },
    {
      id: 'optimal',
      name: 'Optimal Route',
      description: 'Best balance of time and cost',
      fuel: randomInt(220, 260),
      co2: randomInt(680, 780),
      eta: '7d 12h',
      cost: randomInt(115000, 135000),
      distance: 3580,
      avgSpeed: 12.4,
      recommended: true
    },
    {
      id: 'eco',
      name: 'Eco Route',
      description: 'Lowest emissions',
      fuel: randomInt(180, 210),
      co2: randomInt(550, 620),
      eta: '9d 6h',
      cost: randomInt(95000, 110000),
      distance: 3750,
      avgSpeed: 10.8
    }
  ]
}

export function generateFleetStats() {
  return {
    atSea: randomInt(45, 65),
    inPort: randomInt(15, 30),
    fuelSavedToday: randomInt(120, 280),
    activeAlerts: randomInt(3, 12)
  }
}

export const ROUTE_COORDINATES = {
  rotterdam: [51.9225, 4.4792],
  singapore: [1.2644, 103.8200],
  waypoints: [
    [51.9225, 4.4792],
    [36.7783, -10.5000],
    [14.5995, -17.4467],
    [-6.1745, -10.0000],
    [-33.9249, 18.4241],
    [-6.1745, 50.0000],
    [1.2644, 103.8200]
  ]
}

export { PORTS, VESSEL_NAMES }
