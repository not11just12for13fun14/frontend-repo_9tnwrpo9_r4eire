import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Collections() {
  const [collections, setCollections] = useState([])
  const [items, setItems] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const c = await api.get('/collections')
        setCollections(c.collections)
      } catch (e) {
        setError(String(e.message || e))
      }
    }
    load()
  }, [])

  const loadItems = async (c) => {
    try {
      const res = await api.get(`/documents/${c}`)
      setItems((prev) => ({ ...prev, [c]: res.items }))
    } catch (e) {
      setError(String(e.message || e))
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Collections</h3>
      </div>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <div className="grid md:grid-cols-2 gap-3">
        {collections.map((c) => (
          <div key={c} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-800">{c}</div>
              <button onClick={() => loadItems(c)} className="text-sm px-2 py-1 rounded border border-gray-300 hover:bg-gray-50">Load</button>
            </div>
            <div className="mt-2 space-y-1 max-h-40 overflow-auto">
              {(items[c] || []).map((it) => (
                <div key={it._id} className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="inline-flex w-2 h-2 rounded-full bg-gray-300" />
                  <span className="font-mono text-xs text-gray-500">{it._id.slice(-6)}</span>
                  <span>{it.name || it.title || 'Untitled'}</span>
                </div>
              ))}
              {(!items[c] || items[c].length === 0) && (
                <div className="text-sm text-gray-500">No items loaded</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
