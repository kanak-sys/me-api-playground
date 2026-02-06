import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/, '')
function buildUrl(path) {
  if (!API_BASE) return null
  return `${API_BASE}${path}`
}

export default function ProjectsList({ skill, onProjectClick }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredCount, setFilteredCount] = useState(0)
  const [err, setErr] = useState(null)

  useEffect(() => {
    const base = buildUrl('/projects/')
    if (!base) {
      setErr('VITE_API_BASE not set in frontend environment.')
      return
    }

    setLoading(true)
    setErr(null)

    const url = skill ? `${base}?skill=${encodeURIComponent(skill)}` : base

    let canceled = false

    axios.get(url)
      .then(r => {
        if (canceled) return
        setProjects(r.data)
        setFilteredCount(Array.isArray(r.data) ? r.data.length : 0)
      })
      .catch(e => {
        if (canceled) return
        setErr(e?.response?.data || e.message || String(e))
        setProjects([])
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })

    return () => { canceled = true }
  }, [skill])

  const projectCardStyle = { background: 'white', borderRadius: 16, padding: 25, boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', border: '1px solid #f0f2f5', position: 'relative', overflow: 'hidden', cursor: 'pointer' }
  const loadingSpinnerStyle = { display: 'inline-block', width: 20, height: 20, border: '3px solid #f3f3f3', borderTop: '3px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' }

  if (err) return <div style={{ color: '#d32f2f', padding: 20 }}>API error: {String(err)}</div>

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={loadingSpinnerStyle} />
      <p>Loading projects...</p>
    </div>
  )

  if (!projects || projects.length === 0) return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <div style={{ fontSize: '4em', marginBottom: 20, opacity: 0.5 }}>📭</div>
      <h3 style={{ color: '#333', marginBottom: 10 }}>No projects found</h3>
      <p style={{ color: '#666' }}>{skill ? `No projects match "${skill}"` : 'Start by adding some projects!'}</p>
    </div>
  )

  return (
    <div>
      {skill && (
        <div style={{ background: '#f0f7ff', padding: '15px 20px', borderRadius: 12, marginBottom: 25, borderLeft: '4px solid #4dabf7' }}>
          Showing {filteredCount} project{filteredCount !== 1 ? 's' : ''} matching:
          <span style={{ background: '#4dabf7', color: 'white', padding: '4px 12px', borderRadius: 20, marginLeft: 5, fontWeight: 600 }}>{skill}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 25 }}>
        {projects.map(p => (
          <div key={p.id} style={{ ...projectCardStyle, animation: 'slideIn 0.5s ease-out', borderLeft: '5px solid #667eea' }} onClick={() => onProjectClick?.(p)} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
              <h4 style={{ fontSize: '1.4em', color: '#333', margin: 0, fontWeight: 700, lineHeight: 1.3 }}>{p.title}</h4>
              <span style={{ background: '#e8f4fd', color: '#2196F3', padding: '4px 10px', borderRadius: 12, fontSize: '0.8em', fontWeight: 600 }}>#{p.id}</span>
            </div>

            <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 20, fontSize: '0.95em' }}>{p.description}</p>

            {p.skills && p.skills.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 15, borderTop: '1px solid #f0f2f5' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {p.skills.map(s => <span key={s.id} style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 12px', borderRadius: 12, fontSize: '0.85em', fontWeight: 500 }}>{s.name}</span>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
