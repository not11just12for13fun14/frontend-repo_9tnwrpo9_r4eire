const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export const api = {
  baseUrl: BASE_URL,
  async get(path) {
    const res = await fetch(`${BASE_URL}${path}`)
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
    return res.json()
  },
  async post(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      let detail = ''
      try { const j = await res.json(); detail = j.detail || '' } catch {}
      throw new Error(`POST ${path} failed: ${res.status} ${detail}`)
    }
    return res.json()
  }
}

export default api
