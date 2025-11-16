import { useEffect, useMemo, useRef, useState } from 'react'
import api from '../lib/api'

// Simple force layout using simulation-like approach (no external deps)
function useForceLayout(nodes, edges) {
  const [positions, setPositions] = useState({})
  useEffect(() => {
    if (!nodes.length) return
    const width = 900, height = 480
    // Init positions
    const pos = {}
    nodes.forEach((n, i) => {
      pos[n.id] = {
        x: (i % 6) * (width / 6) + 50,
        y: Math.floor(i / 6) * 90 + 60,
      }
    })

    // Basic relax iterations
    for (let iter = 0; iter < 200; iter++) {
      // repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = pos[a.id].x - pos[b.id].x
          const dy = pos[a.id].y - pos[b.id].y
          const dist2 = Math.max(dx*dx + dy*dy, 1)
          const force = 2000 / dist2
          const fx = (dx / Math.sqrt(dist2)) * force
          const fy = (dy / Math.sqrt(dist2)) * force
          pos[a.id].x += fx; pos[a.id].y += fy
          pos[b.id].x -= fx; pos[b.id].y -= fy
        }
      }
      // attraction
      edges.forEach(e => {
        const a = pos[e.source], b = pos[e.target]
        if (!a || !b) return
        const dx = b.x - a.x
        const dy = b.y - a.y
        const k = 0.01
        a.x += dx * k; a.y += dy * k
        b.x -= dx * k; b.y -= dy * k
      })
      // bounds
      nodes.forEach(n => {
        pos[n.id].x = Math.max(40, Math.min(width-40, pos[n.id].x))
        pos[n.id].y = Math.max(40, Math.min(height-40, pos[n.id].y))
      })
    }

    setPositions(pos)
  }, [nodes, edges])
  return positions
}

export default function Graph() {
  const [data, setData] = useState({ nodes: [], edges: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchGraph = async () => {
    setLoading(true); setError('')
    try {
      const g = await api.get('/graph')
      setData(g)
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGraph() }, [])

  const pos = useForceLayout(data.nodes, data.edges)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Landscape graph</h3>
        <button onClick={fetchGraph} className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50">Refresh</button>
      </div>
      {loading ? (
        <div className="text-gray-500 text-sm">Loading graph…</div>
      ) : error ? (
        <div className="text-red-600 text-sm">{error}</div>
      ) : (
        <svg viewBox="0 0 960 520" className="w-full h-[520px]">
          {/* edges */}
          {data.edges.map((e, i) => (
            <line key={i} x1={pos[e.source]?.x || 0} y1={pos[e.source]?.y || 0} x2={pos[e.target]?.x || 0} y2={pos[e.target]?.y || 0} stroke="#CBD5E1" strokeWidth="1.5" />
          ))}
          {/* nodes */}
          {data.nodes.map((n) => (
            <g key={n.id} transform={`translate(${pos[n.id]?.x || 0}, ${pos[n.id]?.y || 0})`}>
              <circle r="18" fill={colorFor(n.type)} />
              <text y="32" textAnchor="middle" className="fill-gray-700 text-xs">{n.label}</text>
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}

function colorFor(type) {
  switch (type) {
    case 'application': return '#3B82F6'
    case 'process': return '#10B981'
    case 'role': return '#F59E0B'
    case 'dataasset': return '#8B5CF6'
    case 'risk': return '#EF4444'
    default: return '#64748B'
  }
}
