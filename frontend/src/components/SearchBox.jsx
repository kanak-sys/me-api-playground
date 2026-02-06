import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, '')
function buildUrl(path) {
  if (!API_BASE) return null
  return `${API_BASE}${path}`
}

export default function SearchBox({ onSearchComplete }) {
  const [q, setQ] = useState('')
  const [result, setResult] = useState(null)
  const [searching, setSearching] = useState(false)
  const [err, setErr] = useState(null)

  async function doSearch(e) {
    e.preventDefault()
    if (!q) return

    const base = buildUrl('/search/')
    if (!base) {
      setErr('VITE_API_BASE not set in frontend environment.')
      return
    }

    setSearching(true)
    setErr(null)
    setResult(null)

    try {
      const r = await axios.get(`${base}?q=${encodeURIComponent(q)}`)
      setResult(r.data)
      onSearchComplete?.()
    } catch (e) {
      setResult({ error: e?.response?.data || e.message || String(e) })
    } finally {
      setSearching(false)
    }
  }

  // Styles
  const searchContainerStyle = { background: 'white', borderRadius: 20, padding: 30, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', marginBottom: 30 }
  const searchFormStyle = { display: 'flex', gap: 15, marginBottom: 25 }
  const searchInputStyle = { flex: 1, padding: '15px 20px', border: '2px solid #e1e5e9', borderRadius: 12, fontSize: '1em', transition: 'all 0.3s ease', background: '#f8f9fa' }
  const searchButtonStyle = { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '15px 30px', borderRadius: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'center', gap: 8 }
  const resultItemStyle = { background: 'white', padding: '12px 15px', marginBottom: 8, borderRadius: 8, transition: 'all 0.3s ease', borderLeft: '3px solid #667eea' }

  return (
    <div style={searchContainerStyle}>
      <h3 style={{ fontSize: '1.5em', color: '#333', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>🔍</span> Search API
      </h3>

      <form onSubmit={doSearch} style={searchFormStyle}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search profiles and projects..." style={searchInputStyle} onFocus={(e) => { e.target.style.borderColor = '#667eea'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'; }} onBlur={(e) => { e.target.style.borderColor = '#e1e5e9'; e.target.style.background = '#f8f9fa'; e.target.style.boxShadow = 'none'; }} />
        <button type="submit" style={searchButtonStyle} disabled={searching}>
          {searching ? <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Searching...</> : 'Search'}
        </button>
      </form>

      {err && <div style={{ color: '#d32f2f', padding: 10 }}>{err}</div>}

      {result && (
        <div style={{ background: '#f8f9fa', borderRadius: 12, padding: 20, borderLeft: '4px solid #667eea' }}>
          {result.error ? <div style={{ color: '#f44336', padding: 10 }}>{result.error}</div> : (
            <>
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ color: '#555', marginBottom: 10, paddingBottom: 5, borderBottom: '2px solid #e1e5e9' }}>Projects ({result.projects.length})</h4>
                {result.projects.length ? result.projects.map(p => <div key={p.id} style={resultItemStyle}>{p.title}</div>) : <div style={{ color: '#666', padding: 10 }}>No projects found</div>}
              </div>

              <div>
                <h4 style={{ color: '#555', marginBottom: 10, paddingBottom: 5, borderBottom: '2px solid #e1e5e9' }}>Profiles ({result.profiles.length})</h4>
                {result.profiles.length ? result.profiles.map(pr => <div key={pr.id} style={resultItemStyle}>{pr.name}</div>) : <div style={{ color: '#666', padding: 10 }}>No profiles found</div>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
