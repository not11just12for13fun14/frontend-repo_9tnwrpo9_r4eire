import { useState } from 'react'
import { Plus } from 'lucide-react'
import api from '../lib/api'

export default function QuickAdd({ onCreated }) {
  const [type, setType] = useState('application')
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Please enter a name')
    setSaving(true)
    try {
      const payload = { data: { name } }
      const res = await api.post(`/documents/${type}`, payload)
      setName('')
      onCreated?.({ _id: res._id, type, name })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Plus size={18} className="text-blue-600" />
        <span className="font-semibold text-gray-900">Quick add</span>
      </div>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full sm:w-40 border-gray-300 rounded-lg">
        <option value="application">Application</option>
        <option value="process">Process</option>
        <option value="role">Role</option>
        <option value="dataasset">Data</option>
        <option value="risk">Risk</option>
      </select>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={`Name of the ${type}`}
        className="w-full border-gray-300 rounded-lg"
      />
      <button disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-60">
        {saving ? 'Saving...' : 'Add'}
      </button>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </form>
  )
}
